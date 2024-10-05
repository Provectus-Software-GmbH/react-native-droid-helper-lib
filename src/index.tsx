import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-droid-helper-lib' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const DroidHelperLib = NativeModules.DroidHelperLib
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
  DroidHelperLib.getCurrentSignatureForPackage(callback);
}
export function getRedirectUriForBroker(callback: (redirectUri: string) => void) {
  DroidHelperLib.getRedirectUriForBroker(callback);
}
export function isInstalledOnWorkProfile(callback: (isInstalled: boolean) => void) {
  DroidHelperLib.isInstalledOnWorkProfile(callback);
}
