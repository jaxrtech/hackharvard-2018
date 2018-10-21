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
                <h1 style={{color:"white"}}>Experiences</h1>
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
        
        return (
            <>
            <h2 style={{color:"white"}}>{eventType}</h2>
            <Row>
                <p hidden={true}>{counter = counter + 1}</p>
                <Col xs={6}>
                    <Card className="rw-experience-card" interactive={true} elevation={Elevation.ONE}>
                    <h2 className="expName">{events[0].name}</h2>
                        <span className="expBy">By: {events[0].by}</span>
                        <Row>    
                            <Col className="expInfo" xs={5}>
                                <Row><span>When: {events[0].date}</span></Row>        
                                <Row><span>Where: {events[0].address}</span></Row>        
                                <Row><span>Contact: {events[0].contact}</span></Row>
                            </Col>
                            <Col className="expButton" xs={3}>
                                <Row end="xs"><span>Spots Left: {events[0].spotsLeft}</span></Row>
                                <Row end="xs"><button className="bp3-button" type="button">Register!</button></Row>
                            </Col>
                            <Col xs={4}>
                                <Row><img className="expImg" src={"img/exp"+counter+".png"}/></Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <p hidden={true}>{counter = counter + 1}</p>
                <Col xs={6}>
                    <Card className="rw-experience-card" interactive={true} elevation={Elevation.ONE}>
                        <h2 className="expName">{events[1].name}</h2>
                        <span className="expBy">By: {events[1].by}</span>
                        <Row>    
                            <Col className="expInfo" xs={5}>
                                <Row><span>When: {events[1].date}</span></Row>        
                                <Row><span>Where: {events[1].address}</span></Row>        
                                <Row><span>Contact: {events[1].contact}</span></Row>
                            </Col>
                            <Col className="expButton" xs={3}>
                                <Row end="xs"><span>Spots Left: {events[1].spotsLeft}</span></Row>
                                <Row end="xs"><button className="bp3-button" type="button">Register!</button></Row>
                            </Col>
                            <Col xs={4}>
                                <Row><img className="expImg" src={"img/exp"+counter+".png"}/></Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <p hidden={true}>{ counter === 4? counter = 0 : counter}</p>
            </Row>
        </>
        );
    }
}