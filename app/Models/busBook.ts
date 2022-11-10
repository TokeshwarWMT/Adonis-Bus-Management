import mongoose from 'mongoose'
import { IBusBook } from 'App/interfaces/schemainterfaces'

const busBookSchema = new mongoose.Schema<IBusBook>({
  UserId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  BusId: {
    type: mongoose.Types.ObjectId,
    ref: 'Bus',
  },
  RouteId: {
    type: mongoose.Types.ObjectId,
    ref: 'BusRoute',
  },
  Bus_Type: {
    type: String,
    enum: ['Slipper', 'AC', 'Non-AC'],
  },
  Seat_Number: {
    type: Number,
    min: 1,
    max: 50,
  },
  Price: Number,
})

export default busBookSchema
