import React, { Component } from 'react';
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class Cards extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Card with switch
                <div className="card-header-actions">
                  <AppSwitch className={'float-right mb-0'} label color={'info'} defaultChecked size={'sm'}/>
                </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Card with switch
                <div className="card-header-actions">
                  <AppSwitch className={'float-right mb-0'} label color={'info'} defaultChecked size={'sm'}/>
                </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Card with switch
                <div className="card-header-actions">
                  <AppSwitch className={'float-right mb-0'} label color={'info'} defaultChecked size={'sm'}/>
                </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Card with switch
                <div className="card-header-actions">
                  <AppSwitch className={'float-right mb-0'} label color={'info'} defaultChecked size={'sm'}/>
                </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Card with switch
                <div className="card-header-actions">
                  <AppSwitch className={'float-right mb-0'} label color={'info'} defaultChecked size={'sm'}/>
                </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Card with switch
                <div className="card-header-actions">
                  <AppSwitch className={'float-right mb-0'} label color={'info'} defaultChecked size={'sm'}/>
                </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Card with switch
                <div className="card-header-actions">
                  <AppSwitch className={'float-right mb-0'} label color={'info'} defaultChecked size={'sm'}/>
                </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Card with switch
                <div className="card-header-actions">
                  <AppSwitch className={'float-right mb-0'} label color={'info'} defaultChecked size={'sm'}/>
                </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Card with switch
                <div className="card-header-actions">
                  <AppSwitch className={'float-right mb-0'} label color={'info'} defaultChecked size={'sm'}/>
                </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Card with switch
                <div className="card-header-actions">
                  <AppSwitch className={'float-right mb-0'} label color={'info'} defaultChecked size={'sm'}/>
                </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Card with switch
                <div className="card-header-actions">
                  <AppSwitch className={'float-right mb-0'} label color={'info'} defaultChecked size={'sm'}/>
                </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card>
              <CardHeader>
                Card with switch
                <div className="card-header-actions">
                  <AppSwitch className={'float-right mb-0'} label color={'info'} defaultChecked size={'sm'}/>
                </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Cards;
