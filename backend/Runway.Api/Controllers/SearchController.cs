using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Rest.Azure;
using Document = Microsoft.Azure.Documents.Document;

namespace Runway.Api.Controllers
{
    public class PlaceholderDoc
    {
        public string Id { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private DocumentClient _db;
        private SearchIndexClient _search;
        private readonly ILogger<SearchController> _logger;

        public SearchController(
            DocumentClient db,
            SearchIndexClient search,
            ILogger<SearchController> logger)
        {
            _db = db;
            _search = search;
            _logger = logger;
        }

        [HttpGet("query")]
        public async Task<ActionResult<object>> Get([FromQuery(Name = "q")] string query)
        {
            var searchResults = await _search.Documents.SearchAsync<PlaceholderDoc>(query, new SearchParameters() { Top = 25 });
            _logger.LogDebug("Search: " + searchResults.Results);
            var ids = searchResults.Results.Select(x => x.Document.Id).ToList();
            _logger.LogDebug($"Got {ids.Count} results for '{query}'");

            //var resultsQuery = _db.CreateDatabaseQuery(
            //    new SqlQuerySpec("select * from c where ARRAY_CONTAINS(@ids, c.Id, true)",
            //        new SqlParameterCollection(new[] {new SqlParameter("@ids", ids)})));

            var docs = new List<Document>();
            foreach (var id in ids)
            {
                var doc = await _db.ReadDocumentAsync(UriFactory.CreateDocumentUri("runway-dev", "business_external", id));
                docs.Add(doc.Resource);
            }
            
            _logger.LogDebug($"Got {docs.Count} docs for '{query}'");

            return docs;
        }
    }
}
