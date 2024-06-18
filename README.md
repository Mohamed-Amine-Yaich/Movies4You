# React Native App Assessment

Welcome to the React Native App Assessment repository! This guide will help you get started with setting up and running the app on your local machine.


## Installation

Follow these steps to install and run the React Native app:

### Step 1: Clone the Repository

Clone this repository to your local machine:

```bash
git clone <repository_url>
cd <repository_directory>

```
### Step 2: Installing Dependencies

Second, you will need to install project dependencies, run the following command from the _root_ of your React Native project:
 

```bash
# using npm
npm install

# OR using Yarn
yarn install

```
For ios run: 

```bash

cd ios 
pod install

```
### Step 3: Start the Metro Server

Third, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 4: Build your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
