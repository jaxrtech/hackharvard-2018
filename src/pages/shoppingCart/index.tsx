import * as React from 'react';
import { BusinessCard } from 'src/component/business-card';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'react-flexbox-grid';

import { Item } from 'src/models';
import { ItemOrderComponent } from 'src/component/item';
import { ShoppingCartStore } from 'src/stores/app';

@inject('cart')
@observer
export class ShoppingCartPage extends React.Component<{ cart: ShoppingCartStore }> {
  @observable private results: Item[] = [];

  public async componentDidMount() {
    const json = await fetch('/mock/shoppingCartItems.json').then(x => x.json());
    console.log('shoppingCart', json);
    this.results = json;
  }

  public render() {
    const cards = this.results.map((x, i) =>
      <ItemOrderComponent key={i} model={x} cart={this.props.cart} />);

    return (
      <>
        <h1>Shopping Cart</h1>
        
        {cards}
      </>
    );

    
  }
}
