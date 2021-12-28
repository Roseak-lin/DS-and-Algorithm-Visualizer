import React from "react";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { QuestionCircle } from "react-bootstrap-icons";

export default class NavBar extends React.Component {
    render() {
        return (
            <Nav
                id="nav"
                justify
                variant="pills"
                defaultActiveKey="list"
                onSelect={(key) => {
                    this.props.onchange(key);
                }}
            >
                <Nav.Item className="nav_title">
                    <Nav.Link
                        onClick={() => {
                            window.location.href = window.location.href.substring(0, window.location.href.indexOf("#"));
                        }}
                    >
                        Data Structure Visualizer
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="list">
                        Dynamic Array (List)
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ hide: 100 }}
                            overlay={(props) => {
                                return (
                                    <Tooltip {...props}>
                                        A list is a very flexible data structure that allows for insertion and deletion at any index
                                    </Tooltip>
                                );
                            }}
                        >
                            <QuestionCircle />
                        </OverlayTrigger>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="set">
                        Set
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ hide: 100 }}
                            overlay={(props) => {
                                return <Tooltip {...props}>A set is very similar to a list, but cannot store duplicate items</Tooltip>;
                            }}
                        >
                            <QuestionCircle />
                        </OverlayTrigger>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="queue">
                        Queue
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ hide: 100 }}
                            overlay={(props) => {
                                return (
                                    <Tooltip {...props}>
                                        A queue is a data structure that only allows a user to insert data at the front and process data in a FIFO
                                        fashion
                                    </Tooltip>
                                );
                            }}
                        >
                            <QuestionCircle />
                        </OverlayTrigger>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="deque">
                        Deque
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ hide: 100 }}
                            overlay={(props) => {
                                return (
                                    <Tooltip {...props}>
                                        A deque (Double Ended Queue) is very similar to a queue, except items can be added and removed at both ends of
                                        the queue
                                    </Tooltip>
                                );
                            }}
                        >
                            <QuestionCircle />
                        </OverlayTrigger>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="stack">
                        Stack
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ hide: 100 }}
                            overlay={(props) => {
                                return (
                                    <Tooltip {...props}>
                                        A stack is a data structure that only allows items to be added and removed from the front of the data
                                        structure
                                    </Tooltip>
                                );
                            }}
                        >
                            <QuestionCircle />
                        </OverlayTrigger>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}
