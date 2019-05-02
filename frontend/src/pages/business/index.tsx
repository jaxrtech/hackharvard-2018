import * as React from 'react';
import { BusinessCard } from 'src/component/business-card';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'react-flexbox-grid';

import { Item } from 'src/models';
import { ItemOrderComponent } from 'src/component/item';
import { ShoppingCartStore, ConfigStore } from 'src/stores/app';

const DUMMY = {
  "id": "627f4613-83f1-4cab-8387-d56311edb30f",
  "name": "Avlon Inc.",
  "rating": 4.0,
  "distance": 7.0,
  "pricing": 2,
  "department": "Cleaning",
  "imgurl": "/img/business_1.jpg",
  "blurb": "Avalon is super super super cool, but there's one teensy little problem.  We don't have potable water where we are, so all our food products are made with Simple Green instead of water.  We hope that's OK :)"
};

@inject('cart')
@inject('config')
@observer
export class BusinessPage extends React.Component<{ config: ConfigStore, cart: ShoppingCartStore }> {

  @observable private results: Item[] = [];

  public async componentDidMount() {
    const json = await fetch(this.props.config.API_ROOT_URL + '/inventory?select=id:product_id,product(name),quantity,price,unitOfMeasurement:unit_of_measure&limit=25&store_id=eq.1').then(x => x.json());
    console.log('business: ', json);
    this.results = json;
  }
  
  public render() {
    if (!Array.isArray(this.results)) { return <></>; }

    const cards = this.results.map((x, i) =>
      <Col key={i} md={6}>
        <ItemOrderComponent model={x} cart={this.props.cart} />
      </Col>
    );

    return (
      <>
        <BusinessCard model={DUMMY} />
        <h2 style={{color:"white"}}>Products</h2>
        <Row>{cards}</Row>
      </>
    );
  }
}
