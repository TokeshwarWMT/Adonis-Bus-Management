import mongoose from 'mongoose'
import { IAdmin } from 'App/interfaces/schemainterfaces'
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema<IAdmin>({
  profileImage: Object,
  Name: String,
  Mobile: Number,
  Email: String,
  Password: String,
  Address: String,
})

adminSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    if (this.Password) {
      const hashPassword = await bcrypt.hash(this.Password, salt)
      this.Password = hashPassword
    }
    next()
  } catch (error) {
    next(error)
  }
})

export default adminSchema
