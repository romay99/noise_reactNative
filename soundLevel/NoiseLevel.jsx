import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const NoiseLevel = props => {
  let imageSrc;
  if (props.level === 5) {
    imageSrc = require('../assets/image/lev5.png');
  } else if (props.level === 4) {
    imageSrc = require('../assets/image/lev4.png');
  } else if (props.level === 3) {
    imageSrc = require('../assets/image/lev3.png');
  } else if (props.level === 2) {
    imageSrc = require('../assets/image/lev2.png');
  } else if (props.level === 1) {
    imageSrc = require('../assets/image/lev1.png');
  }

  return (
    <View style={styles.container}>
      <Image source={imageSrc} style={styles.image} alt="경로이상" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    // 추가적인 스타일을 여기에 추가할 수 있습니다.
  },
});

export default NoiseLevel;
