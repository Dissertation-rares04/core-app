import { boot } from "quasar/wrappers";
import { createAuth0 } from "@auth0/auth0-vue";

const auth0 = createAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENTID,
  cacheLocation: "localstorage",
  useRefreshTokens: true,
  authorizationParams: {
    audience: process.env.AUTH0_AUDIENCE,
    redirect_uri: process.env.AUTH0_REDIRECT_URI,
  },
});

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app, router }) => {
  app.config.globalProperties.$router = router;

  app.use(auth0);

  app.config.globalProperties.$auth0 = auth0;
});

export { auth0 };
