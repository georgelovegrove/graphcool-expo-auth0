import Expo from 'expo'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { StyleSheet, Text, View } from 'react-native'

import { client } from './apollo'
import Entry from './entry'

const App = () =>
  <ApolloProvider client={client}>
    <Entry />
  </ApolloProvider>

Expo.registerRootComponent(App)

export default App
