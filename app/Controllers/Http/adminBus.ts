import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Bus from 'App/Models/adminBus'

export default class PetsController {
  public async index(ctx: HttpContextContract) {
    return Bus.find()
  }

  public async post({ request, response }: HttpContextContract) {
    try {
      //   const newBusSchema = schema.create({
      //     UserId: schema.string({}, [rules.minLength(24), rules.maxLength(24)]),
      //     Number_Plate: schema.string({}, [rules.minLength(10), rules.maxLength(10)]),
      //     // Bus_Type: schema.string({}, [rules.exists('Slipper', 'AC', 'Non-AC')]),
      //     Bus_Type: schema.enum(['Slipper', 'AC', 'Non-AC']),
      //     // 'Starting_At.Address': schema.string(),
      //     // 'Ending_At.Address': schema.string(),
      //     // is_Admin: schema.boolean()
      //   })
      //   const payload = await request.validate({ schema: newBusSchema })
      //   const user = await Bus.create(payload)
      //   console.log(user)
      const data = request.body()
      const user = await Bus.create(data)
      response.status(201).send(user)
    } catch (error) {
      console.log(error.messages)
    }
  }

  public async get({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const bus = await Bus.findById(id)
      if (!bus) {
        return response.status(404).send('Bus not found!!')
      }
      return response.status(200).send(bus)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async put({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const data = request.body()
      const bus = await Bus.findByIdAndUpdate(id, { $set: data }, { new: true })
      return response.status(200).send(bus)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async remove({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const bus = await Bus.findByIdAndRemove(id)
      if (!bus) {
        return response.status(400).send('bus is already deleted!!')
      }
      return response.status(200).send('successfully deleted data!!')
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async findAllBus({ request, response }: HttpContextContract) {
    try {
      const bus = await Bus.find()
      return response.status(200).send(bus)
    } catch (error) {
      return response.status(500).send(error)
    }
  }
}
