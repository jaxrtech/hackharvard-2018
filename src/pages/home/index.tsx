import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { Grid,  Row, Col } from 'react-flexbox-grid';
import { H1 } from '@blueprintjs/core';

import { ConfigStore, SearchBarStore } from 'src/stores/app';
import { SearchBar } from 'src/component/search-bar';
import { Bubble } from 'src/component/bubble/bubble';

import "./style.css";
import { Link } from 'react-router-dom';

export type HomePageProps = {
  config: ConfigStore;
  router: RouterStore;
  search: SearchBarStore;
};

@inject('router')
@inject('config')
@inject('search')
@observer
export class HomePage extends React.Component<HomePageProps> {

  @observable private searches: string[][] = [];

  public async componentDidMount() {
    const json = await fetch('/mock/searches.json').then(x => x.json());
    console.log('categories', json);
    this.searches = json;
  }

  constructor(props: any) {
    super(props);

    const { config } = this.props;
  }

  public render() {
    // this is kind of hacky because I can't be bothered to make this chunk arbitrary input right now.
    const rows = this.searches.map((x, i) =>
      <Row key={i} center="xs" middle="xs" around="xs">
        <Bubble text={x[0]}/>
        <Bubble text={x[1]}/>
        <Bubble text={x[2]}/>
      </Row>
      );

    return (
      <>
        <H1 className="title">Runway</H1>
        <SearchBar router={this.props.router} search={this.props.search} />
        <br/>
        
        <Grid>
          {rows}
        </Grid>
      </>
    );
  }

  
}