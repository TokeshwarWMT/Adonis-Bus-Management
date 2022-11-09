import mongoose from 'mongoose'

const routeSchema = new mongoose.Schema({
  BusId: {
    type: mongoose.Types.ObjectId,
    ref: 'Bus',
  },
  routes: ['String']
})

const Route = mongoose.model('Route', routeSchema)
export default Route;
