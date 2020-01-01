const express = require('express')
const router = express.Router()
const Product = require('../models/Products')


// Getting all subscribers
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting one subscriber
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product)
})

// Creating one subscriber
router.post('/', async (req, res) => {
  const product = new Product({
    //name: req.body.name,
    //description: req.body.description
    name: 'Default Product 2',
    description: 'Default description - no id'
  })

  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating one subscriber
router.patch('/:id', (req, res) => {
})

// Deleting one subscriber
router.delete('/:id', (req, res) => {
})


async function getProduct(req, res, next) {
  try {
    product = await Product.findById(req.params.id)
    if (product == null) {
      return res.status(404).json({ message: 'Cant find product'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.product = product
  next()
}


module.exports = router;

