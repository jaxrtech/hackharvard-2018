import * as React from 'react';
import { BusinessCard } from 'src/component/business-card';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'react-flexbox-grid';

import { Item } from 'src/models';
import { ItemOrderComponent } from 'src/component/item';
import { ShoppingCartStore } from 'src/stores/app';

const DUMMY = { "name": "Avalon inc.", "rating": 1.0, "distance": 7.0, "pricing": 2, "department": "Cleaning" };

@inject('cart')
@observer
export class BusinessPage extends React.Component<{ cart: ShoppingCartStore }> {

  @observable private results: Item[] = [];

  public async componentDidMount() {
    const json = await fetch('/mock/items.json').then(x => x.json());
    console.log('business', json);
    this.results = json;
  }
  
  public render() {
    const cards = this.results.map((x, i) => <ItemOrderComponent key={i} model={x} cart={this.props.cart} />);

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
