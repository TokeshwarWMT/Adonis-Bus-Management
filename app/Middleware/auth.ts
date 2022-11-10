// import jwt from 'jsonwebtoken'
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { RequestCustom } from 'App/interfaces/schemainterfaces'
// // import { NextFunction, Response } from 'express'
// import { Request, Response, NextFunction } from 'express'
// // import {RequestCustom} from 'RequestCustom';

// export async function authentication(
//   request: RequestCustom,
//   response: Response,
//   next: NextFunction
// ) {
//   try {
//     const token = re.headers['x-api-key']
//     if (!token) {
//       return response.status(400).send('Please input token!!')
//     }
//     const key = 'webmob'
//     const verifyUser = jwt.verify(token as string, key)
//     let request = expressRequest as RequestCustom
//     request.user = verifyUser
//     next()
//   } catch (e) {
//     if (e.message === 'invalid token') {
//       return response.status(498).send('invalid token!!')
//     } else {
//       return response.status(500).send(e)
//     }
//   }
// }

// // function next() {
// //   throw new Error('Function not implemented.')
// // }
