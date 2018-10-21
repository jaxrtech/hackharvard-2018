import * as React from 'react';
import { Row, Col } from 'react-flexbox-grid';

import { Item, Business } from 'src/models';
import { Card, Elevation, Button, NumericInput, Intent } from '@blueprintjs/core';

import "./style.css";
import { observable, when, IReactionDisposer, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { ShoppingCartStore } from 'src/stores/app';

type ItemOrderProps = { model: Item, cart: ShoppingCartStore };

const DUMMY_BUSINESS = { "name": "Skiles-Simonis", "rating": 2.0, "distance": 7.0, "pricing": 2, "department": "Kids" } as Business;

@inject('cart')
@observer
export class ItemOrderComponent extends React.Component<ItemOrderProps> {

  @observable private quantity = 0;
  @observable private didBuy = false;

  @computed private get action() {
    if (!this.didBuy) {
      return { intent: Intent.SUCCESS, text: "Buy" };
    }

    // didBuy === true &&
    if (this.quantity > 0) {
      return { intent: Intent.PRIMARY, text: "Update" };
    } else {
      return { intent: Intent.DANGER, text: "Remove" };
    }
  }

  private dispose: IReactionDisposer;

  public componentWillMount() {
    this.dispose = when(
      () => this.didBuy && this.quantity >= 1,
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

    if (!this.didBuy) {
      this.quantity = (oldQuantity <= 0) ? 1 : oldQuantity;
      this.didBuy = true;
    }

    const newOrder = this.props.cart.addOrUpdate({ item: this.props.model, quantity: this.quantity, business: DUMMY_BUSINESS });
    if (!newOrder) {
      this.didBuy = false;
      this.quantity = 0;
    }

    console.log('cart', this.props.cart.orders);
  }

  public render() {
    const { name, price, measurement } = this.props.model;

    const buster = Math.floor(1000 * Math.random());
    const photoUrl = 'https://picsum.photos/64/64/?random&_=' + buster;

    return (
      <Col xs={12}>
        <Card className="rw-item-order-card" interactive={true} elevation={Elevation.ONE}>
          <Row>
            <Col xs={1}>
              <img className="itemOrderPicture" src={photoUrl} />
            </Col>

            <Col xs={5}>
              <h5 className="itemOrderName">{name}</h5>
            </Col>

            <Col xs={6}>
              <Row end="xs">
                <span className="itemOrderPrice">${price}/{measurement}</span>
              </Row>
              <Row end="xs" className="itemOrderBuy">
                <NumericInput min={0} max={100} value={0} onValueChange={x => this.quantity = x} />
                <Button icon="shopping-cart" onClick={this.handleAction} intent={this.action.intent}>{this.action.text}</Button>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    );
  }
}