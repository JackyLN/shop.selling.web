import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Fade, Collapse, Badge, Button,
  Form, FormGroup, Label, FormText, Input,
  Card, CardBody, CardHeader, CardFooter, CardImg, CardTitle, CardText,
  Modal, ModalHeader, ModalBody, ModalFooter
 } from 'reactstrap';
import { AppSwitch } from '@coreui/react'


function ProductRow(props) {
  const product = props.product;
  const productLink = `/shop/products/${product._id}`;
  const index = props.index + 1;
  
  return (
    <Col xl={3}>
      <Card key={index}>
        <Link to={productLink}>
          <CardImg variant="top" src={product.imageurl} ></CardImg>
        </Link>
        <CardBody>
          <CardTitle className="h4">{product.name}</CardTitle>
          <CardText>{product.description}</CardText>
        </CardBody>
        <CardFooter>
          Stocks: <Badge color="success">{product.stock}</Badge>
          <div className="card-header-actions">
            <AppSwitch className={'float-right mb-0'} label color={'info'} checked={product.selling} size={'sm'}/>
          </div>
        </CardFooter>
      </Card>
    </Col>
  )
}


class Products extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      modal: false,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      productList: [],
      product: '',
      productname: '',
      productselling: false,
      productstock: '',
      productprice: '',
      productdiscount: '',
      productdescription: '',
      productimageurl: '',
      productpriceafter: ''
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  componentDidMount() {
    fetch('http://localhost:3000/product')
      .then(response => response.json())
      .then(data => {
        if(data.length != 0){
          this.setState({
            productList: data
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });;
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {

    const productList = this.state.productList;

    return (
      <div className="animated fadeIn">
        <Button onClick={this.toggle} color="primary" className={'float-right mb-0 mr-1'}>Add New Product</Button>
        <Row>
          {productList.map((product, index) =>
            <ProductRow key={product._id} index={index} product={product}/>
          )}
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className + ' modal-lg'}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          <Card>
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
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

      </div>
    )
  }
}

export default Products;