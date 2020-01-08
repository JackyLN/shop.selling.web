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
    <Col xl={4}>
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
      newproductname: '',
      newproductselling: false,
      newproductstock: '',
      newproductprice: '',
      newproductdiscount: 0,
      newproductdescription: '',
      newproductimageurl: '',
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

  handleInputChange = (event) => {
    
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
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
                      <Label htmlFor="newproductname">Product Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="newproductname" name="newproductname" value={this.state.newproductname} onChange={this.handleInputChange} />
                      <p className="form-control-static">{this.state.productname}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="newproductselling">On Sale</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <AppSwitch id="newproductselling" name="newproductselling" label color={'info'} checked={this.state.newproductselling} size={'sm'}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="newproductstock">Stock</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="newproductstock" name="newproductstock" value={this.state.newproductstock} onChange={this.handleInputChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="newproductprice">Price</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="newproductprice" name="newproductprice" value={this.state.newproductprice} onChange={this.handleInputChange} />
                      <FormText className="help-block">Be caution when changing produce price</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="newproductdiscount">Discount</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input disabled type="text" id="newproductdiscount" name="newproductdiscount" value={this.state.newproductdiscount} onChange={this.handleInputChange} />
                      <FormText className="help-block">Discount % for the product</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="newproductdescription">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="newproductdescription" id="newproductdescription" rows="9" value={this.state.newproductdescription} onChange={this.handleInputChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="newproductimageurl">Image URL</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="newproductimageurl" name="newproductimageurl" value={this.state.newproductimageurl} onChange={this.handleInputChange}/>
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