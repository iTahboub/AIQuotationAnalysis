import { Schema } from 'mongoose';

const memberClassSchema = new Schema({
    className: {
        type: String,
        required: true
    },
    memberCount: {
    type: Number,
    required: true,
    min: 0
  },
  pricePerMember: {
    type: Number,
    required: true,
    min: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'SAR'
  }
});