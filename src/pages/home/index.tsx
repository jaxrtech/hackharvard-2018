import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { Grid,  Row, Col } from 'react-flexbox-grid';

import { ConfigStore } from 'src/stores/app';
import { SearchBar } from 'src/component/search-bar';

import "./style.css";

@inject('router')
@inject('config')
@observer
export class HomePage extends React.Component<{ config: ConfigStore, router: RouterStore }> {

  constructor(props: any) {
    super(props);

    const { config } = this.props;
  }

  public render() {
    return (
      <>
        <h1 className="title">Runway</h1>
        <SearchBar router={this.props.router} />
        
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