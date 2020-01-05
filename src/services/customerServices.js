const express = require('express')
const router = express.Router()
const Customer = require('../models/Customers')


// Getting all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find()
    res.json(customers)
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

//Getting one customer
router.get('/:id', getCustomer, (req, res) => {
  res.json(res.customer)
})

// Creating one customer
router.post('/', async (req, res) => {
  const customer = new Customer({
    // name: req.body.name,
    // description: req.body.description,
    // stock: req.body.stock,
    // imageurl: req.body.imageurl,
    // price: req.body.price
  })

  try {
    const newCustomer = await customer.save()
    res.status(201).json(newCustomer)
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
})

// Updating one customer
router.patch('/:id', getCustomer, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name
  }
  if (req.body.description != null) {
    res.product.description = req.body.description
  }
  if (req.body.stock != null) {
    res.product.stock = req.body.stock
  }
  if (req.body.imageurl != null) {
    res.product.imageurl = req.body.imageurl
  }
  if (req.body.price != null) {
    res.product.price = req.body.price
  }
  res.product.updated = Date.now();

  try {
    const updatedCustomer = await res.customer.save()
    res.json(updatedCustomer)
  } catch {
    res.status(400).json({
      message: err.message
    })
  }
})

// Deleting one customer
router.delete('/:id', getCustomer, async (req, res) => {
  try {
    await res.customer.remove()
    res.json({
      message: 'Deleted This Customer'
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

async function getCustomer(req, res, next) {
  try {
    customer = await Customer.findById(req.params.id)
    if (customer == null) {
      return res.status(404).json({
        message: 'Cant find Customer'
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }

  res.customer = customer
  next()
}


module.exports = router;