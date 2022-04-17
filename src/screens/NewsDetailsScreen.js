import { StyleSheet, Text, View } from 'react-native'
import React, {useLayoutEffect} from 'react'
import {WebView} from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context';

const NewsDetailsScreen = ({route, navigation}) => {
  const {news} = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [])
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source = {{uri: news}}
      />
    </SafeAreaView>
  )
}

export default NewsDetailsScreen

const styles = StyleSheet.create({})