import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import UserContext from "../utils/UserContext";
import AuthContext from "../utils/AuthContext";
import axios from "axios";

const MatchCard = ({ match }) => (
  <View style={styles.card}>
    <Image source={{ uri: match.photo }} style={styles.image} />
    <Text style={styles.name}>{match.name}</Text>
    <Text style={styles.email}>{match.email}</Text>
    <Text style={styles.bestMatch}>Best Match Activity: {match.bestMatch}</Text>
  </View>
);

export default function ChatScreen() {
  const { user, setUser } = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const [matchDetails, setMatchDetails] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const fetchMatchDetails = async (matchIds) => {
    try {
      const promises = matchIds.map((id) =>
        axios.get("http://127.0.0.1:5000/getUser", { params: { email: id } })
      );

      const responses = await Promise.all(promises);
      const detailedMatches = responses.map((res) => res.data);

      // Get the best match for each detailed match
      detailedMatches.forEach((match) => {
        const compatibilityScore = user.compatibility_scores.find(
          (score) => score.email === match.email
        );
        match.bestMatch = compatibilityScore ? compatibilityScore.best_match : "N/A";
      });

      setMatchDetails(detailedMatches);
    } catch (error) {
      console.error("[Promise.all error]: ", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/getUser", {
        params: { email: user.email },
      });
      const userData = response.data;
      setUser(userData);

      const matchIds = userData.matches || [];
      setMatches(matchIds);
      await fetchMatchDetails(matchIds);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if(user && user.email){
        fetchUserData();
      }
    }, [user?.email])
  );

  const renderItem = ({ item }) => (
    <MatchCard match={item} />
  );

  return (
    <View style={styles.container}>
      {!isLoggedIn ? <Text>Loading...</Text> : (
        <>
          {matchDetails.length > 0 ? (
            <FlatList
              data={matchDetails}
              keyExtractor={(item, index) => `${item._id.$oid}-${index}`}
              renderItem={renderItem}
            />
          ) : (
            <Text style={styles.text}>No matches yet</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 300,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    marginTop: 5,
    color: "gray",
  },
  bestMatch: {
    fontSize: 18,
    color: "blue",
    marginTop: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
