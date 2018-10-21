import * as React from 'react';
import { Experience } from 'src/models';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Col, Row, Grid } from 'react-flexbox-grid';
import { Card, Elevation } from '@blueprintjs/core';

@observer
export class ExperiencePage extends React.Component {
    @observable private results: Experience[] = []; 

    public async componentDidMount() {
        const json = await fetch('/mock/experiences.json').then(x => x.json());
        console.log('experiences', json);
        this.results = json;
    }

    public render() {
        const cards = this.results.map((x, i) => <ExperienceComponent key={i} model={x} />);
        console.log(this.results);
        
        return (
            <>
                <h1>Experiences</h1>
                <h2>Things to do this Weekend!</h2>
                <Grid>{cards}</Grid>
            </>
        );
    }
}

type ExperienceProps = { model: Experience };
@observer
export class ExperienceComponent extends React.Component<ExperienceProps> {
    public render() {
        const { eventType, name, by, date, contact, address, spotsLeft } = this.props.model;
        return (
          <Col xs={12}>
            <Card className="rw-item-order-card" interactive={true} elevation={Elevation.ONE}>
              <Row>
                <Col xs={1}>
                  
                </Col>
    
                <Col xs={5}>
                  <h5 className="itemOrderName">{name}</h5>
                </Col>
    
                <Col xs={6}>
                  <Row end="xs">
                    <span className="itemOrderPrice">${by}/{date}</span>
                  </Row>
                  <Row end="xs" className="itemOrderBuy">
                    
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        );
      }
}