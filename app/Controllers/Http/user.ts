import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { User } from '../../Models/index'
const cloudinary = require('cloudinary').v2
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

cloudinary.config({
  cloud_name: 'dbv10f3bf',
  api_key: '474116116625175',
  api_secret: 'UU-WYsG12QFKvYzA7gVo_u6ZjbI',
  secure: true,
})

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

      let profilePic = request.file('profile_pic')
      console.log(profilePic)
      let cloudinaryMeta = await cloudinary.uploader.upload(profilePic?.tmpPath)
      profilePic = cloudinaryMeta.secure_url

      const checkMobile = await User.findOne({ Mobile: payload.Mobile })
      // if (checkMobile) {
      //   return response.status(400).send('mobile number is already registered!!')
      // }
      // const checkEmail = await User.findOne({ Email: payload.Email })
      // if (checkEmail) {
      //   return response.status(400).send('email is already registered!!')
      // }

      const user = await User.create({ ...payload, profileImage: profilePic })
      response.status(201).send(user)
    } catch (error) {
      return response.status(500).send(error)
    }
  }

  public async login({ request, response, params }: HttpContextContract) {
    try {
      let Email = request.body().Email
      let Pass = request.body().Password

      const user = await User.findOne({ email: Email })
      if (!user) {
        return response.status(400).send('email is incorrect!!')
      }
      const password = user?.Password as string
      const passMatch = await bcrypt.compare(Pass, password)

      if (passMatch) {
        const token = jwt.sign(
          {
            id: user?._id,
          },
          'webmob'
        )
        response.status(201).send({ status: true, data: token })
      } else {
        return response.status(400).send({ status: false, message: 'password is not correct..!!' })
      }
    } catch (error) {
      console.log(error)
      return response.status(500).send(error)
    }
  }

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
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { id } = params
      const data = request.body()

      let profilePic = request.file('profile_pic')
      console.log(profilePic)

      let cloudinaryMeta = await cloudinary.uploader.upload(profilePic?.tmpPath)
      profilePic = cloudinaryMeta.secure_url

      data.profile_pic = profilePic
      const user = await User.findByIdAndUpdate(id, { $set: data }, { new: true })
      return response.status(201).send({ data: user, msg: 'successfully updated data!!' })
    } catch (error) {
      return response.status(500).send(error)
    }
  }

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

  // public async findAllBus({ request, response }: HttpContextContract) {
  //   try {
  //     const bus = await Bus.find()
  //     return response.status(200).send(bus)
  //   } catch (error) {
  //     return response.status(500).send(error)
  //   }
  // }
}
