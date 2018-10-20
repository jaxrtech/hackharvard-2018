import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Card, Elevation, Icon } from '@blueprintjs/core';
import * as Rating from 'react-rating';

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

    const stars = (
      React.createElement(Rating as any, {
        emptySymbol:"fa fa-star-o fa-2x",
        fullSymbol: "fa fa-star fa-2x",
        initialRating: rating
      })
    );

    return (
      <Card interactive={true} elevation={Elevation.TWO}>
        <h5><a href="#">{name}</a></h5>
        <span>{distance} mi</span>
        <span>{stars}</span>
      </Card>
    );
  }
}

@observer
export class RegisterPage extends React.Component {

  @observable private results: Business[] = [];

  public async componentDidMount() {
    const json = await fetch('/mock/business.json').then(x => x.json());
    this.results = getRandom(json, 25);
  }

  public render() {
    return (
      <div>
        <div className="bp3-input-group bp3-large">
          <span className="bp3-icon bp3-icon-search"></span>
          <input className="bp3-input" type="search" placeholder="Search input" dir="auto" />
        </div>
      </div>


    );
  }
}
