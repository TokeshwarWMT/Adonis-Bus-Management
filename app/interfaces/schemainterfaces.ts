import mongoose, { ObjectId } from 'mongoose'

export interface IUser {
  Name?: string
  Mobile?: number
  Email?: string
  Password?: string
  Address?: string
}

export interface IBus {
  UserId: ObjectId
  Number_Plate: string
  Bus_Type: string
  Starting_At: {
    Address: string
    Date: Date
  }
  Ending_At: {
    Address: string
    Date: Date
  }
  // is_Admin: boolean
}
