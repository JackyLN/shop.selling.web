import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: ''
    }
  }

  componentDidMount() {
    let url = `http://localhost:3000/customer/${this.props.match.params.id}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if(data.length != 0){
          this.setState({
            customer: data
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });;
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
