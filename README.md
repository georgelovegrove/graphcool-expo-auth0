# create-react-native-app with Expo using Auth0 and Graphcool

The code is based off the graphcool examples. Expo, React native and react have been updated to use the latest version. For usage instructions please see the original documentation - https://github.com/graphcool-examples/react-native-graphql/tree/master/authentication-with-expo-and-auth0

### Installation and setup

* git clone https://github.com/georgelovegrove/graphcool-expo-auth0.git
* yarn install
* Create auth0 and graphcool project. Make sure the user table requires authentication on the graphcool project.
* add a .env file with the following keys: AUTH0_CLIENT, AUTH0_DOMAIN, EXPO_URL (URL from expo client without the port), API_ENDPOINT (Graphcool simple endpoint)
* Open from expo client and run on a device!
