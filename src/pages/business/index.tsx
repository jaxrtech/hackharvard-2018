import * as React from 'react';
import { BusinessCard } from 'src/component/business-card';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'react-flexbox-grid';

import { Item } from 'src/models';
import { ItemOrderComponent } from 'src/component/item';
import { ShoppingCartStore } from 'src/stores/app';

const DUMMY = {
  "id": "627f4613-83f1-4cab-8387-d56311edb30f",
  "name": "Avalon Inc.",
  "rating": 1.0,
  "distance": 7.0,
  "pricing": 2,
  "department": "Cleaning",
  "imgurl": "/img/business_1.jpg",
  "blurb": "Avalon is super super super cool, but there's one teensy little problem.  We don't have potable water where we are, so all our food products are made with Simple Green instead of water.  We hope that's OK :)"
};

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
        <BusinessCard model={DUMMY} />
        <h2>Products</h2>
        {cards}
      </>
    );
  }
}
