import * as React from 'react';
import { Card, Elevation, Button } from '@blueprintjs/core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import './style.css';

import { Item, OrdersByBusiness } from 'src/models';
import { BusinessCard } from 'src/component/business-card';

const DUMMY: OrdersByBusiness[] = [];


@observer
export class OrderPage extends React.Component {

  @observable private results: OrdersByBusiness[] = [];

  public async componentDidMount() {
    const json = await fetch('/mock/items.json').then(x => x.json());
    console.log('business', json);

    const businesses = [];

    const k = Math.floor(10 * Math.random());
    for (let i = 0; i < k; i++) {
      return; // TODO(Bowden)
    }

    this.results = json;
  }

  public render() {
    // const cards = this.results.map((x, i) => <ItemOrder key={i} model={x} />);

    return (
      <>
        <h1>Avalon</h1>
        {/* <BusinessCard model={DUMMY} /> */}

        <h2>Products</h2>
        <Grid fluid={true}>
          <Row>
            <Col xs={6} md={3}>
              Hello, world!
            </Col>
            <Col xs={6} md={3}>
              Hello, world!
            </Col>
          </Row>
        </Grid>
      </>
    );
  }
}
