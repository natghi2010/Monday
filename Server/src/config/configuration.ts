export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongo_uri: process.env.MONGO_URI,
});
