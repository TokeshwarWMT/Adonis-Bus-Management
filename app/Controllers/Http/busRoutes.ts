import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { AdminBus, Route } from '../../Models/index'

export default class BusBooking {
  public async index(ctx: HttpContextContract) {
    return Route.find()
  }

  public async create({ request, response, params }: HttpContextContract) {
    try {
      const newRouteSchema = schema.create({
        Starting_At: schema.object().members({
          Address: schema.string(),
          Date: schema.date(),
        }),
        Ending_At: schema.object().members({
          Address: schema.string(),
          Date: schema.date(),
        }),
        routes: schema.array().members(schema.string()),
      })

      const payload: any = await request.validate({ schema: newRouteSchema })
      const data = request.body()
      const { BusId, Starting_At, Ending_At, routes } = data
      const bus = await AdminBus.findById(BusId)
      if (!bus) {
        return response.status(404).send('bus not found!!')
      }
      const starting_at = await AdminBus.findOne({
        address: payload.Starting_At.Address,
        date: payload.Starting_At.Date,
      })
      // console.log(starting_at)
      if (!starting_at) {
        return response.status(404).send('starting place not found!!')
      }
      const ending_at = await AdminBus.findOne({
        address: payload.Ending_At.Address,
        date: payload.Ending_At.Date,
      })
      // console.log(ending_at)
      if (!ending_at) {
        return response.status(404).send('ending place not found!!')
      }
      const route = await Route.create(payload)
      return response.status(201).send({ busId: bus.id, route })
    } catch (error) {
      return response.status(500).send(error)
      // console.log(error);
    }
  }

  public async get({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const route = await Route.findById(id)
      if (!route) {
        return response.status(404).send('route does not found!!')
      }
      return response.status(200).send(route)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async findAllRoutes({ request, response }: HttpContextContract) {
    try {
      const route = await Route.find()
      return response.status(200).send(route)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const data = request.body()
      const { BusId, Starting_At, Ending_At, routes } = data
      const bus = await AdminBus.findById(BusId)
      if (!bus) {
        return response.status(404).send('bus not found!!')
      }
      const route = await Route.findByIdAndUpdate(id, { $set: data }, { new: true })
      return response.status(201).send(route)
    } catch (error) {
      return response.status(200).send(error)
    }
  }

  public async delete({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const route = await Route.findByIdAndRemove(id)
      if (!route) {
        return response.status(404).send('route is already deleted!!')
      }
      return response.status(200).send('successfully deleted route!!')
    } catch (error) {
      return response.status(500).send(error)
    }
  }
}
