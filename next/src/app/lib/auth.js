import { SignJWT, jwtVerify } from 'jose'

const SECRET_KEY = 'Deekshith'

export const SignToken = async (user) => {
  return await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpiration('1h')
    .sign(SECRET_KEY)
}

export const VerifyToken = async (token) => {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY)
        return payload
    } catch (error) {
        console.error('Token verification failed:', error)
        return null;
    }
}
