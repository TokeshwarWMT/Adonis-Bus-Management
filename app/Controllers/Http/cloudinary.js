import Env from 'Env';

module.exports = {
    name: Env.get('CLOUDINARY_NAME', ''),
    api_key: Env.get('CLOUDINARY_API_KEY', ''),
    api_secret: Env.get('CLOUDINARY_API_SECRET', ''),
    secure: Env.get('CLOUDINARY_SECURE')
}