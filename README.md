# create-react-native-app with Expo using Auth0 and Graphcool

The code is based off the graphcool examples. Expo, React native and react have been updated to use the latest version. For usage instructions please see the original documentation - https://github.com/graphcool-examples/react-native-graphql/tree/master/authentication-with-expo-and-auth0

### Installation and setup

* git clone https://github.com/georgelovegrove/graphcool-expo-auth0.git
* yarn install
* Create auth0 and graphcool project based on the original documentation - https://github.com/graphcool-examples/react-native-graphql/tree/master/authentication-with-expo-and-auth0. Read, Update and Delete should be authenticated in the graphcool User table.
* add a .env file with the following keys: AUTH0_CLIENT, AUTH0_DOMAIN, EXPO_URL (URL from expo client without the port), API_ENDPOINT (Graphcool simple endpoint)
* If you intend to use facebook login like in this example you will need a Facebook App ID. Follow this documentation https://auth0.com/docs/connections/social/facebook and test the connection works. Change the scope in the loginWithAuth0 function if you want to use another social or email/password authentication method.
* Open from expo client and run on a device!
