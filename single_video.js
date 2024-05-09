import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, PanResponder, SafeAreaView, Text } from 'react-native';

const VideoTrimmer = () => {
  const videoWidth = 100;
  const trackWidth = 1000;

  const [videoPosition, setVideoPosition] = useState(20); 
  const [videoLength, setVideoLength] = useState(videoWidth); 

  const handleLeftButtonMove = (_, gestureState) => {
    const newPosition = videoPosition + gestureState.dx;
    const newLength = videoLength - gestureState.dx;
    if (newPosition >= 0 && newLength <= videoWidth && newPosition + newLength <= trackWidth) {
      setVideoPosition(newPosition);
      setVideoLength(newLength);
    }
  };

  const handleRightButtonMove = (_, gestureState) => {
    const newLength = videoLength + gestureState.dx;
    if (videoPosition + newLength <= trackWidth && newLength <= videoWidth) {
      setVideoLength(newLength);
    }
  };

  const leftPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handleLeftButtonMove,
  });

  const rightPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handleRightButtonMove,
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newPosition = videoPosition + gestureState.dx;
      if (newPosition >= 0 && newPosition + videoLength <= trackWidth) {
        setVideoPosition(newPosition);
      }
    },
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
         <View style={[styles.videoContainer, { left: videoPosition, width: videoLength+20 }]}>
          <View style={[styles.leftButton, { left: 0  }]} {...leftPanResponder.panHandlers} >
            <Text>{"<"}</Text>
          </View>
          <View style={[styles.rightButton, { left: 10 + videoLength }]} {...rightPanResponder.panHandlers} >
            <Text>{">"}</Text>
          </View>
          <View style={[styles.video, { left: 10, width: videoLength }]} {...panResponder.panHandlers} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 1000,
    height: 50,
    backgroundColor: '#ddd',
    position: 'relative',
  },
  video: {
    height: '80%',
    backgroundColor: 'blue',
    position: 'absolute',
  },
  leftButton: {
    width: 10,
    height: '100%',
    backgroundColor: 'yellow',
    position: 'absolute',
    borderRadius: 10,
  },
  rightButton: {
    width: 10,
    height: '100%',
    backgroundColor: 'yellow',
    position: 'absolute',
    borderRadius: 10,
  },
  videoContainer: {
    position: 'absolute',
    backgroundColor: 'yellow',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    borderRadius: 10,
  }
});

export default VideoTrimmer;
