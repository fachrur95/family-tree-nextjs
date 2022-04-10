/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiAddress: "http://127.0.0.1:8080/",
  },
  api: {
    bodyParser: true,
  },
};

module.exports = nextConfig;
