import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import * as api from '../Axios/CustomerAxios';
import swal from "sweetalert2";

class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: ''
    }

    this.processCustomer = this.processCustomer.bind(this);
  }

  componentDidMount() {
    api.get_customer(this.props.match.params.id, this.processCustomer, this.showAlertDetail);
  }

  processCustomer(response) {
    if(response.length != 0){
      this.setState({
        customer: response
      });
    }
  }

  showAlertDetail() {
    swal.fire('Something went wrong!', 'Error loading Customer', 'error');
  }

  render() {

    const customer = this.state.customer;

    const customerDetails = customer ? Object.entries(customer) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]

    return(
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Customer: {customer.firstname} {customer.lastname}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {
                        customerDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Customer;
