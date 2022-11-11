// import jwt from 'jsonwebtoken'
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// export async function authentication({ request, response }: HttpContextContract) {
//   try {
//     const token = request.headers['x-api-key']
//     if (!token) {
//       return response.status(400).send('Please input token!!')
//     }
//     const key = 'webmob'
//     const verifyUser = jwt.verify(token as string, key)
//     next()
//   } catch (e) {
//     if (e.message === 'invalid token') {
//       return response.status(498).send('invalid token!!')
//     } else {
//       return response.status(500).send(e)
//     }
//   }
// }

// function next() {
//   throw new Error('Function not implemented.')
// }
