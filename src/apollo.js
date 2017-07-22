import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { AsyncStorage } from 'react-native'

export const auth0_client_id = '{__AUTH0_CLIENT_ID__}'
export const authorize_url = 'https://{__AUTH0_DOMAIN__}/authorize'

export let redirect_uri
if (Expo.Constants.manifest.xde) {
  redirect_uri = '{__EXPONENT_URL_WITHOUT_PORT__}/+/redirect'
} else {
  redirect_uri = `${Expo.Constants.linkingUri}/redirect`
}

const networkInterface = createNetworkInterface({
  uri: '{__SIMPLE_API_ENDPOINT__}'
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) req.options.headers = {}
    AsyncStorage.getItem('token')
      .then(encodedToken => {
        req.options.headers['authorization'] = `Bearer ${encodedToken}`
        next()
      })
      .catch(error => {
        console.error('ERROR: ', error)
        next()
      })
  }
}])

export const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
})
