import mongoose, { ObjectId } from 'mongoose'

export interface IAdmin {
  Name?: string
  Mobile?: number
  Email?: string
  Password?: string
  Address?: string
  is_Admin?: boolean
}

export interface IUser {
  Name?: string
  Mobile?: number
  Email?: string
  Password?: string
  Address?: string
}

export interface IAdminBus {
  AdminId: ObjectId
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
  is_Admin: boolean
}

export interface IBusBook {
  UserId: ObjectId
  BusId: ObjectId
  Starting_At: string
  Ending_At: string
  Bus_Type: string
  // Price: number
}
