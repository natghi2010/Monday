export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongo_uri: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET,
  monday_api_key: process.env.MONDAY_API_KEY,
});
