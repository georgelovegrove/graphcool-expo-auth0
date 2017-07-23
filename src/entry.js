import React from 'react'
import { graphql } from 'react-apollo'
import { StyleSheet, Text, View, Button } from 'react-native'

import Auth, { currentUserQuery } from './auth'
import Router from './router'

const Entry = ({ fetchCurrentUser: { loading, user } }) => {
  if (loading) return <View style={styles.container}><Text>Loading...</Text></View>
  return user
    ? <Router />
    : <Auth />
}

export default graphql(currentUserQuery, { name: 'fetchCurrentUser' })(Entry)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
