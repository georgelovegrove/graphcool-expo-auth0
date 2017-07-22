import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { AsyncStorage } from 'react-native'

import { AUTH0_CLIENT, AUTH0_DOMAIN, EXPO_URL, API_ENDPOINT } from 'react-native-dotenv'

export const auth0_client_id = AUTH0_CLIENT
export const authorize_url = `https://${AUTH0_DOMAIN}/authorize`

export const redirect_uri = Expo.Constants.manifest.xde
  ? `${EXPO_URL}/+/redirect`
  : `${Expo.Constants.linkingUri}/redirect`

const networkInterface = createNetworkInterface({ uri: API_ENDPOINT })

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
