require('dotenv').config()
import mongoose from 'mongoose'
import Route from '@ioc:Adonis/Core/Route'

const DB_URL = process.env.DB_URL as string

mongoose
  .connect(DB_URL)
  .then(() => console.log('MongoDB connection successful!!'))
  .catch((e) => console.log(e))

Route.get('/user/:id', 'userController.show')
Route.post('/user', 'userController.store')
Route.put('/user/:id', 'userController.update')
Route.delete('/user/:id', 'userController.delete')

Route.post('/bus', 'busController.post')
Route.get('/bus/:id', 'busController.get')
Route.put('/bus/:id', 'busController.put')
Route.delete('/bus/:id', 'busController.delete')
