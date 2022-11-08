import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Admin from 'App/Models/admin'

export default class PetsController {
  public async index(ctx: HttpContextContract) {
    return Admin.find()
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const newAdminSchema = schema.create({
        Name: schema.string({ trim: true }),
        Mobile: schema.number(),
        Email: schema.string({ trim: true }, [rules.email()]),
        Password: schema.string({}, [rules.minLength(6), rules.confirmed('Confirm_Password')]),
        Confirm_Password: schema.string(),
        Address: schema.string({ trim: true }),
      })
      const payload = await request.validate({ schema: newAdminSchema })
      const admin = await Admin.create(payload)
      response.status(201).send(admin)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async show({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const admin = await Admin.findById(id)
      if (!admin) {
        return response.status(400).send('Admin does not exists!!')
      }
      return response.status(200).send({ data: admin, msg: 'successfully fetched data!!' })
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const data = request.body()
      const admin = await Admin.findByIdAndUpdate(id, { $set: data }, { new: true })
      return response.status(201).send({ data: admin, msg: 'successfully updated data!!' })
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async delete({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const admin = await Admin.findByIdAndRemove(id)
      if (!admin) {
        return response.status(400).send('admin has been already deleted!!')
      }
      return response.status(200).send('admin successfully deleted!!')
    } catch (error) {
      return response.status(500).send(error)
    }
  }
}
