import { Text, View, Platform, Alert } from "react-native";
import { Button } from "../../components/Button";
import Constants from "expo-constants";
import VersionCheck from "react-native-version-check";
import * as Linking from 'expo-linking';

export default function UpdateApp() {
  async function goToStoreUpdate() {
    try {
      let url;
      
      if (Platform.OS === 'android') {
        // Using getPlayStoreUrl for Android
        url = await VersionCheck.getPlayStoreUrl({
          packageName: Constants.expoConfig?.android?.package,
          ignoreErrors: true,
        });
      } else if (Platform.OS === 'ios') {
        url = await VersionCheck.getAppStoreUrl({
          appID: Constants.expoConfig?.extra?.iosAppStoreId,
          ignoreErrors: true,
        });
      }

      if (url) {
        const canOpen = await Linking.canOpenURL(url);
        
        if (canOpen) {
          await Linking.openURL(url);
        } else {
          Alert.alert(
            "Cannot Open Store",
            "Unable to open the app store. Please update the app manually."
          );
        }
      } else {
        Alert.alert(
          "Update Error",
          "Could not determine app store URL. Please update manually."
        );
      }
    } catch (error) {
      console.error("Error getting store URL:", error);
      Alert.alert(
        "Error", 
        "Failed to open app store. Please update manually."
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        gap: 10,
      }}
    >
      <Text>Update your app</Text>
      <Button title="Update" onPress={goToStoreUpdate} />
    </View>
  );
}
