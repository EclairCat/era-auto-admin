import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';


class Reglement extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Striped Table
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                <thead>
                  <tr>
                    <th>Paiement Number</th>
                    <th>Client</th>
                    <th>Date of paiement</th>
                    <th>Mode of paiement</th>
                    <th>Total</th>
                  </tr>
                  </thead>
                  <tbody>                  
                  <tr>
                    <td>1</td>
                    <td>Agapetus Tadeáš</td>
                    <td>2012/01/21</td>
                    <td>Credit Card</td>            
                    <td>340</td>                    
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Quintin Ed</td>
                    <td>2012/01/21</td>
                    <td>Cash</td>            
                    <td>50</td>                    
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Quintin Ed</td>
                    <td>2012/01/21</td>
                    <td>Credit Card</td>            
                    <td>498</td>                    
                  </tr>
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Reglement;
