import React, { Component } from 'react'
import { graphql, gql, compose } from 'react-apollo'
import { Text, View, StyleSheet, Button, Linking, AsyncStorage } from 'react-native'
import Expo from 'expo'
import jwtDecoder from 'jwt-decode'

import { redirect_uri, auth0_client_id, authorize_url, client } from '../apollo'

export const logout = async () => {
  await AsyncStorage.removeItem('token')
  client.resetStore()
}

const toQueryString = params => {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

export const currentUserQuery = gql`
  query currentUser {
    user {
      id
      name
    }
  }
`

export const createUserMutation = gql`
  mutation createUser($encodedToken: String!, $username: String!) {
    createUser(authProvider: { auth0: { idToken: $encodedToken } } name: $username) {
      id
      name
    }
  }
`

class Auth extends Component {

  componentDidMount() {
    // handle redirects after auth0 authentication
    Linking.addEventListener('url', this.handleAuth0Redirect)
    Linking.getInitialURL().then(url => this.handleAuth0RedirectUrl(url))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>You can login</Text>
        <Button
          onPress={this.loginWithAuth0}
          title='login'
        />
      </View>
    )
  }

  loginWithAuth0 = async () => {
    const redirectionURL = authorize_url + toQueryString({
        client_id: auth0_client_id,
        response_type: 'token',
        scope: 'openid name',
        connection: 'facebook',
        redirect_uri,
        state: redirect_uri,
      })
    Expo.WebBrowser.openBrowserAsync(redirectionURL)
  }

  handleAuth0Redirect = async (event) => {
    if (!event.url.includes('+/redirect')) return
    Expo.WebBrowser.dismissBrowser();
    this.handleAuth0RedirectUrl(event.url)
  }

  handleAuth0RedirectUrl = async (url) => {
    if (!url.includes('+/redirect')) return
    const [, queryString] = url.split('#')
    const responseObj = queryString.split('&').reduce((map, pair) => {
      const [key, value] = pair.split('=')
      map[key] = value // eslint-disable-line
      return map
    }, {})
    const encodedToken = responseObj.id_token
    const decodedToken = jwtDecoder(encodedToken)
    const username = decodedToken.name

    AsyncStorage.setItem('token', encodedToken)
      .then(() => {
        this.props.fetchCurrentUser.refetch()
          .then(result => {
            if (!result.data.user) {
              this.props.createUser({ variables: { encodedToken, username } })
                .catch(error => {
                  console.error('ERROR: could not create user: ', error)
                })
            }
          })
          .catch(error => {
            console.error('ERROR: failed asking for current user: ', error)
          })
      })
      .catch(error => {
        console.error('ERROR: could not store token in AsyncStorage')
      }
    )
  }
}

export default compose(
  graphql(createUserMutation, { name: 'createUser' }),
  graphql(currentUserQuery, { name: 'fetchCurrentUser' })
)(Auth)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
