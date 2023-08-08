/** @type {import('next').NextConfig} */
// require('dotenv').config()
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  images:{
    domains:['i.dummyjson.com',"fakestoreapi.com","res.cloudinary.com"]
  },
  env:{ 
    API_URL:process.env.API_URL,
    NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
    CLOUD_NAME:process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECERT_KEY:process.env.CLOUDINARY_SECERT_KEY,
    STRIPE_PUPLISHKEY:process.env.STRIPE_PUPLISHKEY,
    STRIPE_SECERETKEY:process.env.STRIPE_SECERETKEY,
    WEBHOOKS_SECERATKEY:process.env.WEBHOOKS_SECERATKEY
  },  
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.API_URL },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, OPTIONS, PATCH, DELETE, POST, PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
          },
        ],
      },
    ];
  },


}

module.exports = nextConfig
