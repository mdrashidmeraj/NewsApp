import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { AntDesign, Entypo } from "@expo/vector-icons";
import config from "../config";

const HomeScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [searchPressed, setSearchPressed] = useState(false);
  const [menuPressed, setMenuPressed] = useState(false);
  const [loading, setLoading] = useState(false);

  const getNews = async () => {
    setLoading(true);
    try {
      await fetch(`http://newsapi.org/v2/top-headlines?country=in&apiKey=${config.API_KEY}`)
        .then((response) => response.json())
        .then((responseJson) => {
          setNews(responseJson.articles);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getNews();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Daily News",
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: "#383838" },
      headerTitleStyle: { color: "white" },
      headerLeft: () => (
        <TouchableOpacity activeOpacity={0.5} onPress={() => setMenuPressed((menuPressed) => !menuPressed)}>
          <Entypo name="menu" size={30} color="white" />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => setSearchPressed((searchPressed) => !searchPressed)}>
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#383838" }}>
      {loading === true ? (
        <Text style={{ color: "white", fontSize: 20, textAlign: "center", marginTop: "50%" }}>Loading...</Text>
      ) : (
        <>
          {searchPressed ? <SearchBar setNews={setNews} getNews={getNews} /> : null}

          {menuPressed ? <Filters setNews={setNews} getNews={getNews} /> : null}

          {news.length === 0  ? (
            <Text style={{ color: "white", fontSize: 20, textAlign: "center", marginTop: "50%" }}>No News Found</Text>
          ) : (
            <FlatList
              data={news}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate("NewsDetails", { news: item.url })}
                  >
                    <NewsCard
                      imageURL={item.urlToImage}
                      title={item.title}
                      date={item.publishedAt}
                      from={item.source.name}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

export default HomeScreen;