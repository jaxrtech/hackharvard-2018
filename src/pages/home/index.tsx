import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import { ConfigStore } from 'src/stores/app';
import { WeatherService } from 'src/services/weather';

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

  @observable private counter = 0;

  constructor(props: any) {
    super(props);

    const { config } = this.props;
    this.counter = config.INITIAL_COUNTER;
  }

  public render() {
    const CHICAGO = { lat: 41.8781, long: -87.6298 };
    
    return (
      <>
        <h1>React Starter Kit</h1>
        <p>Counter: {this.counter}</p>
        <WeatherWidget lat={CHICAGO.lat} long={CHICAGO.long} />
      </>
    );
  }
}