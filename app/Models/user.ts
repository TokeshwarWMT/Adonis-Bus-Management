import mongoose from 'mongoose'
import { IUser } from 'App/interfaces/schemainterfaces'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema<IUser>({
  profileImage: Object,
  Name: String,
  Mobile: Number,
  Email: String,
  Password: String,
  Address: String,
})

userSchema.pre('save', async function (next) {
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

export default userSchema
