import * as React from 'react';
import { BusinessCard } from 'src/component/business-card';
import { Card, Elevation, Button } from '@blueprintjs/core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import './style.css';

const DUMMY = { "name": "Avalon inc.", "rating": 1.0, "distance": 7.0, "pricing": 2, "department": "Cleaning" };

interface Item {
  name: string;
  price: number; // TODO(Bowden): use decimal numbers not float!
  unit: string;
}

interface ItemOrder {
  item: Item;
  quanity: number;
}

type ItemOrderCard = { model: Item };
class ItemOrder extends React.Component<ItemOrderCard> {
  public render() {
    const { name, price, unit} = this.props.model;

    return (
      <Card className="rw-item-order-card" interactive={true} elevation={Elevation.ONE}>
        <h5><a href="#">{name}</a></h5>
        <span>${price}/{unit}</span>
        <Button icon="shopping-cart">Buy</Button>
      </Card>
    );
  }
}

@observer
export class BusinessPage extends React.Component {

  @observable private results: Item[] = [];

  public async componentDidMount() {
    const json = await fetch('/mock/items.json').then(x => x.json());
    console.log('business', json);
    this.results = json;
  }
  
  public render() {
    const cards = this.results.map((x, i) => <ItemOrder key={i} model={x} />);

    return (
      <>
        <h1>Avalon</h1>
        <BusinessCard model={DUMMY} />

        <h2>Products</h2>
        {cards}
      </>
    );
  }
}
