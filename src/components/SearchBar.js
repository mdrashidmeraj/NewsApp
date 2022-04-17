import {  View, TextInput } from 'react-native'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import config from '../config';

const SearchBar = ({setNews, getNews}) => {
  const [search, setSearch] = useState('');
  const search_query = async() =>  {
    await fetch(`https://newsapi.org/v2/everything?q=${search}&language=en&sortBy=relevancy&apiKey=${config.API_KEY}`)
    .then(response => response.json())
    .then(responseJson => {
      setNews(responseJson.articles);
    }).catch(error => {
      console.error(error);
    })
  }
  return (
    <View style={{  flexDirection: 'row', margin: 5, backgroundColor: '#DDDDDD', borderWidth:1 }}>
      <View style={{padding: 5}}><AntDesign name="search1" size={30} color="black" /></View>
      <TextInput
        style={{
          height: 40,
          fontSize: 20,
          flex:1,
  
        }}
        placeholder="Search"
        onChangeText={setSearch}
        onSubmitEditing={search.length === 0? getNews : search_query}
        value = {search}
      />
      
    </View>
  )
}

export default SearchBar
