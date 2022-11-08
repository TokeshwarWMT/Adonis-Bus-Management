import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import BusBook from 'App/Models/busBook'
import User from 'App/Models/user'
import AdminBus from 'App/Models/adminBus'

export default class PetsController {
  public async index(ctx: HttpContextContract) {
    return BusBook.find()
  }

  public async book({ request, response }: HttpContextContract) {
    try {
      const data = request.body()
      const { UserId, BusId, Starting_At, Ending_At, Bus_Type } = data
      const { userId } = request.body()
      const { busId } = request.body()
      const user = await User.findById(userId)
      if (!user) {
        return response.status(404).send('user does not exists!!')
      }
      const bus = await BusBook.findById(busId)
      if (!bus) {
        return response.status(404).send('bus not found!!')
      }
      let Price = 0
      if (Bus_Type === 'Slipper') {
        Price = 500
      } else if (Bus_Type === 'AC') {
        Price = 1000
      } else if (Bus_Type === 'Non-AC') {
        Price = 500
      } else {
        return response.status(400).send('invalid request!!')
      }
      const busBook = await BusBook.create(data)
      return response.status(201).send({ busBook, Price })
      //   return response.status(201).send({ Price })
    } catch (error) {
      return response.status(500).send(error)
    }
  }
}
