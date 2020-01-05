const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')


// Getting all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

//Getting one order
router.get('/:id', getOrder, (req, res) => {
  res.json(res.order)
})

// Creating one order
router.post('/', async (req, res) => {
  const order = new Order({
    // name: req.body.name,
    // description: req.body.description,
    // stock: req.body.stock,
    // imageurl: req.body.imageurl,
    // price: req.body.price
  })

  try {
    const newOrder = await order.save()
    res.status(201).json(newOrder)
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
})

// Updating one order
router.patch('/:id', getOrder, async (req, res) => {
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
    const updatedOrder = await res.order.save()
    res.json(updatedOrder)
  } catch {
    res.status(400).json({
      message: err.message
    })
  }
})

// Deleting one order
router.delete('/:id', getOrder, async (req, res) => {
  try {
    await res.order.remove()
    res.json({
      message: 'Deleted This Order'
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

async function getOrder(req, res, next) {
  try {
    order = await Order.findById(req.params.id)
    if (order == null) {
      return res.status(404).json({
        message: 'Cant find Order'
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }

  res.order = order
  next()
}


module.exports = router;