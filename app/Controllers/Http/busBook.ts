import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

import { User, AdminBus, BusBook, Route } from '../../Models/index'

export default class BusBooking {
  public async index(ctx: HttpContextContract) {
    return BusBook.find()
  }

  public async book({ request, response }: HttpContextContract) {
    try {
      const newBusBookSchema = schema.create({
        Bus_Type: schema.enum(['Slipper', 'AC', 'Non-AC']),
        Seat_Number: schema.number(),
      })
      const payload = await request.validate({ schema: newBusBookSchema })
      const data = request.body()
      const { UserId, BusId, RouteId, Seat_Number, Bus_Type } = data
      const user = await User.findById(UserId)
      if (!user) {
        return response.status(404).send('user does not exists!!')
      }
      const bus = await AdminBus.findById(BusId)
      if (!bus) {
        return response.status(404).send('bus not found!!')
      }
      const route = await Route.findById(RouteId)
      if (!route) {
        return response.status(404).send('route not found')
      }
      const seat_number = await BusBook.findOne({ Seat_Number })
      if (seat_number) {
        return response.status(400).send('this seat is already booked by someone!!')
      }
      let Price = 0
      if (Bus_Type === 'Slipper') {
        Price = 500
      } else if (Bus_Type === 'AC') {
        Price = 1000
      } else if (Bus_Type === 'Non-AC') {
        Price = 700
      } else {
        return response.status(400).send('invalid request!!')
      }
      data.Price = Price
      const busBook = await BusBook.create(payload)
      return response.status(201).send({ UserId: user.id, BusId: bus.id, route: route.id, busBook })
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async get({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const busBook = await BusBook.findById(id).populate([
        { path: 'RouteId', select: '_id Starting_At Ending_At routes' },
      ])
      if (!busBook) {
        return response.status(404).send('booking is not available!!')
      }
      return response.status(200).send(busBook)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async findAllBookings({ request, response }: HttpContextContract) {
    try {
      const busBook = await BusBook.find().sort('Bus_Type')
      return response.status(200).send(busBook)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const data = request.body()
      const { UserId, BusId, RouteId, Seat_Number, Bus_Type } = data
      const user = await User.findById(UserId)
      if (!user) {
        return response.status(404).send('user does not exists!!')
      }
      const bus = await AdminBus.findById(BusId)
      if (!bus) {
        return response.status(404).send('bus not found!!')
      }
      const seat_number = await BusBook.findOne({ Seat_Number })
      if (seat_number) {
        return response.status(400).send('this seat is already booked by someone!!')
      }
      let Price = 0
      if (Bus_Type === 'Slipper') {
        Price = 500
      } else if (Bus_Type === 'AC') {
        Price = 1000
      } else if (Bus_Type === 'Non-AC') {
        Price = 700
      } else {
        return response.status(400).send('invalid request!!')
      }
      data.Price = Price
      const busBook = await BusBook.findByIdAndUpdate(id, { $set: data }, { new: true })
      return response.status(201).send(busBook)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async delete({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const busBook = await BusBook.findByIdAndRemove(id)
      if (!busBook) {
        return response.status(400).send('booking is already deleted!!')
      }
      return response.status(200).send('successfully deleted!!')
    } catch (error) {
      return response.status(500).send(error)
    }
  }
}
