import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, CardFooter, Button, Col, Row, Table, CardImg, FormGroup, Label, Input, Form, FormText } from 'reactstrap';
import { AppSwitch } from '@coreui/react'


function CalculatePriceAfter(price, discount) {
  if(parseFloat(discount) == 0) {
    return price;
  } else {
    var priceafter = parseFloat(price) - (parseFloat(price) / parseFloat(discount));

    return priceafter;
  }
}


class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: '',
      productname: '',
      productselling: false,
      productstock: '',
      productprice: '',
      productdiscount: '',
      productdescription: '',
      productimageurl: '',
      productpriceafter: '',
    }
  }

  componentDidMount() {
    let url = `http://localhost:3000/product/${this.props.match.params.id}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if(data.length != 0){
          this.setState({
            product: data,
            productname: data.name,
            productselling: data.selling,
            productstock: data.stock,
            productprice: data.price.$numberDecimal,
            productdiscount: data.discount,
            productdescription: data.description,
            productimageurl: data.imageurl,
            productpriceafter: CalculatePriceAfter(data.price.$numberDecimal, data.discount)
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });;
  }
  
  handleInputChange = (event) => {
    
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    // if (name == 'productdiscount') {
    //   console.log({
    //     "price": this.state.productprice,
    //     "discount": this.state.productdiscount
    //   });
    //   this.setState({
    //     productpriceafter: CalculatePriceAfter(this.state.productprice, this.state.productdiscount)
    //   });
    // }
  }

  render() { 
    
    //var productpriceafter = CalculatePriceAfter(this.state.productprice, this.state.discount);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={3}>
            <Card>
              <CardImg src={this.state.productimageurl}></CardImg>
            </Card>
          </Col>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Product: {this.state.productname}</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Product Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">{this.state.productname}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="productselling">On Sale</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <AppSwitch id="productselling" name="productselling" label color={'info'} checked={this.state.productselling} size={'sm'}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="productstock">Stock</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="productstock" name="productstock" value={this.state.productstock} onChange={this.handleInputChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="productprice">Price</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="productprice" name="productprice" value={this.state.productprice} onChange={this.handleInputChange} />
                      <FormText className="help-block">Be caution when changing produce price</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="productdiscount">Discount</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input disabled type="text" id="productdiscount" name="productdiscount" value={this.state.productdiscount} onChange={this.handleInputChange} />
                      <FormText className="help-block">Discount % for the product</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Price after discount</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">{this.state.productpriceafter}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="productdescription">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="productdescription" id="productdescription" rows="9" value={this.state.productdescription} onChange={this.handleInputChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="productimageurl">Image URL</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="productimageurl" name="productimageurl" value={this.state.productimageurl} onChange={this.handleInputChange}/>
                      <FormText className="help-block">Cloudinary url</FormText>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Product