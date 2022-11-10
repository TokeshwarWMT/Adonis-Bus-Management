import AdminSchema from './admin'
import AdminBusSchema from './adminBus'
import BusBookSchema from './busBook'
import BusRouteSchema from './busRoute'
import UserSchema from './user'
import mongoose from 'mongoose'

const User = mongoose.model('User', UserSchema)
const Admin = mongoose.model('Admin', AdminSchema)
const AdminBus = mongoose.model('Bus', AdminBusSchema)
const BusBook = mongoose.model('BusBook', BusBookSchema)
const Route = mongoose.model('BusRoute', BusRouteSchema)

export { User, Admin, AdminBus, BusBook, Route }
