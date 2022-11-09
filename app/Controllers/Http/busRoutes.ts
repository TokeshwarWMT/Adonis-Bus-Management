import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminBus from 'App/Models/adminBus'
import Routes from 'App/Models/busRoutes'

export default class PetsController {
  public async index(ctx: HttpContextContract) {
    return Routes.find()
  }

  public async create({ request, response, params }: HttpContextContract) {
    try {
      const data = request.body()
      const { BusId, routes } = data;
      const bus = await AdminBus.findById(BusId)
      if (!bus) {
        return response.status(404).send('bus not found!!')
      }
      const route = await Routes.create(data)
      return response.status(201).send(route)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async get({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const route = await Routes.findById(id)
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
      const route = await Routes.find()
      return response.status(200).send(route)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const data = request.body()
      const { BusId, routes } = data
      const bus = await AdminBus.findById(BusId)
      if (!bus) {
        return response.status(404).send('bus not found!!')
      }
      const route = await Routes.findByIdAndUpdate(id, { $set: data }, { new: true })
      return response.status(201).send(route)
    } catch (error) {
      return response.status(200).send(error)
    }
  }

  public async delete({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const route = await Routes.findByIdAndRemove(id)
      if (!route) {
        return response.status(404).send('route is already deleted!!')
      }
      return response.status(200).send('successfully deleted route!!')
    } catch (error) {
      return response.status(500).send(error)
    }
  }
}
