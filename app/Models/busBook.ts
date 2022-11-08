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
  Starting_At: String,
  Ending_At: String,
  Bus_Type: {
    type: String,
    enum: ['Slipper', 'AC', 'Non-AC'],
  },
//   Price: Number,
})

const busBook = mongoose.model('busBook', busBookSchema)
export default busBook
