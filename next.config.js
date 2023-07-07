/** @type {import('next').NextConfig} */
// require('dotenv').config()
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains:['i.dummyjson.com',"fakestoreapi.com"]
  },
  env:{
    API_URL:process.env.API_URL
  },

}

module.exports = nextConfig
