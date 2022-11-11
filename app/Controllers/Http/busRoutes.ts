import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import AdminBus from 'App/Models/adminBus'
// import Routes from 'App/Models/busRoute'

import { AdminBus, Route } from '../../Models/index'

export default class PetsController {
  public async index(ctx: HttpContextContract) {
    return Route.find()
  }

  public async create({ request, response, params }: HttpContextContract) {
    try {
      const data = request.body()
      const { BusId, Starting_At, Ending_At, routes } = data
      const bus = await AdminBus.findById(BusId)
      if (!bus) {
        return response.status(404).send('bus not found!!')
      }
      const starting_at = await AdminBus.findOne({ Starting_At })
      if (!starting_at) {
        return response.status(404).send('starting place not found!!')
      }
      const ending_at = await AdminBus.findOne({ Ending_At })
      if (!ending_at) {
        return response.status(404).send('ending place not found!!')
      }
      const route = await Route.create(data)
      return response.status(201).send(route)
    } catch (error) {
      return response.status(500).send(error)
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
