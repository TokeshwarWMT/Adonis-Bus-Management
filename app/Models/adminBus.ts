import mongoose from 'mongoose'
import { IAdminBus } from 'App/interfaces/schemainterfaces'

const AdminBusSchema = new mongoose.Schema<IAdminBus>({
  AdminId: {
    type: mongoose.Types.ObjectId,
    ref: 'Admin',
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
      default: new Date(),
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
})
export default AdminBusSchema
