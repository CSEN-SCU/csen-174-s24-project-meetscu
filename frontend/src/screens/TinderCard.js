import React, { useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import { Animated, PanResponder } from 'react-native';

const settings = {
  snapBackDuration: 300,
  maxTilt: 5,
  bouncePower: 0.2,
  swipeThreshold: 120, // Adjusted threshold for swipe
};

const TinderCard = forwardRef(({ flickOnSwipe = true, onSwipe, onCardLeftScreen, preventSwipe = [], children }, ref) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const rotate = pan.x.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: ['-30deg', '0deg', '30deg'],
  });

  const getSwipeDirection = useCallback((dx) => {
    return dx > 0 ? 'right' : 'left';
  }, []);

  useImperativeHandle(ref, () => ({
    swipe(dir = 'right') {
      const power = 800;
      const disturbance = (Math.random() - 0.5) * 100;
      let toValue;

      if (dir === 'right') {
        toValue = { x: power, y: disturbance };
      } else if (dir === 'left') {
        toValue = { x: -power, y: disturbance };
      }

      if (onSwipe) onSwipe(dir);

      Animated.timing(pan, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        if (onCardLeftScreen) onCardLeftScreen(dir);
        pan.setValue({ x: 0, y: 0 });
      });
    },
  }));

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, { dx, vx }) => {
        pan.flattenOffset();

        if (Math.abs(dx) > settings.swipeThreshold) {
          const direction = getSwipeDirection(dx);
          if (onSwipe) onSwipe(direction);

          if (!preventSwipe.includes(direction)) {
            Animated.decay(pan, {
              velocity: { x: vx, y: 0 },
              deceleration: 0.98,
              useNativeDriver: false,
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
      },
    })
  ).current;

  const resetCardPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 5,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
      }}
    >
      {children}
    </Animated.View>
  );
});

export default TinderCard;