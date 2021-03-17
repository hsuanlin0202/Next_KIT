module.exports = {
  env: {
    MEMBER_OLD: process.env.MEMBER_OLD,
    API_GATEWAY: process.env.API_GATEWAY,
    COUPON_SERVICE: process.env.COUPON_SERVICE,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    BASE_URL_ONLY: process.env.BASE_URL_ONLY,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    BASE_URL_BOTH: process.env.BASE_URL_BOTH,
  },
};
