import * as React from 'react';
import { Tag } from '@blueprintjs/core';
import { Row, Col } from 'react-flexbox-grid';

import "./style.css";

export type BubbleProps = {
    color?: string;
    text: string;
    onClick?: ((text: string) => void);
}

export class Bubble extends React.Component<BubbleProps> {
    private pickColor() {
        return ["#f9d563", "#64dcc4", "#ea667c"][Math.floor(Math.random() * 3)];
    }

    private bubblesearch = (e: React.MouseEvent<HTMLDivElement>) => {
        if (this.props.onClick) {
            this.props.onClick(this.props.text);
        }
    }

    public render() {
        console.log(this.props.text);
        console.log("^ text");
        return (
            <Col className="bubbleCol" md={2}>
                <Tag style={{backgroundColor: this.props.color ? this.props.color : this.pickColor() }} interactive={true} onClick={this.props.onClick} large={true} round={true}>{this.props.text}</Tag>
            </Col>
        );
    }
}