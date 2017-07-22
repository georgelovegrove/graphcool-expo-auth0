import React from 'react'
import { graphql, compose, gql } from 'react-apollo'
import { StyleSheet, Text, View, Button } from 'react-native'

import Auth, { logout, currentUserQuery } from './auth'

const Entry = ({ fetchCurrentUser: { loading, user } }) => {
  if (loading) return <View style={styles.container}><Text>Loading...</Text></View>
  return user
    ? (<View style={styles.container}>
        <Text>Logged in baby</Text>
        <Button onPress={logout} title='Logout' />
      </View>)
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
