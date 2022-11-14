import mongoose from 'mongoose'
import { IRoutes } from 'App/interfaces/schemainterfaces'

const routeSchema = new mongoose.Schema<IRoutes>({
  BusId: {
    type: mongoose.Types.ObjectId,
    ref: 'Bus',
  },
  Starting_At: Object,
  Ending_At: Object,
  routes: ['String'],
})

export default routeSchema
