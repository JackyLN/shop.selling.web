const express = require('express')
const router = express.Router()
const Product = require('../models/Products')


// Getting all sproducts
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting one product
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product)
})

// Creating one product
router.post('/', async (req, res) => {
  console.log(req.body);
  const product = new Product({
    name: req.body.name,
    description: req.body.description
    //name: 'Default Product 2',
    //description: 'Default description - no id'
  })

  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating one product
router.patch('/:id', getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name
  }

  if (req.body.description != null) {
    res.product.description = req.body.description
  }
  try {
    const updatedProduct = await res.product.save()
    res.json(updatedProduct)
  } catch {
    res.status(400).json({ message: err.message })
  }

})

// Deleting one product
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove()
    res.json({ message: 'Deleted This Product' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
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

