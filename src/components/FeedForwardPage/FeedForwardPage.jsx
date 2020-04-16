import React, { Component } from "react";
import styled from "styled-components";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { FeedForward } from "../../feedforward/feedforward";

const InputContainer = styled.div`
  display: block;
  margin: 20px;
`;

export class FeedForwardPage extends Component {
  render() {
    let AndGate = new FeedForward(
      [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
      ],
      [0, 0, 0, 1],
      [0.5, 0.5, 0.5, 0.5],
      0.5,
      1000
    );
    AndGate.initialize();
    AndGate.train();
    return (
      <Grid>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>A</th>
                  <th>B</th>
                  <th>Expected Output</th>
                  <th>FeedForward Output</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>{AndGate.forwardPass([0, 0])}</td>
                </tr>
                <tr>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                  <td>{AndGate.forwardPass([0, 1])}</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                  <td>{AndGate.forwardPass([1, 0])}</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>{AndGate.forwardPass([1, 1])}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default FeedForwardPage;
