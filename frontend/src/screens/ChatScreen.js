import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

const ChatScreen = ({ rightSwipes }) => {
    console.log("Right swipes:", rightSwipes); 
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}, {item.age}</Text>
      <Text style={styles.bio}>{item.bio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {rightSwipes.length > 0 ? (
        <FlatList
        data={rightSwipes}
        keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure each card has a unique key
        renderItem={renderItem}
      />
      
      ) : (
        <Text style={styles.text}>No swiped right cards</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
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
});

export default ChatScreen;
