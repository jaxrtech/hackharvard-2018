import * as React from 'react';
import { BusinessCard } from 'src/component/business-card';
import { Card, Elevation, Button, NumericInput } from '@blueprintjs/core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Row, Col } from 'react-flexbox-grid';

import { Item } from 'src/models';
import './style.css';

const DUMMY = { "name": "Avalon inc.", "rating": 1.0, "distance": 7.0, "pricing": 2, "department": "Cleaning" };

type ItemOrderCard = { model: Item };
class ItemOrder extends React.Component<ItemOrderCard> {
  public render() {
    const { name, price, unit } = this.props.model;

    const buster = Math.floor(1000 * Math.random());
    const photoUrl = 'https://picsum.photos/64/64/?random&_=' + buster;
    
    return (
      <Col xs={8}>
        <Card className="rw-item-order-card" interactive={true} elevation={Elevation.ONE}>
          <Row>
            <Col xs={1}>
              <img className="itemOrderPicture" src={photoUrl} />            
            </Col>

            <Col xs={5}>
              <h5 className="itemOrderName"><a href="#">{name}</a></h5>
            </Col>

            <Col xs={6}>
              <Row end="xs">
                <span className="itemOrderPrice">${price}/{unit}</span>
              </Row>
              <Row end="xs" className="itemOrderBuy">
                <NumericInput min={1} max={100} value={1}/>
                <Button icon="shopping-cart">Buy</Button>
              </Row>
            </Col>
          </Row>      
      </Card>
    </Col>
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
        <h1>Avalon inc.</h1>
        <Col xs={4}>
          <BusinessCard model={DUMMY} />
        </Col>
        
        <Col xs={4}>
          <img src="../../../public/img/business_1.jpg"></img>
        </Col>

        <h2>Products</h2>
        {cards}
      </>
    );
  }
}
