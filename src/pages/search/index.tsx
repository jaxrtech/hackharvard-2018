import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Card, Elevation, Icon } from '@blueprintjs/core';
import * as Rating from 'react-rating';
import { startsWith } from 'lodash-es';

import { BusinessCard } from 'src/component/business-card';


@observer
export class SearchPage extends React.Component {

  @observable private results: Business[] = [];

  public async componentDidMount() {
    const json = await fetch('/mock/business.json').then(x => x.json());
    console.log('serach', json);
    this.results = json;
  }

  public render() {
    const cards = this.results.map((x, i) => <BusinessCard key={i} model={x} />);

    return (
      <>
      <div>
        <div className="bp3-input-group bp3-large">
          <span className="bp3-icon bp3-icon-search"></span>
          <input className="bp3-input" type="search" placeholder="Search input" dir="auto" />
        </div>
      </div>
      
      {cards}
      </>
    );
  }
}
