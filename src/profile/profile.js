import React from 'react'
import { graphql } from 'react-apollo'
import { StyleSheet, Text, View, Button } from 'react-native'

import { logout, currentUserQuery } from '../auth'

const Profile = ({ fetchCurrentUser: { loading, user } }) => {
  if (loading) return <View style={styles.container}><Text>Loading...</Text></View>
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Text>Logged in as { user.name }</Text>
      <Button onPress={logout} title='Logout' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default graphql(currentUserQuery, { name: 'fetchCurrentUser' })(Profile)
