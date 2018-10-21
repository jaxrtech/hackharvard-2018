import * as React from 'react';
import { BusinessCard } from 'src/component/business-card';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Row, Col } from 'react-flexbox-grid';

import { Item } from 'src/models';
import { ItemOrderComponent } from 'src/component/item';

const DUMMY = { "name": "Avalon inc.", "rating": 1.0, "distance": 7.0, "pricing": 2, "department": "Cleaning" };

@observer
export class BusinessPage extends React.Component {

  @observable private results: Item[] = [];

  public async componentDidMount() {
    const json = await fetch('/mock/items.json').then(x => x.json());
    console.log('business', json);
    this.results = json;
  }
  
  public render() {
    const cards = this.results.map((x, i) => <ItemOrderComponent key={i} model={x} />);

    return (
      <>
        <h1>Avalon inc.</h1>
        <Row>
          <Col xs={4}>
            <BusinessCard model={DUMMY} />
          </Col>
          
          <Col xs={5}>
            <img width={300} src="/img/business_1.jpg" />
          </Col>
        </Row>
        <h2>Products</h2>
        {cards}
      </>
    );
  }
}
