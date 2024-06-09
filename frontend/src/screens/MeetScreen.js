import { View, Text, StyleSheet, Image, Button, Modal, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import UserContext from "../utils/UserContext";
import AuthContext from "../utils/AuthContext";
import axios from "axios";
import TinderCard from "./TinderCard"; // Assuming you have a TinderCard component
import { useNavigation } from '@react-navigation/native';

const Card = ({ user, bestMatch }) => (
  <View style={styles.card}>
    <Image source={{ uri: user.photo }} style={styles.image} />
    <Text style={styles.name}>{user.name}</Text>
    <Text style={styles.email}>{user.email}</Text>
    {bestMatch && <Text style={styles.bestMatch}>Best Match Activity: {bestMatch}</Text>}
  </View>
);

export default function MeetScreen() {
  const { user, setUser } = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCardRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/getUser", { params: { email: user.email } })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get("http://127.0.0.1:5000/getUsers", { params: { email: user.email } })
      .then(response => {
        setCards(response.data.users);
      })
      .catch(error => {
        console.log('Error fetching users:', error);
      });
  }, [user.email]);

  const getBestMatch = (otherUserEmail) => {
    if (!user || !user.compatibility_scores) return null;
    const compatibilityScore = user.compatibility_scores.find(score => score.email === otherUserEmail);
    return compatibilityScore ? compatibilityScore.best_match : null;
};


  const handleCardLeftScreen = (direction) => {
    if (currentIndex >= cards.length) {
      return;
    }

    const currentCard = cards[currentIndex];
    if (!currentCard || !currentCard._id) {
      return;
    }

    if (direction === "right") {
      const likedUserEmail = currentCard.email;
      const payload = {
        user_email: user.email,
        liked_user_email: likedUserEmail
      };
      axios.post("http://127.0.0.1:5000/like", payload)
        .then(response => {
          console.log("User liked successfully!");
        })
        .catch(error => {
          console.error("Error liking user:", error);
        });
    }
    setCurrentIndex(currentIndex + 1);
  };

  const swipeCard = (dir) => {
    if (currentCardRef.current) {
      currentCardRef.current.swipe(dir);
    }
  };

  useEffect(() => {
    checkForPopup(user.email);
  }, []);

  const checkForPopup = (email) => {
    axios.get("http://127.0.0.1:5000/check_matches", { params: { email: email } })
      .then((response) => {
        if (response.data.show_popup) {
          setShowPopup(true);
        }
      })
      .catch((error) => {
        console.error("Error checking for popup:", error);
      });
  };

  const handleDelete = async () => {
    try {
      const email = user.email;  // Replace with actual user email from session or state
      const response = await axios.post('http://127.0.0.1:5000/delete', { email });
      if (response.status === 200) {
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPopup}
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>
              You have at least 2 matches! If you have connected with a match, we encourage that you delete the app :)
            </Text>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.popupButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.popupButton, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Text style={styles.popupButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {currentIndex < cards.length ? (
        <TinderCard
          ref={currentCardRef}
          onCardLeftScreen={handleCardLeftScreen}
        >
          <Card user={cards[currentIndex]} bestMatch={getBestMatch(cards[currentIndex].email)} />
        </TinderCard>
      ) : (
        <Text style={styles.text}>No more cards</Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button title="Swipe Left" onPress={() => swipeCard("left")} />
        <Button title="Swipe Right" onPress={() => swipeCard("right")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '60%',
    borderRadius: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  bestMatch: {
    marginTop: 10,
    fontSize: 18,
    color: 'blue',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '80%',
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  popupText: {
    fontSize: 18,
    marginBottom: 10,
  },
  popupButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  popupButtonText: {
    color: "white",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});
