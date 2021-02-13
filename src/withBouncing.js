import { defineAnimation } from "react-native-redash";

export const withBouncing = (velocity, lowerBound, upperBound) => {
  "worklet";
  return defineAnimation(() => {
    "worklet";
    const onFrame = (state, now) => {
      'worklet';
      const { direction } = state;
      state.current += direction * velocity;
      if (state.current >= upperBound || state.current < lowerBound) {
        state.direction *= -1;
      }

      state.lastTimestamp = now;
      return false;
    };
    const onStart = (state, _, now) => {
      'worklet';
      state.current = lowerBound + Math.random() * upperBound;
      state.lastTimestamp = now;
      state.direction = 1;
    };
    return {
      onFrame,
      onStart,
    };
  });
};
