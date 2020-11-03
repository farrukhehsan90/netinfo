/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Platform,
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";


const App = () => {

  const [type, setType] = useState('')
  const [isConnected, setConnected] = useState(false)
  const [ipAdrs, setipAdrs] = useState('')
  const [SSID, setSSID] = useState('')
  const [subNet, setsubNet] = useState('')
  const [strength, setstrength] = useState('')

  useEffect(() => {
    unsubscribe()
  })


  NetInfo.fetch("wifi").then(state => {
    setType(state.type)
    setConnected(state.isWifiEnabled)
    setSSID(state.details.ssid)
    setsubNet(state.details.subnet)
    setipAdrs(state.details.ipAddress)
    setstrength(state.details.strength)
    // console.log("Connection type", state.type);
    // console.log("Is connected?", state.isConnected);
  });

  const unsubscribe = NetInfo.addEventListener(state => {
    if (isConnected != state.isWifiEnabled) {
        setConnected(state.isWifiEnabled)
    }
  });

  return (
      <View styles={styles.conatainer}>
          <View style={styles.itemContainer}>
            <Text style={styles.heading}>
                Net Information
            </Text>
          </View>

          <View style={styles.itemContainer}>
              
              <View style={styles.row}> 
                <View style={styles.itemContainer}>
                  <Text style={styles.boldTxt}>
                      Type
                  </Text>
                </View>
                <View style={styles.itemContainer}>
                  <Text>
                      {type}
                  </Text>
                </View>
              </View>

              <View style={styles.row}> 
                <View style={styles.itemContainer}>
                  <Text style={styles.boldTxt}>
                      Wifi
                  </Text>
                </View>
                <View style={styles.itemContainer}>
                  <Text>
                      {isConnected ? "Enabled" : "Disabled"}
                  </Text>
                </View>
              </View>


              <View style={styles.row}> 
                <View style={styles.itemContainer}>
                  <Text style={styles.boldTxt}>
                      IpAddress
                  </Text>
                </View>
                <View style={styles.itemContainer}>
                  <Text>
                      {ipAdrs}
                  </Text>
                </View>
              </View>


              <View style={styles.row}> 
                <View style={styles.itemContainer}>
                  <Text style={styles.boldTxt}>
                      Sub Net
                  </Text>
                </View>
                <View style={styles.itemContainer}>
                  <Text>
                      {subNet}
                  </Text>
                </View>
              </View>


              <View style={styles.row}> 
                <View style={styles.itemContainer}>
                  <Text style={styles.boldTxt}>
                      SSID
                  </Text>
                </View>
                <View style={styles.itemContainer}>
                  <Text>
                      {SSID ? SSID : 'Null'}
                  </Text>
                </View>
              </View>


              <View style={styles.row}> 
                <View style={styles.itemContainer}>
                  <Text style={styles.boldTxt}>
                      Strength
                  </Text>
                </View>
                <View style={styles.itemContainer}>
                  <Text>
                      {strength ? strength : 'Null'}
                  </Text>
                </View>
              </View>

          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  conatainer : { 
    flex: 1,
    
  },
  row: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign:'center',
    marginTop: Platform.OS === "ios" ? 10 : 0 
  },
  itemContainer: {
    padding: 10
  },
  boldTxt: {
    fontWeight:'bold'
  }
});

export default App;
