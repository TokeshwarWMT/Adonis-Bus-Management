import mongoose from 'mongoose'
import { IBus } from 'App/interfaces/schemainterfaces'

const busSchema = new mongoose.Schema<IBus>({
  UserId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  Number_Plate: String,
  Bus_Type: {
    type: String,
    enum: ['Slipper', 'AC', 'Non-AC'],
  },
  Starting_At: {
    Address: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      default: Date.now(),
    },
  },
  Ending_At: {
    Address: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
  },
  //   is_Admin: {
  //     type: Boolean,
  //     required: true,
  //   },
})

const Bus = mongoose.model('Bus', busSchema)
export default Bus
