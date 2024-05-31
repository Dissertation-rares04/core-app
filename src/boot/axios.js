import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { auth0 } from './auth0'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API_URL })

api.interceptors.request.use(async (config) => {
  try {
    const accessToken = await auth0.getAccessTokenSilently();
    config.headers.Authorization = `Bearer ${accessToken}`;
  } catch (error) {
    // Handle token retrieval errors (e.g., token expired)
    console.error('Failed to retrieve access token:', error);
  }
  return config;
}, error => {
  // Handle request errors
  return Promise.reject(error);
});

export default boot(({ app }) => {
  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
