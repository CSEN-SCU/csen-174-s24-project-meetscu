import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import TinderCard from './TinderCard';

const Card = ({ card }) => (
  <View style={styles.card}>
    <Image source={card.image} style={styles.image} />
    <Text style={styles.name}>{card.name}, {card.age}</Text>
    <Text style={styles.bio}>{card.bio}</Text>
  </View>
);

export default function MeetScreen({ updateRightSwipes }) {
  const [cards, setCards] = useState([
    { id: 1, name: 'Francis Freshman', age: 19, bio: 'Loves hiking and outdoor adventures.', image: require('../../assets/1631259829652.jpeg') },
    { id: 2, name: 'Suzy Sophmore', age: 20, bio: 'Avid reader and coffee enthusiast.', image: require('../../assets/1688415064977.jpeg') },
    { id: 3, name: 'Jason Junior', age: 21, bio: 'Tech geek and music lover.', image: require('../../assets/1708300307771.jpeg') },
    // Add more profiles as needed
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCardRef = useRef(null);

  useEffect(() => {
    console.log(`Current index after update: ${currentIndex}`);
  }, [currentIndex]);

  // const handleSwipe = (direction) => {
  //   if (direction === 'right') {
  //     updateRightSwipes(cards[currentIndex]);
  //   }
  //   console.log(`Swiped ${direction}`);
  // };

  const handleCardLeftScreen = (direction) => {
    console.log(`Card left the screen ${direction}`);
    console.log(`Current index before update: ${currentIndex}`);
    
    setCurrentIndex((prevIndex) => {
      if (direction === 'right') {
        updateRightSwipes(cards[prevIndex]);
      }
      console.log(`Updating current index from: ${prevIndex} to ${prevIndex + 1}`);
      return prevIndex + 1;
    });
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
         // onSwipe={handleSwipe}
          onCardLeftScreen={handleCardLeftScreen}
        >
          <Card card={cards[currentIndex]} />
        </TinderCard>
      ) : (
        <Text style={styles.text}>No more cards</Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button title="Swipe Left" onPress={() => swipeCard('left')} />
        <Button title="Swipe Right" onPress={() => swipeCard('right')} />
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
