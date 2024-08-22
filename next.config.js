/** @type {import('next').NextConfig} */
// require('dotenv').config()
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: false,
  },
  images:{
    domains:['i.dummyjson.com',"fakestoreapi.com","res.cloudinary.com","cdn.dummyjson.com"]
  },
  env:{ 
    API_URL:process.env.API_URL,
    NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
    CLOUD_NAME:process.env.CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECERT_KEY:process.env.CLOUDINARY_SECERT_KEY,
    STRIPE_PUPLISHKEY:process.env.STRIPE_PUPLISHKEY,
    STRIPE_SECERETKEY:process.env.STRIPE_SECERETKEY,
    WEBHOOKS_SECERATKEY:process.env.WEBHOOKS_SECERATKEY,
    WEBHOOKS_SECERATKEY_PRODUCTION:process.env.WEBHOOKS_SECERATKEY_PRODUCTION,
    UPLOAD_PREST:process.env.UPLOAD_PREST,
    NODEMAILER_SECREAT_KEY:process.env.NODEMAILER_SECREAT_KEY,
    NODEMAILER_EMAIL:process.env.NODEMAILER_EMAIL,
    RESET_SECREAT:process.env.RESET_SECREAT,
    MONGO_URL2:process.env.MONGO_URL2
  },  
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: "*" },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, OPTIONS, PATCH, DELETE, POST, PUT',
          }, 
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization',
          }
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['cloudinary'] = 'cloudinary/lib-es5/cloudinary.js';
    }
    return config;
  },

}

module.exports = nextConfig
