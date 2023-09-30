export const ENVIROMENT = {
  /**
   * @info PORT
   */
  PORT: process.env.PORT ?? '4000',
  /**
   * @info TOKEN EXPERIKES
   * @info one token is valid for 1 day
   */
  TOKEN_EXPERIES: process.env?.EXPERIES_TOKEN ?? '1440'

}
