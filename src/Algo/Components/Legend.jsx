import React from "react";

import { Row } from "react-bootstrap";

import algo from "../AlgoVisualizer.module.css";

export default class Legend extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.graph === "unweighted") {
            return (
                <Row className={`${algo.legend}`}>
                    <div className={`${algo.grid_square} ${algo.selected}`} />
                    <span className={`${algo.legend_label}`}>Blocked Node</span>
                </Row>
            );
        } else {
            return (
                <Row className={`${algo.legend}`}>
                    <div className={`${algo.grid_square}`}>1</div>
                    <span className={`${algo.legend_label}`}>Weighted Node</span>
                </Row>
            );
        }
    }
}
