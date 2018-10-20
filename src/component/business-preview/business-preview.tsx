import * as React from 'react';
import { Icon, Card, Elevation, H3, Divider} from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { Grid,  Row, Col } from 'react-flexbox-grid';

import { Business } from 'src/models';
import "./style.css";

export type BusinessPreviewProps = { model: Business; };

export class BusinessPreview extends React.Component<BusinessPreviewProps> {
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
    const photoUrl = 'https://picsum.photos/96/96/?random&_=' + buster;

    return (
      <Card interactive={true} elevation={Elevation.TWO} style={{margin: '10px'}}>
        <Grid><Row middle="xs" between="xs">
            <Col>
                <Link to="/business">
                    <H3><a href="#">{name}</a></H3>
                </Link>
                <span>{pricingDisplay}</span>&nbsp;—&nbsp;
                <span>{distance}mi</span>&nbsp;—&nbsp;
                <span>{stars}</span><br/>
                Business motto or description
            </Col>
            <Row around="md" end="xs">
              <Col md={2}><img src={photoUrl} /></Col>
              <Col md={2}><img src={photoUrl+1} /></Col>
              <Col md={2}><img src={photoUrl+2} /></Col>
              <Col md={2} style={{marginRight: '10px'}}><img src={photoUrl+3} /></Col>
            </Row>
        </Row></Grid>
      </Card>
    );
  }
}