import * as React from 'react';
import { Icon, Card, Elevation, H3, Divider} from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { Grid,  Row, Col } from 'react-flexbox-grid';

import { Business } from 'src/models';

export type BusinessPreviewProps = {
    model: Business;
    onClick?: (model: Business) => void;
  };

export class BusinessPreview extends React.Component<BusinessPreviewProps> {
    private handleClick = (e: React.MouseEvent) => {
        const f = this.props.onClick;
        if (f) { f(this.props.model); }
    }

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

    const buster = Math.floor(1000 * Math.random()); // copypasta
    const photoUrl = 'https://picsum.photos/64/64/?random&_=' + buster;

    return (
      <Card interactive={true} elevation={Elevation.TWO}>
        <Grid><Row>
            <Col md={5}>
                <Link to="/business">
                    <H3><a href="#">{name}</a></H3>
                </Link>
                <span>{pricingDisplay}</span>&nbsp;—&nbsp;
                <span>{distance} mi</span>&nbsp;—&nbsp;
                <span>{stars}</span><br/>
                Business motto or description
            </Col>
            <Col>
                <img src={photoUrl} />
            </Col>
            <Col>
                <img src={photoUrl} />
            </Col>
        </Row></Grid>
      </Card>
    );
  }
}