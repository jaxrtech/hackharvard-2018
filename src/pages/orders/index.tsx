import * as React from 'react';
import { Card, Elevation, Button, Divider } from '@blueprintjs/core';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { Item, OrdersByBusiness, Order, ItemOrder, Business } from 'src/models';
import { BusinessCard } from 'src/component/business-card';
import { sampleSize, sample, range } from 'lodash-es';

import './style.css';
import { Route, RouteComponentProps, Switch, RouterProps } from 'react-router';
import { RouterStore } from 'mobx-react-router';

function pickRandom<T>(arr: T[]) {
  return arr[Math.floor(arr.length * Math.random())];
}

type ItemOrderCardProps = { model: ItemOrder };
class ItemOrderCard extends React.Component<ItemOrderCardProps> {
  public render() {
    const { name, price, unit } = this.props.model.item || { name: "WTF", price: 999.99, unit: "WTF" };
    const { quantity } = this.props.model;

    const buster = Math.floor(1000 * Math.random());
    const photoUrl = 'https://picsum.photos/64/64/?random&_=' + buster;

    return (
      <Card className="rw-item-order-card" interactive={true} elevation={Elevation.ONE}>
        <img width="64" height="64" style={{ float: 'left' }} src={photoUrl} />
        <h5><a href="#">{name}</a></h5>
        <span>{quantity} {unit}s</span>
      </Card>
    );
  }
}

type OrderCardProps = { model: Order; };
class OrderCard extends React.Component<OrderCardProps> {
  public render() {
    const orders = this.props.model.items.map((x, i) => <ItemOrderCard key={i} model={x} />);
    return (
      <>
        <h3>{this.props.model.timestamp.toDateString()}</h3>
        {orders}
      </>
    );
  }
}

type OrdersByBusinessPanelProps = { model: OrdersByBusiness; };
class OrdersByBusinessPanel extends React.Component<OrdersByBusinessPanelProps> {
  public render() {
    const orders = this.props.model.orders.map((x, i) => <OrderCard key={i} model={x} />);
    const { name } = this.props.model.business;
    return (
      <>
        <h3>{name}</h3>
        {orders}
      </>
    );
  }
}

type OrdersByBusinessPanelWithIdProps = PageIdProps & { store: OrdersByBusinessStore };
class OrdersByBusinessPanelWithId extends React.Component<OrdersByBusinessPanelWithIdProps> {
  public componentWillReceiveProps() {
    console.log('OrdersByBusinessPanelWithId', { props: this.props });
  }
  
  public render() {
    const model = this.props.store.results[parseInt(this.props.id, 10)];
    return <OrdersByBusinessPanel model={model} />;
  }
}

type RoutingProps = RouteComponentProps<{ id: string }>;
type PageIdProps = { id: string };

function withRouting<T>(WrappedComponent: React.ComponentType<T & PageIdProps>) {
  return class extends React.Component<RoutingProps> {
    private uuid: string;

    constructor(props: Readonly<RoutingProps>) {
      super(props);
      this.uuid = this.props.match.params.id;
    }

    public render() {
      return <WrappedComponent id={this.uuid} />;
    }
  };
}

class OrdersByBusinessStore {
  
  @observable public ready = false;
  @observable public loading = false;
  @observable public error = null as Error | null;
  @observable public results: OrdersByBusiness[] = []; 
  
  public async load() {
    try {
      this.loading = true;
      await this._load();
      this.ready = true;
    } catch (err) {
      this.error = err;
      return;
    } finally {
      this.loading = false;
    }
  }

  private async _load() {
    const businesses = await fetch('/mock/business.json').then(x => x.json()) as Business[];
    const items = await fetch('/mock/items.json').then(x => x.json()) as Item[];

    const numOfBusinesses = 2 + Math.floor(7 * Math.random());
    const numOfOrderPerBusiness = 3 + Math.floor(10 * Math.random());
    const months = range(1, 13);
    const days = range(1, 31);

    const pickedBusinesses = sampleSize(businesses, numOfBusinesses);

    const results = pickedBusinesses.map(b => {
      const orders: Order[] = [];
      for (let i = 0; i < numOfOrderPerBusiness; i++) {
        const quantity = 5 + Math.floor(100 * Math.random());
        orders.push({
          items: sampleSize(items, 10).map(item => ({ item, quantity } as ItemOrder)),
          timestamp: new Date(2018, sample(months) as number, sample(days))
        });
      }

      const x: OrdersByBusiness = { business: b, orders };
      return x;
    });

    this.results = results;
  }
}

@inject('router')
@observer
export class OrderPage extends React.Component<{ router: RouterStore }> {

  private store = new OrdersByBusinessStore();

  public async componentDidMount() {
    await this.store.load();
  }

  private handleSelectBusiness = (x: Business, i: number) => {
    this.props.router.push('/orders/' + i);
  }

  public render() {
    const businesses = this.store.results.map(x => x.business).map((x, i) =>
      <Route key={i}>
        <Card  className="rw-orders-card" onClick={(e) => this.handleSelectBusiness(x, i)}>
          <h5>{x.name}</h5>
        </Card>
      </Route>
    );

    const Component = withRouting((props) => <OrdersByBusinessPanelWithId store={this.store} {...props} />);

    return (
      <>
        <h1>Orders</h1>
        <Grid fluid={true}>
          <Row>
            <Col className="rw-orders-panel" xs={3}>
              {businesses}
            </Col>
            <Col xs={9}>
              {(!this.store.ready) ? <>Loading...</> : <Route path="/orders/:id" component={Component} />}
            </Col>
          </Row>
        </Grid>
      </>
    );
  }
}

