// import { View, Text } from "react-native";
// import React from "react";


// export default function HomeScreen(){
//     return (
//         <View>
//             <Text>HomeScreen</Text>
//         </View>
//     )
// }

// import { View, Text, StyleSheet, Image } from "react-native";
// import React from "react";

// export default function HomeScreen(){
//     return (
//         <View style={styles.container}>
//             <Image
//                 source={require("../../assets/profile_transparent.jpg")}
//                 style={styles.profileImage}
//             />
//             <Text style={styles.name}>John Doe</Text>
//             <Text style={styles.bio}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo mi vel magna dictum, eu condimentum lorem pellentesque.</Text>
//             <Text style={styles.location}>Location: New York City</Text>
//             <Text style={styles.interests}>Interests: Running, Gym, Cooking</Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     profileImage: {
//         width: 150,
//         height: 150,
//         borderRadius: 75,
//         marginBottom: 20,
//     },
//     name: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     bio: {
//         fontSize: 16,
//         textAlign: 'center',
//         marginBottom: 10,
//     },
//     location: {
//         fontSize: 16,
//         marginBottom: 5,
//     },
//     interests: {
//         fontSize: 16,
//     },
// });



// App.js
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import TinderCard from './TinderCard';

export default function App() {
  const [cards, setCards] = useState([
    { id: 1, name: 'Francis Freshman', age: 19, bio: 'Loves hiking and outdoor adventures.', image: require('../../assets/1631259829652.jpeg') },
    { id: 2, name: 'Suzy Sophmore', age: 20, bio: 'Avid reader and coffee enthusiast.', image: require('../../assets/1688415064977.jpeg') },
    { id: 3, name: 'Jason Junior', age: 21, bio: 'Tech geek and music lover.', image: require('../../assets/1708300307771.jpeg') },
    // Add more profiles as needed
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCardRef = useRef(null);

  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction}`);
  };

  const handleCardLeftScreen = (direction) => {
    console.log(`Card left the screen ${direction}`);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const swipeCard = (dir) => {
    if (currentCardRef.current) {
      currentCardRef.current.swipe(dir);
    }
  };

  return (
    <View style={styles.container}>
      {currentIndex < cards.length ? (
        <TinderCard
          ref={currentCardRef}
          onSwipe={handleSwipe}
          onCardLeftScreen={handleCardLeftScreen}
        >
          <View style={styles.card}>
            <Image source={cards[currentIndex].image } style={styles.image} />
            <Text style={styles.name}>{cards[currentIndex].name}, {cards[currentIndex].age}</Text>
            <Text style={styles.bio}>{cards[currentIndex].bio}</Text>
          </View>
        </TinderCard>
      ) : (
        <Text style={styles.text}>No more cards</Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button title="Swipe Left" onPress={() => swipeCard('left')} />
        <Button title="Swipe Right" onPress={() => swipeCard('right')} />
        {/* <Button title="Swipe Up" onPress={() => swipeCard('up')} />
        <Button title="Swipe Down" onPress={() => swipeCard('down')} /> */}
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
  bio: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
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
});

