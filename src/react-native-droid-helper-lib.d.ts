declare module 'react-native-droid-helper-lib' {
    export function getCurrentSignatureForPackage(callback: (signatureHash: string) => void): void;
    export function getRedirectUriForBroker(callback: (redirectUri: string) => void): void;
    export function isInstalledOnWorkProfile(callback: (isInstalled: boolean) => void): void;
  }