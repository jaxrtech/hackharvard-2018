using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Api.Gax;
using Google.Cloud.Dialogflow.V2;
using Microsoft.AspNetCore.Mvc;

namespace Runway.Api.Controllers
{
    [Route("api/chatbot")]
    public class ChatBotController : Controller
    {
        [HttpPost("message")]
        public async Task<ActionResult<dynamic>> Message([FromQuery(Name = "q")] string query)
        {
            IntentsClient intentsClient = await IntentsClient.CreateAsync();
            ProjectAgentName parent = new ProjectAgentName("party-supplier");

            PagedAsyncEnumerable<ListIntentsResponse, Intent> response =
                intentsClient.ListIntentsAsync(parent);

            var results = new List<Intent>();
            await response.ForEachAsync(item =>
            {
                results.Add(item);
            });

            return results;
        }
    }
}
