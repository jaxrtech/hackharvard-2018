import * as React from 'react';
import { observable, when, reaction, IReactionDisposer } from 'mobx';
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

  private disposer: IReactionDisposer | null = null;

  private handleSelect = (model: Business) => {
    this.props.router.push('/business/1'); // TODO(Bowden): handle ids
  }

  public render() {
    if (!this.props.search.ready) {
      return <Spinner size={50} />;
    }

    const cards = this.props.search.results.map((x, i) =>
      <BusinessPreview key={i} model={x} />);

    return (
      <>
        <div style={{ margin: '10px' }} />
        <SearchBar router={this.props.router} search={this.props.search} />
        {cards}
      </>
    );
  }
}
