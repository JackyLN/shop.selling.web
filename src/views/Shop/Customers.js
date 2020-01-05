import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';


function CustomerRow(props) {
  const customer = props.customer;
  const customerLink = `/shop/customers/${customer._id}`;
  const index = props.index + 1;
  
  const registeredDate = customer.created;
  const getBadge = (status) => {
    // return status === 'Active' ? 'success' :
    //   status === 'Inactive' ? 'secondary' :
    //     status === 'Pending' ? 'warning' :
    //       status === 'Banned' ? 'danger' :
    //         'primary'

    var num = Math.floor((Math.random() * 4) + 1);
    return num === 1 ? ['success','High order'] :
      num === 2 ? ['secondary', 'Regular order'] :
        num === 3 ? ['warning', 'Seldom order'] :
          ['danger', 'No order']
  }

  const status = getBadge(customer.status);

  return (
    <tr key={index}>
      <th scope="row"><Link to={customerLink}>{index}</Link></th>
      <td><Link to={customerLink}>{customer.firstname} {customer.lastname}</Link></td>
      <td>{customer.phone}</td>
      <td>{registeredDate}</td>
      <td><Link to={customerLink}><Badge color={status[0]}>{status[1]}</Badge></Link></td>
    </tr>
  )
}

class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerList: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/customer')
      .then(response => response.json())
      .then(data => {
        if(data.length != 0){
          this.setState({
            customerList: data
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });;
  }

  render() {

    const customerList = this.state.customerList;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">name</th>
                      <th scope="col">phone</th>
                      <th scope="col">registered</th>
                      <th scope="col">order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerList.map((customer, index) =>
                      <CustomerRow key={customer._id} index={index} customer={customer}/>
                    )}
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

export default Customers;