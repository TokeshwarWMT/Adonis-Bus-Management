import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { Admin } from '../../Models/index'
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'dbv10f3bf',
  api_key: '474116116625175',
  api_secret: 'UU-WYsG12QFKvYzA7gVo_u6ZjbI',
  secure: true,
})

export default class BusBooking {
  public async index(ctx: HttpContextContract) {
    return Admin.find()
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const newAdminSchema = schema.create({
        profile_pic: schema.file.optional({
          size: '10mb',
          extnames: ['jpg', 'png', 'jpeg'],
        }),
        Name: schema.string({ trim: true }),
        Mobile: schema.number(),
        Email: schema.string({ trim: true }, [rules.email()]),
        Password: schema.string({}, [rules.minLength(6), rules.confirmed('Confirm_Password')]),
        Confirm_Password: schema.string(),
        Address: schema.string({ trim: true }),
      })
      const payload = await request.validate({ schema: newAdminSchema })

      let profilePic = request.file('profile_pic')
      let cloudinaryMeta = await cloudinary.uploader.upload(profilePic?.tmpPath)
      profilePic = cloudinaryMeta.secure_url

      const checkMobile = await Admin.findOne({ Mobile: payload.Mobile })
      if (checkMobile) {
        return response.status(400).send('mobile number is already registered!!')
      }
      const checkEmail = await Admin.findOne({ Email: payload.Email })
      if (checkEmail) {
        return response.status(400).send('email is already registered!!')
      }

      const admin = await Admin.create({ ...payload, profileImage: profilePic })
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

      let profilePic

      try {
        profilePic = request.file('profile_pic')
        let cloudinaryMeta = await cloudinary.uploader.upload(profilePic?.tmpPath)
        profilePic = cloudinaryMeta.secure_url
      } catch (error) {}

      const admin = await Admin.findByIdAndUpdate(
        id,
        profilePic ? { ...data, profileImage: profilePic } : { ...data },
        { new: true }
      )
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
