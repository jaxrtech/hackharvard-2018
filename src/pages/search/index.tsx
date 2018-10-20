import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import { BusinessCard } from 'src/component/business-card';
import { Link } from 'react-router-dom';

import { Business } from 'src/models';
import { RouterStore } from 'mobx-react-router';
import { Spinner } from '@blueprintjs/core';
import { SearchBar } from 'src/component/search-bar';

@inject('router')
@observer
export class SearchPage extends React.Component<{ router: RouterStore }> {

  @observable private ready = false;
  @observable private loading = false;
  @observable private error = null as Error | null;

  @observable private results: Business[] = [];

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
    const json = await fetch('/mock/business.json').then(x => x.json());
    console.log('serach', json);
    this.results = json;
  }
  
  private handleSelect = (model: Business) => {
    this.props.router.push('/business/1'); // TODO(Bowden): handle ids
  }

  public render() {
    const cards = this.results.map((x, i) =>
      <BusinessCard key={i} model={x} onClick={this.handleSelect} />);

    if (this.loading) {
      return <Spinner size={50} />;
    }

    return (
      <>
      <SearchBar router={this.props.router} />
      {cards}
      </>
    );
  }
}
