import * as React from 'react';
import { Experience } from 'src/models';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Col, Row, Grid } from 'react-flexbox-grid';
import { Card, Elevation } from '@blueprintjs/core';


import './style.css';
import { fill } from 'lodash-es';
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
let counter = 0;
type ExperienceProps = { model: Experience };
@observer
export class ExperienceComponent extends React.Component<ExperienceProps> {
    public render() {
        const resizeMode = 'center';
        const { eventType, events } = this.props.model;
        counter = counter + 1;
        const styles = {
            container: {
                backgroundImage: "url(/img/exp"+counter+".png)",
                flex:1,
                backgroundColor: 'rgba(0,0,0,.6)'
            }
        };
        return (
            <Col xs={6}>
                <Card style={styles.container} className="rw-experience-card" interactive={true} elevation={Elevation.ONE}>
                    <h2>{events[0].name}</h2>
                    <span className="expBy">By: {events[0].by}</span>
                    <Row>    
                        <Col xs={4}>
                            <Row><span>Contact: {events[0].contact}</span></Row>
                        </Col>
                        <Col xs={4}>
                            <Row><span>Date: {events[0].date}</span></Row>        
                            <Row><span>Address: {events[0].address}</span></Row>
                        </Col>
                        <Col xs={4}>
                            <Row><span>Spots Left: {events[0].spotsLeft}</span></Row>
                            <Row><button className="bp3-button" type="button">Register!</button></Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
        );
    }
}