import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/user'
import Bus from 'App/Models/adminBus'

export default class PetsController {
  public async index(ctx: HttpContextContract) {
    return User.find()
  }

  public async signup({ request, response }: HttpContextContract) {
    try {
      const newUserSchema = schema.create({
        Name: schema.string({ trim: true }),
        Mobile: schema.number(),
        Email: schema.string({ trim: true }, [rules.email()]),
        Password: schema.string({}, [rules.minLength(6), rules.confirmed('Confirm_Password')]),
        Confirm_Password: schema.string(),
        Address: schema.string({ trim: true }),
      })
      const payload = await request.validate({ schema: newUserSchema })
      const user = await User.create(payload)
      response.status(201).send(user)
    } catch (error) {
      return response.status(500).send(error)
    }
  };

  public async get({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const user = await User.findById(id)
      if (!user) {
        return response.status(400).send('User does not exists!!')
      }
      return response.status(200).send({ data: user, msg: 'successfully fetched data!!' })
    } catch (error) {
      return response.status(500).send(error)
    }
  };

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const data = request.body()
      console.log(data)
      const user = await User.findByIdAndUpdate(id, { $set: data }, { new: true })
      return response.status(201).send({ data: user, msg: 'successfully updated data!!' })
    } catch (error) {
      return response.status(500).send(error)
    }
  };

  public async delete({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const user = await User.findByIdAndRemove(id)
      if (!user) {
        return response.status(400).send('user has been already deleted!!')
      }
      return response.status(200).send('user successfully deleted!!')
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


