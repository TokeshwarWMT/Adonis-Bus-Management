require('dotenv').config()
import mongoose from 'mongoose'
import Route from '@ioc:Adonis/Core/Route'

const DB_URL = process.env.DB_URL as string

mongoose
  .connect(DB_URL)
  .then(() => console.log('MongoDB connection successful!!'))
  .catch((e) => console.log(e))

Route.get('/admin/:id', 'admin.show')
Route.post('/admin', 'admin.store')
Route.put('/admin/:id', 'admin.update')
Route.delete('/admin/:id', 'admin.delete')

Route.post('/adminBus', 'adminBus.post')
Route.get('/adminBus/:id', 'adminBus.get')
Route.put('/adminBus/:id', 'adminBus.put')
Route.delete('/adminBus/:id', 'adminBus.remove')
Route.get('/adminBus', 'adminBus.findAllBus')

Route.post('/user', 'user.signup')
Route.get('/user/:id', 'user.get')
Route.put('/user/:id', 'user.update')
Route.delete('/user/:id', 'user.delete')
Route.get('/user', 'user.findAllBus')

Route.post('/busBook', 'busBook.book')
