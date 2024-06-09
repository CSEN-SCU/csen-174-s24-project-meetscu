import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import UserContext from "../navigation/UserContext";
import axios from "axios";

const MatchCard = ({ match }) => (
  <View style={styles.card}>
    <Image source={{ uri: match.photo }} style={styles.image} />
    <Text style={styles.name}>{match.name}</Text>
    <Text style={styles.email}>{match.email}</Text>
  </View>
);

export default function ChatScreen() {
  const { user } = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const [matchDetails, setMatchDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/getUser", {
        params: { email: user.email },
      })
      .then((response) => {
        console.log("GETTING USER RESPONSE: ", response.data);
        const matchIds = response.data.matches || [];
        setMatches(matchIds);

        // Create an array of promises
        const promises = matchIds.map((id) => {
          console.log("Fetching data for ID: ", id);
          return axios.get("http://127.0.0.1:5000/getUser", {
            params: { email: id },
          });
        });

        // Use Promise.all to wait for all promises to resolve
        Promise.all(promises)
          .then((responses) => {
            console.log("Received users: ", responses.map(res => res.data));
            const detailedMatches = responses.map((res) => res.data);
            setMatchDetails(detailedMatches);
          })
          .catch((error) => {
            console.log("[Promise.all error]: ", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.email]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {matchDetails.length > 0 ? (
        <FlatList
          data={matchDetails}
          keyExtractor={(item, index) => `${item._id.$oid}-${index}`}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.text}>No matches yet</Text>
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
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
});





// import React, { useEffect, useState, useContext } from 'react';
// import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
// import UserContext from "../navigation/UserContext";
// import axios from 'axios';

// const ChatScreen = ({ userEmail }) => {
//   const { user, setUser } = useContext(UserContext);
//   const [matches, setMatches] = useState([]);

// useEffect(() => {
//   axios.get("http://127.0.0.1:5000/getUser", {
//     params: { email: user.Email }
//   })
//     .then(response => {
//       console.log("GETTING USER RESPONSE: ", response.data);
//       const userData = response.data;
//       if (userData.error) {
//         console.error('User not found:', userData.error);
//       } else {
//         setUser(userData);
//         const matchedUsers = userData.matches || [];
//         setMatches(matchedUsers);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching user:', error);
//     });
// }, [userEmail]);

  

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Image source={item.image} style={styles.image} />
//       <Text style={styles.name}>{item.name}, {item.age}</Text>
//       <Text style={styles.bio}>{item.bio}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {matches.length > 0 ? (
//         <FlatList
//           data={matches}
//           keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure each card has a unique key
//           renderItem={renderItem}
//         />
//       ) : (
//         <Text style={styles.text}>No matches yet</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   card: {
//     width: 300,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 5,
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: 150,
//     borderRadius: 10,
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   bio: {
//     fontSize: 16,
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   text: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
// });

// export default ChatScreen;

  // return (
  //   <View style={styles.container}>
  //     {matches.length > 0 ? (
  //       matches.map((match, index) => <MatchCard key={`${match.user_id}-${index}`} match={match} />)

  //     ) : (
  //       <Text style={styles.text}>No matches yet</Text>
  //     )}
  //   </View>
  // );