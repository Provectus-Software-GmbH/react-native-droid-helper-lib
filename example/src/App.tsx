import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getRedirectUriForBroker, getCurrentSignatureForPackage, isInstalledOnWorkProfile } from 'react-native-droid-helper-lib';

export default function App() {
  const [SignatureForPackage, setSignatureForPackage] = useState<string | undefined>();
  const [RedirectUriForBroker, setRedirectUriForBroker] = useState<string | undefined>();
  const [IsInstalledOnWorkProfile, setIsInstalledOnWorkProfile] = useState<boolean | undefined>();

  useEffect(() => {    
    // get the signature hash
    getCurrentSignatureForPackage((signatureHash: string) => {
      setSignatureForPackage(signatureHash);
      console.log("SignatureHash: " + signatureHash);
    });

    // get the redirect uri for broker
    getRedirectUriForBroker((redirectUri: string) => {
      setRedirectUriForBroker(redirectUri);
      console.log("RedirectUri: " + redirectUri);        
    });
    
    // check if the app is installed on work profile
    isInstalledOnWorkProfile((isInstalled: boolean) => {
      setIsInstalledOnWorkProfile(isInstalled);
      console.log("IsInstalledOnWorkProfile: " + isInstalled);        
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SignatureHash: {SignatureForPackage}</Text>
      <Text style={styles.text}>RedirectUriForBroker: {RedirectUriForBroker}</Text>
      <Text style={styles.text}>IsInstalledOnWorkProfile: {String(IsInstalledOnWorkProfile)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },text: {
    marginBottom: 10,
  },
});
