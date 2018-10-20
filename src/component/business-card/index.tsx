import * as React from 'react';
import { Icon, Card, Elevation } from '@blueprintjs/core';

import { Business } from 'src/models';
import "./style.css";

export type BusinessCardProps = { model: Business; };

export class BusinessCard extends React.Component<BusinessCardProps> {
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
        <h5><a className="businessName" href="#">{name}</a></h5>
        <span className="businessPricing">{pricingDisplay}</span>
        <span className="businessDistance">{distance} mi</span>
        <span className="businessStars">{stars}</span>
      </Card>
    );
  }
}