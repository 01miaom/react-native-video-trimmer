import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, PanResponder, SafeAreaView, Text } from 'react-native';

const VideoTrimmer = () => {
  const trackWidth = 1000;
  const videoWidth = 100;

  const [videos, setVideos] = useState([]);

  const createPanResponder = (position, length, setPosition, setLength, trackWidth, videoWidth) => {

    const handleLeftButtonMove = (_, gestureState) => {
      const newPosition = position + gestureState.dx;
      const newLength = length - gestureState.dx;
      if (newPosition >= 0 && newLength <= videoWidth && newPosition + newLength <= trackWidth && newPosition<=position+length) {
        setPosition(newPosition);
        setLength(newLength);
      }
    };

    const handleRightButtonMove = (_, gestureState) => {
      const newLength = length + gestureState.dx;
      if (position + newLength <= trackWidth && newLength <= videoWidth && newLength>0) {
        setLength(newLength);
      }
    };

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newPosition = position + gestureState.dx;
        if (newPosition >= 0 && newPosition + length <= trackWidth) {
          setPosition(newPosition);
        }
      },
    });

    const leftPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: handleLeftButtonMove,
    });

    const rightPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: handleRightButtonMove,
    });

    return { panResponder, leftPanResponder, rightPanResponder };
  };

  const addVideo = () => {
    const newVideo = { position: 0, length: videoWidth };
    setVideos([...videos, newVideo]);
  };

  const renderVideos = () => {
    return videos.map((video, index) => {
      const { position, length } = video;
      const { panResponder, leftPanResponder, rightPanResponder } = createPanResponder(
        position,
        length,
        newPosition => {
          const updatedVideos = [...videos];
          updatedVideos[index].position = newPosition;
          setVideos(updatedVideos);
        },
        newLength => {
          const updatedVideos = [...videos];
          updatedVideos[index].length = newLength;
          setVideos(updatedVideos);
        },
        trackWidth,
        videoWidth
      );

      return (
        <View key={index} style={[styles.videoContainer, { left: position, width: length + 20 }]}>
          <View style={[styles.leftButton, { left: 0 }]} {...leftPanResponder.panHandlers}>
          </View>
          <View style={[styles.rightButton, { left: 10 + length }]} {...rightPanResponder.panHandlers}>
          </View>
          <View style={[styles.video, { left: 10, width: length }]} {...panResponder.panHandlers} />
        </View>
      );
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {renderVideos()}
        <TouchableOpacity onPress={addVideo}>
          <Text>Add Video</Text>
        </TouchableOpacity>
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
  },
});

export default VideoTrimmer;
