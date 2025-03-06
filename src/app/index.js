import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { Button } from "../components/Button";
import Constants from "expo-constants";
import VersionCheck from "react-native-version-check";

export default function Index() {
  const [updateInfo, setUpdateInfo] = useState({
    isUpdateNeeded: false,
    storeUrl: null,
  });

  //const [hasUpdate, setHasUpdate] = useState(false);

  //You can use this version but is more manually, the other way is automatic from the library
  //Getting direct from you app.json

  // async function checkForUpdate() {
  //   try {
  //     const androidPackageName = Constants.expoConfig?.android?.package;

  //     if (!androidPackageName) {
  //       return;
  //     }

  //     const currentVersion = Constants.expoConfig?.version;

  //     if (!currentVersion) {
  //       return;
  //     }

  //     const latestVersion = await VersionCheck.getLatestVersion({
  //       provider: Platform.OS === "android" ? "playStore" : "appStore",
  //       packageName: Platform.OS === "android" ? androidPackageName : "",
  //     });

  //     setHasUpdate(latestVersion > currentVersion);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function checkForUpdate() {
    try {
      // Get current and latest versions
      const currentVersion = VersionCheck.getCurrentVersion();
      const latestVersion = await VersionCheck.getLatestVersion();

      console.log("Current version:", currentVersion);
      console.log("Latest version:", latestVersion);

      // Check if update is needed
      const needUpdateResult = await VersionCheck.needUpdate();
      console.log("Update needed:", needUpdateResult.isNeeded);

      if (needUpdateResult.isNeeded) {
        setUpdateInfo({
          isUpdateNeeded: true,
          storeUrl: needUpdateResult.storeUrl,
        });
      }

      return null;
    } catch (error) {
      console.error("Error checking for updates:", error);
      return null;
    }
  }

  useEffect(() => {
    checkForUpdate();
  }, []);

  return (
    // <>
    //   {hasUpdate ? (
    //     <Redirect href="/screens/update-app" />
    //   ) : (
    //     <View style={styles.container}>
    //       <Text>Welcome let's check the version of your app!</Text>
    //       <StatusBar style="auto" />
    //       <Button
    //         title="updatea app"
    //         onPress={() => router.navigate("/screens/update-app")}
    //       ></Button>
    //     </View>
    //   )}
    // </>
    <>
      {updateInfo.isUpdateNeeded ? (
        <Redirect href="/screens/update-app" />
      ) : (
        <View style={styles.container}>
          <Text>Welcome let's check the version of your app!</Text>
          <Button
            title="updatea app"
            onPress={() => router.navigate("/screens/update-app")}
          ></Button>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
