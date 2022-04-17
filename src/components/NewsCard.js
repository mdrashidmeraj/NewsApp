import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import moment from 'moment';

const NewsCard = ({imageURL, title, date, from}) => {
  imageURL = imageURL === null ? 'https://media.istockphoto.com/vectors/newspaper-drawing-vector-id166054637?k=20&m=166054637&s=612x612&w=0&h=cEr452jhz3c6gYmtePHQGRXFx8MMexDzsFavJe0RBgM=' : imageURL;
  for(let i = title.length-1; i >= 0; i--){
    if(title[i] === '-'){
      title = title.slice(0, i);
      break;
    }
  }
  return (
    <View style = {styles.container}>
        <Image 
            style = {{width: "100%" , height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
            source = {{uri: imageURL }}
        />        
        <Text style={{fontWeight:'bold', margin: 5}} >{title}</Text>
        <View style = {{flexDirection: 'row-reverse', justifyContent: 'space-between', margin: 5}}>
          <Text>{moment(date).format('MMMM Do YYYY')}</Text>
          <Text>{from}</Text>
        </View>
    </View>
  )
}

export default NewsCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        // padding: 10,
        borderRadius: 10
    },
})