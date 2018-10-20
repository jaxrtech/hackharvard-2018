import * as React from 'react';
import { Row, Col } from 'react-flexbox-grid';

import { Item } from 'src/models';
import { Card, Elevation, Button, NumericInput } from '@blueprintjs/core';

import "./style.css";

type ItemOrderProps = { model: Item };
export class ItemOrderComponent extends React.Component<ItemOrderProps> {
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