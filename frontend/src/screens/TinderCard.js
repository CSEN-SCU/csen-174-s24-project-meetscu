// import { View, Text } from "react-native";
// import React from "react";


// export default function ChatScreen(){
//     return (
//         <View>
//             <Text>ChatScreen</Text>
//         </View>
//     )
// }



import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { Animated, PanResponder } from 'react-native';

const settings = {
  snapBackDuration: 300,
  maxTilt: 5,
  bouncePower: 0.2,
  swipeThreshold: 120 // Adjusted threshold for swipe
};

const TinderCard = forwardRef(({ flickOnSwipe = true, onSwipe, onCardLeftScreen, preventSwipe = [], children }, ref) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const rotate = pan.x.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: ['-30deg', '0deg', '30deg']
  });

  useImperativeHandle(ref, () => ({
    async swipe(dir = 'right') {
      const power = 800;
      const disturbance = (Math.random() - 0.5) * 100;
      let toValue;

      if (dir === 'right') {
        toValue = { x: power, y: disturbance };
      } else if (dir === 'left') {
        toValue = { x: -power, y: disturbance };
      } else if (dir === 'up') {
        toValue = { x: disturbance, y: -power };
      } else if (dir === 'down') {
        toValue = { x: disturbance, y: power };
      }

      if (onSwipe) onSwipe(dir);

      Animated.timing(pan, {
        toValue,
        duration: 300,
        useNativeDriver: false
      }).start(() => {
        if (onCardLeftScreen) onCardLeftScreen(dir);
        pan.setValue({ x: 0, y: 0 });
      });
    }
  }));

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, { dx, dy, vx, vy }) => {
        pan.flattenOffset();

        if (Math.abs(dx) > settings.swipeThreshold || Math.abs(dy) > settings.swipeThreshold) {
          const direction = getSwipeDirection({ x: vx, y: vy });
          if (onSwipe) onSwipe(direction);

          if (!preventSwipe.includes(direction)) {
            Animated.decay(pan, {
              velocity: { x: vx, y: vy },
              deceleration: 0.98,
              useNativeDriver: false
            }).start(() => {
              if (onCardLeftScreen) onCardLeftScreen(direction);
              pan.setValue({ x: 0, y: 0 });
            });
          } else {
            resetCardPosition();
          }
        } else {
          resetCardPosition();
        }
      }
    })
  ).current;

  const getSwipeDirection = (speed) => {
    if (Math.abs(speed.x) > Math.abs(speed.y)) {
      return speed.x > 0 ? 'right' : 'left';
    } else {
      return speed.y > 0 ? 'down' : 'up';
    }
  };

  const resetCardPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 5,
      useNativeDriver: false
    }).start();
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }]
      }}
    >
      {children}
    </Animated.View>
  );
});

export default TinderCard;
