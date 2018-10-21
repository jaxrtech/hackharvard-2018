import * as React from 'react';
import { Tag } from '@blueprintjs/core';
import { Row, Col } from 'react-flexbox-grid';

import "./style.css";


export class Bubble extends React.Component<{color?: string, text: string}> {
    private pickColor() {
        return ["#f9d563", "#64dcc4", "#ea667c"][Math.floor(Math.random() * 3)];
    }

    public render() {
        console.log(this.props.text);
        console.log("^ text");
        return (
            <Col className="bubbleCol" md={2}>
                <Tag style={{backgroundColor: this.props.color ? this.props.color : this.pickColor() }} large={true} round={true}>{this.props.text}</Tag>
            </Col>
        );
    }
}