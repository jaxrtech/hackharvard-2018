import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import { ConfigStore } from 'src/stores/app';
import { WeatherService } from 'src/services/weather';
import { Grid,  Row, Col } from 'react-flexbox-grid';

import "./style.css";

type WeatherWidgetProps = { lat: number, long: number };

@observer
export class WeatherWidget extends React.Component<WeatherWidgetProps> {

  private api = new WeatherService();

  public componentDidMount() {
    const { lat, long } = this.props;
    this.api.update(lat, long);
  }

  public render() {
    if (!this.api.ready) { return <p>Loading...</p>; }

    const { location, forecast } = this.api.current;

    return (
      <>
        <h2>{location.city}, {location.state}</h2>
        <h3>{forecast.temperature} &deg;{forecast.temperatureUnit}</h3>
        <h4>{forecast.shortForecast}</h4>
      </>
    );
  }
}

@inject('config')
@observer
export class HomePage extends React.Component<{ config: ConfigStore }> {

  

  constructor(props: any) {
    super(props);

    const { config } = this.props;
    
  }

  public render() {
    
    return (
      <>
        <h1 className="title">Runway</h1>
        <div>
          <div className="bp3-input-group bp3-large">
            <span className="bp3-icon bp3-icon-search"></span>
            <input className="bp3-input" type="search" placeholder="Search input" dir="auto" />
          </div>
        </div>
        
        <Grid fluid={true}>
          <Row around="xs" className="Row">
            <Col xs={2}>
              <h2>Home Improvement</h2>
              <ul>
                <li>Painting</li>
                <li>Gardening</li>
              </ul>
            </Col>
            <Col xs={2} >
              <h2>Parties</h2>
              <ul>
                <li>Catering</li>
                <li>Venues</li>
              </ul>
            </Col>
            <Col xs={2} >
              <h2>Bowden</h2>
              <ul>
                <li>Josh</li>
                <li>Wow</li>
              </ul>
            </Col>
          </Row>
        </Grid>

      </>
    );
  }
}