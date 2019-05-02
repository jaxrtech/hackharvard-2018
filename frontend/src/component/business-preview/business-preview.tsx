import * as React from 'react';
import { Icon, Card, Elevation, H3, Divider } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { Business, BusinessSearchResult } from 'src/models';
import "./style.css";
import { mockImageUrl } from 'src/util/mock';

export type BusinessPreviewProps = { model: BusinessSearchResult; onClick: () => void };

// https://www.geodatasource.com/developers/javascript
function distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: string) {
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === "K") { dist = dist * 1.609344; }
  if (unit === "N") { dist = dist * 0.8684; }
  return dist;
}

export class BusinessPreview extends React.Component<BusinessPreviewProps> {
  public render() {
    const { name, longitude, latitude } = this.props.model;
    const rating = this.props.model.stars;

    const HARVARD = { lat: 42.3770, long: -71.1167 };
    const milesQ = distance(latitude, longitude, HARVARD.lat, HARVARD.long, "M");
    const miles = Math.floor(milesQ * 10) / 100;

    const pricing = 1 + Math.floor(2 * Math.random());
    const pricingDisplay = "$".repeat(pricing);
    const fullStar = <Icon icon="star" />;
    const emptyStar = <Icon icon="star-empty" />;

    const stars: any[] = [];
    let i = 0;
    for (; i < rating; i++) {
      stars.push(fullStar);
    }
    for (; i < 5; i++) {
      stars.push(emptyStar);
    }

    const buster = Math.floor(1000 * Math.random()); // copypasta
    const photoUrl = (x: number) => mockImageUrl(96, 96, (Math.random() * 1000 + x).toString());

    return (
      <Card interactive={true} elevation={Elevation.TWO} style={{ margin: '10px' }} onClick={this.props.onClick}>
        <Grid><Row middle="xs" between="xs">
          <Col>
            <Link to="/business">
              <H3><a href="#">{name}</a></H3>
            </Link>
            <span>{pricingDisplay}</span>&nbsp;—&nbsp;
                <span>{(Math.random() * 10).toFixed(2)} mi</span>&nbsp;—&nbsp;
                <span>{stars}</span><br />
            <span></span>
          </Col>
          <Row around="md" end="xs">
            <Col md={2}><img width="96" height="96" src={photoUrl(0)} /></Col>
            <Col md={2}><img width="96" height="96" src={photoUrl(1)} /></Col>
            <Col md={2}><img width="96" height="96" src={photoUrl(2)} /></Col>
            <Col md={2} style={{ marginRight: '10px' }}><img src={photoUrl(3)} /></Col>
          </Row>
        </Row>
        </Grid>
      </Card>
    );
  }
}