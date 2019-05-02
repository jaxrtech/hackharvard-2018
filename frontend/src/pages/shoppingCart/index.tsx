import * as React from 'react';
import { BusinessCard } from 'src/component/business-card';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'react-flexbox-grid';

import { Item } from 'src/models';
import { ItemOrderComponent } from 'src/component/item';
import { ShoppingCartStore } from 'src/stores/app';
import { Button, Intent, Card } from '@blueprintjs/core';
import { RouterStore } from 'mobx-react-router';

@inject('cart')
@inject('router')
@observer
export class ShoppingCartPage extends React.Component<{ cart: ShoppingCartStore; router: RouterStore }> {
  @observable private results: Item[] = [];

  public async componentDidMount() {
    const json = await fetch('/mock/shoppingCartItems.json').then(x => x.json());
    console.log('shoppingCart', json);
    this.results = json;
  }

  public render() {
    const cards = this.props.cart.orders.map((x, i) =>
      <Col key={i} md={6}>
        <ItemOrderComponent model={x.item} cart={this.props.cart} />
      </Col>
    );

    return (
      <>
        <h1 style={{color:"white"}}>Shopping Cart</h1>
        <Row>{cards}</Row>
        <Card style={{textAlign: 'right'}}>
          <div style={{margin: '5px 10px 0 0', display: 'inline', fontSize: '24px'}}>${this.props.cart.total.toFixed(2)}</div>
          <Button intent={Intent.PRIMARY} text="Checkout" onClick={() => this.props.router.push('/checkout')} />
        </Card>
      </>
    );

    
  }
}
