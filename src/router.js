import React from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import { StyleSheet, Image } from 'react-native'

import Messages from './messages'
import Profile from './profile'

const Router = TabNavigator({
  Messages: {
    screen: Messages,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Image source={require('./assets/icons/message.png')} style={[styles.icon, { tintColor }]} />
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Image source={require('./assets/icons/profile.png')} style={[styles.icon, { tintColor }]} />
    }
  }
}, {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#C567E5',
    showIcon: true,
    showLabel: false
  }
})

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
})

export default Router
