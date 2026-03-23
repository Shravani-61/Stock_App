const mongoose = require('mongoose');

const TrackedStockSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    buyPrice: { type: Number, required: true },
    buyDate: { type: Date, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const PaperHoldingSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    avgPrice: { type: Number, required: true },
  },
  { _id: false }
);

const PaperTradeSchema = new mongoose.Schema(
  {
    side: { type: String, enum: ['BUY', 'SELL'], required: true },
    symbol: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, index: true, unique: true, required: true },
    email: { type: String, index: true },
    name: { type: String },
    picture: { type: String },
    trackedStocks: { type: [TrackedStockSchema], default: [] },
    paper: {
      balance: { type: Number, default: 100000 },
      holdings: { type: [PaperHoldingSchema], default: [] },
      history: { type: [PaperTradeSchema], default: [] },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
