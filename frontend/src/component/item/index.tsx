import * as React from 'react';
import { Row, Col } from 'react-flexbox-grid';

import { Item, Business } from 'src/models';
import { H5, Card, Elevation, Button, NumericInput, Intent } from '@blueprintjs/core';

import "./style.css";
import { observable, when, IReactionDisposer, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { ShoppingCartStore } from 'src/stores/app';

type ItemOrderProps = { model: Item, cart: ShoppingCartStore };

const DUMMY_BUSINESS = {
  "id": "40b35444-e419-40e4-9d2f-178dfaeec0b6",
  "name": "Skiles-Simonis",
  "rating": 2.0,
  "distance": 7.0,
  "pricing": 2,
  "department": "Kids"
} as Business;

@inject('cart')
@observer
export class ItemOrderComponent extends React.Component<ItemOrderProps> {

  @observable private quantity = 0;
  @observable private inCart = false;

  @computed private get action() {
    if (!this.inCart) {
      return { intent: Intent.SUCCESS, text: "Add" };
    }

    // inCart === true &&
    if (this.quantity > 0) {
      return { intent: Intent.PRIMARY, text: "Update" };
    } else {
      return { intent: Intent.DANGER, text: "Remove" };
    }
  }

  private dispose: IReactionDisposer;

  public componentWillMount() {
    this.dispose = when(
      () => this.inCart && this.quantity >= 1,
      () => this.handleAction(),
    );
  }

  public componentWillUnmount() {
    if (this.dispose) {
      this.dispose();
    }
  }

  private handleAction = () => {
    const oldQuantity = this.quantity;

    if (!this.inCart) {
      this.quantity = (oldQuantity <= 0) ? 1 : oldQuantity;
      this.inCart = true;
    }

    const newOrder = this.props.cart.addOrUpdate({ item: this.props.model, quantity: this.quantity, business: DUMMY_BUSINESS });
    if (!newOrder) {
      this.inCart = false;
      this.quantity = 0;
    }

    console.log('cart', this.props.cart.orders);
  }

  public render() {
    const { name, price, unitOfMeasurement } = this.props.model;

    const buster = Math.floor(1000 * Math.random());
    const photoUrl = 'https://picsum.photos/64/64/?random&_=' + buster;

    return (
      <Card className="rw-item-order-card" interactive={true} elevation={Elevation.ONE}>
        <H5 className="itemOrderName">{name}</H5>
        <Row between="xs" middle="xs">
          <Col>
            <img className="itemOrderPicture" src={photoUrl} />
          </Col>

          <Col>
            <Row end="xs">
              <span className="itemOrderPrice">${price}/{unitOfMeasurement}</span>
            </Row>
            <Row end="xs" className="itemOrderBuy">
              <NumericInput style={{width:"30px"}} min={0} max={100} value={0} onValueChange={x => this.quantity = x} />
              <Button icon="shopping-cart" onClick={this.handleAction} intent={this.action.intent}>{this.action.text}</Button>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  }
}