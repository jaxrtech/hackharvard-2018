import * as React from 'react';
import { Icon, Card, Elevation } from '@blueprintjs/core';

import { Business } from 'src/models';
import "./style.css";

export type BusinessCardProps = {
  model: Business;
  onClick?: (model: Business) => void;
};

export class BusinessCard extends React.Component<BusinessCardProps> {
  private handleClick = (e: React.MouseEvent) => {
    const f = this.props.onClick;
    if (f) { f(this.props.model); }
  }

  public render() {
    const { name, distance, pricing, rating } = this.props.model;

    const pricingDisplay = "$".repeat(pricing);
    const fullStar = <Icon icon="star" iconSize={20} />;
    const emptyStar = <Icon icon="star-empty" iconSize={20} />;

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
        <h5><a className="businessCardName" href="#">{name}</a></h5>
        <span className="businessCardStars">{stars}</span>
        <span className="businessCardPricing">{pricingDisplay}</span>
        <span className="businessCardDistance">{distance} mi</span>
      </Card>
    );
  }
}