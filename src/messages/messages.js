import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Messages = () =>
  <View style={styles.container}>
    <Text>Messages</Text>
  </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Messages
