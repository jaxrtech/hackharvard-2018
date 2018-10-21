import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import { BusinessPreview } from 'src/component/business-preview/business-preview';

import { Business, BusinessSearchResult } from 'src/models';
import { RouterStore } from 'mobx-react-router';
import { Spinner } from '@blueprintjs/core';
import { SearchBar } from 'src/component/search-bar';
import { SearchBarStore } from 'src/stores/app';

@inject('router')
@inject('search')
@observer
export class SearchPage extends React.Component<{ router: RouterStore, search: SearchBarStore }> {

  @observable private ready = false;
  @observable private loading = false;
  @observable private error = null as Error | null;

  @observable private results: BusinessSearchResult[] = [];

  public async componentDidMount() {
    try {
      this.loading = true;
      await this.prepare();
      this.ready = true;
    } catch (err) {
      this.error = err;
    } finally {
      this.loading = false;
    }
  }

  private async prepare() {
    const keywords = this.props.search.query;
    const keywordsEncoded = encodeURI(keywords);
    const queryUrl = `http://runway-api.azurewebsites.net/api/search/query?q=${keywordsEncoded}`;
    const json = await fetch(queryUrl).then(x => x.json());

    console.log('search', json);
    this.results = json;
  }
  
  private handleSelect = (model: Business) => {
    this.props.router.push('/business/1'); // TODO(Bowden): handle ids
  }

  public render() {
    const cards = this.results.map((x, i) =>
      <BusinessPreview key={i} model={x} />);

    if (this.loading) {
      return <Spinner size={50} />;
    }

    return (
      <>
        <div style={{margin: '10px'}}/>
        <SearchBar router={this.props.router} search={this.props.search} />
        {cards}
      </>
    );
  }
}
