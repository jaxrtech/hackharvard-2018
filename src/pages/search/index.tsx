import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Card, Elevation, Icon } from '@blueprintjs/core';
import * as Rating from 'react-rating';
import { startsWith } from 'lodash-es';

interface Business {
  name: string;
  rating: number;
  distance: number;
  pricing: number;
}

function getRandom<T>(arr: T[], n: number) {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len) {
    throw new RangeError("getRandom: more elements taken than available");
  }
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

type BusinessCardProps = { model: Business; };

class BusinessCard extends React.Component<BusinessCardProps> {
  public render() {
    const { name, distance, pricing, rating } = this.props.model;

    const pricingDisplay = "$".repeat(pricing);
    const fullStar = <Icon icon="star" />;
    const emptyStar = <Icon icon="star-empty" />;

    const stars = [];
    let i = 0;
    for (; i < rating; i++) {
      stars.push(fullStar);
    }
    for (; i < 5; i++) {
      stars.push(emptyStar);
    }

    return (
      <Card interactive={true} elevation={Elevation.TWO}>
        <h5><a href="#">{name}</a></h5>
        <span>{pricingDisplay}</span>
        <span>{distance} mi</span>
        <span>{stars}</span>
      </Card>
    );
  }
}

@observer
export class SearchPage extends React.Component {

  @observable private results: Business[] = [];

  public async componentDidMount() {
    const json = await fetch('/mock/business.json').then(x => x.json());
    console.log('serach', json);
    this.results = json;
  }

  public render() {
    const cards = this.results.map((x, i) => <BusinessCard key={i} model={x} />);

    return (
      <>
      <div>
        <div className="bp3-input-group bp3-large">
          <span className="bp3-icon bp3-icon-search"></span>
          <input className="bp3-input" type="search" placeholder="Search input" dir="auto" />
        </div>
      </div>
      
      {cards}
      </>
    );
  }
}
