import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>My Device Info</Text>
        </View>
        <GetDeviceModel />
        <GetDeviceStorage />
      </ScrollView>
    </SafeAreaView>
  );
}

const GetDeviceModel = () => {
  const deviceName = DeviceInfo.getBrand() + ' ' + DeviceInfo.getModel();
  const osVersion = Platform.Version;
  if (Platform.OS === 'android') {
    return <Android deviceName={deviceName} osVersion={osVersion} />;
  } else if (Platform.OS === 'ios') {
    return <IOS deviceName={deviceName} osVersion={osVersion} />;
  } else {
    return 'Unknown platform';
  }
};
const Android = ({deviceName, osVersion}) => {
  const versionNames = {
    0: 'Android KitKat',
    21: 'Android Lollipop',
    22: 'Android Lollipop MR1',
    23: 'Android Marshmallow',
    24: 'Android Nougat',
    25: 'Android Nougat MR1',
    26: 'Android Oreo',
    27: 'Android Oreo MR1',
    28: 'Android Pie',
    29: 'Android 10',
    30: 'Android 11',
    31: 'Android 12',
  };
  const OS = versionNames[osVersion] || 'Unknown Android Version';
  return (
    <View style={styles.headContainer}>
      <Text style={styles.headText}> {deviceName}</Text>
      <Text style={styles.text}> {OS}</Text>
    </View>
  );
};

const IOS = ({deviceName, osVersion}) => {
  const versionNames = {
    4.0: 'iOS 4',
    4.1: 'iOS 4.1',
    4.2: 'iOS 4.2',
    4.3: 'iOS 4.3',
    5.0: 'iOS 5',
    5.1: 'iOS 5.1',
    6.0: 'iOS 6',
    6.1: 'iOS 6.1',
    7.0: 'iOS 7',
    7.1: 'iOS 7.1',
    8.0: 'iOS 8',
    8.1: 'iOS 8.1',
    8.2: 'iOS 8.2',
    8.3: 'iOS 8.3',
    8.4: 'iOS 8.4',
    9.0: 'iOS 9',
    9.1: 'iOS 9.1',
    9.2: 'iOS 9.2',
    9.3: 'iOS 9.3',
    10.0: 'iOS 10',
    10.1: 'iOS 10.1',
    10.2: 'iOS 10.2',
    10.3: 'iOS 10.3',
    11.0: 'iOS 11',
    11.1: 'iOS 11.1',
    11.2: 'iOS 11.2',
    11.3: 'iOS 11.3',
    11.4: 'iOS 11.4',
    12.0: 'iOS 12',
    12.1: 'iOS 12.1',
    12.2: 'iOS 12.2',
    12.3: 'iOS 12.3',
    12.4: 'iOS 12.4',
    13.0: 'iOS 13',
    13.1: 'iOS 13.1',
    13.2: 'iOS 13.2',
    13.3: 'iOS 13.3',
    13.4: 'iOS 13.4',
    13.5: 'iOS 13.5',
    13.6: 'iOS 13.6',
    13.7: 'iOS 13.7',
    14.0: 'iOS 14',
    14.1: 'iOS 14.1',
    14.2: 'iOS 14.2',
    14.3: 'iOS 14.3',
    14.4: 'iOS 14.4',
    14.5: 'iOS 14.5',
    14.6: 'iOS 14.6',
    14.7: 'iOS 14.7',
    15.0: 'iOS 15',
  };
  const OS = versionNames[osVersion] || 'Unknown Android Version';
  return (
    <View>
      <Text> {deviceName}</Text>
      <Text> {OS}</Text>
    </View>
  );
};
const GetDeviceStorage = () => {
  const [storagePercentage, setStoragePercentage] = useState(null);
  useEffect(() => {
    const getStoragePercentage = async () => {
      const totalStorage = await DeviceInfo.getTotalDiskCapacity();
      const freeStorage = await DeviceInfo.getFreeDiskStorage();
      const usedStorage = totalStorage - freeStorage;
      const percentage = Math.floor((usedStorage / totalStorage) * 100);
      setStoragePercentage(percentage);
    };
    getStoragePercentage();
  }, []);

  return (
    <View style={styles.headContainer}>
      <Text style={styles.headText}>Internal Storage</Text>
      <Text style={styles.text}>{storagePercentage}% used</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15%',
  },
  headText: {fontSize: 18, fontWeight: 'bold'},
  text: {fontSize: 16},
});

export default App;
