import * as React from 'react';
import { Icon, Card, Elevation, H3} from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { Grid,  Row, Col } from 'react-flexbox-grid';

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
    const { name, distance, pricing, rating, blurb, imgurl } = this.props.model;

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
      <Card className="business-card" elevation={Elevation.ONE}>
        <Grid><Row middle="xs" between="xs">
          <Col md={5}>
            <Link to="/business">
              <H3><a href="#">{name}</a></H3>
            </Link>
            <span>{pricingDisplay}</span>&nbsp;—&nbsp;
            <span>{distance}mi</span>&nbsp;—&nbsp;
            <span>{stars}</span><br/><br/>
            <p>{blurb}</p>
          </Col>
          <Col>
            <img width={325} src={imgurl} />
          </Col>
        </Row></Grid>
      </Card>
    );
  }
}