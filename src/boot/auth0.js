import { boot } from 'quasar/wrappers'
import { createAuth0 } from '@auth0/auth0-vue';

const auth0 = createAuth0({
  domain: 'dev-re5ucc1nn12lb5qo.us.auth0.com',
  clientId: '7PsLF1tiowoy50Ru4EW4EiWwk3uG6ylE',
  cacheLocation: 'localstorage',
  useRefreshTokens: true,
  authorizationParams: {
    audience: 'https://hello-world.example.com',
    redirect_uri: 'http://localhost:4000/callback'
  }
})

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app, router }) => {
  app.config.globalProperties.$router = router

  app.use(auth0)

  app.config.globalProperties.$auth0 = auth0
})

export { auth0 }
