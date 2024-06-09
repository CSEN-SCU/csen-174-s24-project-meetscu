import { View, Text, StyleSheet, Image, Button, Modal, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import UserContext from "../navigation/UserContext";
import axios from "axios";
import TinderCard from "./TinderCard"; // Assuming you have a TinderCard component

const Card = ({ user }) => (
  <View style={styles.card}>
    <Image source={{ uri: user.photo }} style={styles.image} />
    <Text style={styles.name}>{user.name}</Text>
    <Text style={styles.email}>{user.email}</Text>
  </View>
);



export default function MeetScreen() {
  const { user, setUser } = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCardRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  console.log("Test");
  useEffect(() => {
    // Fetch user data from backend
    axios.get("http://127.0.0.1:5000/getUser", {
      params: { email: user.email }
    })
    .then(response => {
      console.log("GETTING USER RESPONSE: ", response.data);
      setUser(response.data);
    })
    .catch(error => {
      console.log(error);
    });

    axios.get("http://127.0.0.1:5000/getUsers", {
      params: { email: user.email }
    })
      .then(response => {
        console.log('Received users:', response.data.users);
        // response.data.users.forEach(user => {
        //   console.log(`User: ${user.email}`);
        //   console.log('Likes:');
        //   user.likes.forEach(like => {
        //     console.log(`- ${like.email}`);
        //   });
        // });
        setCards(response.data.users);
      })
      .catch(error => {
        console.log('Error fetching users:', error);
      });
    
  }, [user.email], [user.likes]);

  const handleCardLeftScreen = (direction) => {
    console.log(`Card left the screen ${direction}`);
    
    if (currentIndex >= cards.length) {
      console.error("Index out of bounds");
      return;
    }
    
    const currentCard = cards[currentIndex];
    if (!currentCard || !currentCard._id) { // Change user_id to _id
      console.error("Current card or user ID is undefined:", currentCard);
      return;
    }
    
    if (direction === "right") {
      const likedUserEmail = currentCard.email; 
      const payload = {
        user_email: user.email,
        liked_user_email: likedUserEmail
      };
      console.log("Payload being sent:", payload);  // Add this line
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
    console.log('All users:', cards);
    if (currentCardRef.current) {
      currentCardRef.current.swipe(dir);
    }
  };

  useEffect(() => {
    // Check for popup condition when the component first loads
    checkForPopup(user.email);
  }, []); // Empty dependency array to run once after initial render

  const checkForPopup = (email) => {
    axios
      .get("http://127.0.0.1:5000/check_matches", {
        params: { email: email },
      })
      .then((response) => {
        if (response.data.show_popup) {
          setShowPopup(true);
        }
      })
      .catch((error) => {
        console.error("Error checking for popup:", error);
      });
  };

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
            <Text style={styles.popupText}>You have at least 2 matches! If you have connected with a match, we encourage that you delete the app :{')'}</Text>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.popupButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {currentIndex < cards.length ? (
        <TinderCard
          ref={currentCardRef}
          onCardLeftScreen={handleCardLeftScreen}
        >
          <Card user={cards[currentIndex]} />
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
});
