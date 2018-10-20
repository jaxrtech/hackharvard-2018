import * as React from 'react';
import { Icon, Card, Elevation } from '@blueprintjs/core';

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
        <h5><a href="#">{name}</a></h5>
        <span>{pricingDisplay}</span>
        <span>{distance} mi</span>
        <span>{stars}</span>
      </Card>
    );
  }
}