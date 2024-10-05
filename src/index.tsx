import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-droid-helper-lib' doesn't seem to be linked. Make sure: \n\n` +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const DroidHelperLib = Platform.OS === 'android' && NativeModules.DroidHelperLib
  ? NativeModules.DroidHelperLib
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function getCurrentSignatureForPackage(callback: (signatureHash: string) => void) {
  if (Platform.OS === 'android') {
    DroidHelperLib.getCurrentSignatureForPackage(callback);
  } else {
    console.warn('getCurrentSignatureForPackage is android only');
    callback('');
  }
}

export function getRedirectUriForBroker(callback: (redirectUri: string) => void) {
  if (Platform.OS === 'android') {
    DroidHelperLib.getRedirectUriForBroker(callback);
  } else {
    console.warn('getRedirectUriForBroker is android only');
    callback('');
  }
}

export function isInstalledOnWorkProfile(callback: (isInstalled: boolean) => void) {
  if (Platform.OS === 'android') {
    DroidHelperLib.isInstalledOnWorkProfile(callback);
  } else {
    console.warn('isInstalledOnWorkProfile is android only');
    callback(false);
  }
}
