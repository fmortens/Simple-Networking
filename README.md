# What
This is a test application written in react-native to test networking and more specifically, integration with Firebase.

This app has been created with create-react-native-app and has not yet been 'ejected'. If more native functionality is added this could change.

The app is in a very 'work in progress' state and is just for my personal test purposes.

## Setup
In order to get the integration with firebase up and working, you would need to add your config in config/index.json

The config structure is laid out in this way:
````
{
  "firebase": {
    "apiKey": "API KEY",
    "authDomain": "DOMAIN",
    "databaseURL": "DATABASE URL"
  }
}

````

Note, this file has been git ignored.

Dependencies are installed by running yarn:

`````
yarn
`````


## Run
For now just run the app via expo or fire the simulator with yarn:

````
yarn run start
`````

or

`````
yarn run ios
`````

I'm currently focusing on iOS, but there should not be any differences.

## Structure
Code is placed in the app/ folder

Current state mechanism is mobx and I have used provider to inject the stores into the different components.
