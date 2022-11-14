import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { Admin, AdminBus } from '../../Models/index'

export default class BusBooking {
  public async index(ctx: HttpContextContract) {
    return AdminBus.find()
  }

  public async post({ request, response }: HttpContextContract) {
    try {
      const newBusSchema = schema.create({
        Number_Plate: schema.string({}, [rules.minLength(10), rules.maxLength(10)]),
        Bus_Type: schema.enum(['Slipper', 'AC', 'Non-AC']),
        Starting_At: schema.object().members({
          Address: schema.string(),
        }),
        Ending_At: schema.object().members({
          Address: schema.string(),
          Date: schema.date(),
        }),
      })
      const payload = await request.validate({ schema: newBusSchema })
      // const user = await AdminBus.create(payload)
      const data = request.body()
      const { AdminId, Number_Plate, Bus_Type, Starting_At, Ending_At } = data
      const adminid = await Admin.findById(AdminId)
      if (!adminid) {
        return response.status(404).send('adminid not found!!')
      }
      const user = await AdminBus.create(payload)
      response.status(201).send({adminId: adminid.id, user})
    } catch (error) {
      return response.status(500).send(error)
      // console.log(error)
    }
  }

  public async get({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const bus = await AdminBus.findById(id)
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
      const bus = await AdminBus.findByIdAndUpdate(id, { $set: data }, { new: true })
      return response.status(200).send(bus)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async remove({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const bus = await AdminBus.findByIdAndRemove(id)
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
      const bus = await AdminBus.find()
      return response.status(200).send(bus)
    } catch (error) {
      return response.status(500).send(error)
    }
  }
}
