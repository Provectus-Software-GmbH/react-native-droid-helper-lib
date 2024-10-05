# react-native-droid-helper-lib

React Native droid helper library

## Installation

```sh
npm install react-native-droid-helper-lib
```

## Usage


```js
import { getRedirectUriForBroker, 
         getCurrentSignatureForPackage, 
         isInstalledOnWorkProfile } from 'react-native-droid-helper-lib';

// ...

// get the signature hash
getCurrentSignatureForPackage((signatureHash: string) => {    
    console.log("SignatureHash: " + signatureHash);
});

// get the redirect uri for broker
getRedirectUriForBroker((redirectUri: string) => {
    console.log("RedirectUri: " + redirectUri);        
});

// check if the app is installed on work profile
isInstalledOnWorkProfile((isInstalled: boolean) => {
    console.log("IsInstalledOnWorkProfile:" + isInstalled);        
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
