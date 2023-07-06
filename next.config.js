/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  images:{
    domains:['i.dummyjson.com',"fakestoreapi.com"]
  },
  env:{
    API:process.env.API
  }
}

module.exports = nextConfig
