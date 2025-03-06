import { Text, View } from "react-native";
import { Button } from "../../components/Button";
import Constants from "expo-constants";
import VersionCheck from "react-native-version-check";
import * as Linking from 'expo-linking';

export default function UpdateApp() {
  async function goToStoreUpdate() {
    try {
      // Option 1: Just get the Play Store URL
      const url = await VersionCheck.getPlayStoreUrl({
        packageName: Constants.expoConfig?.android?.package,
        ignoreErrors: true,
      });

      console.log("Play Store URL:", url);

      // This will open the Play Store/App Store
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error getting store URL:", error);
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
