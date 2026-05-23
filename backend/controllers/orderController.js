const Order = require("../models/Order");
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: "No order items" });
    return;
  } else {
    try {
      const normalizedItems = (req.body.orderItems || []).map((item) => ({
        name: item.name,
        qty: Number(item.qty) || 1,
        image: item.image || "",
        price: Number(item.price) || 0,
        product: String(item.product || item._id || item.id || ""),
      }));

      const order = await Order.create({
        user: req.user._id,
        orderItems: normalizedItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: Number(req.body.itemsPrice) || 0,
        taxPrice: Number(req.body.taxPrice) || 0,
        shippingPrice: Number(req.body.shippingPrice) || 0,
        totalPrice: Number(req.body.totalPrice) || 0,
      });

      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || "Delivered";
      if (order.status === "Delivered") {
        order.isPaid = true; // For simplicity in this non-stripe flow
        order.paidAt = Date.now();
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
};
