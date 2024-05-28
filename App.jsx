import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, PermissionsAndroid} from 'react-native';
import RNSoundLevel from 'react-native-sound-level';
import SoundAvg from './soundLevel/SoundAvg';
import Clock from './Clock.jsx';

const App = () => {
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    requestMicrophonePermission(); // 마이크 권한 요청

    RNSoundLevel.onNewFrame = data => {
      setNoiseLevel(data.value + 100);
    };

    return () => {
      RNSoundLevel.stop();
    };
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: '마이크 권한 요청',
          message: '소음 측정을 위해 마이크 권한이 필요합니다.',
          buttonPositive: '확인',
          buttonNegative: '취소',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('마이크 권한이 허용되었습니다.');
      } else {
        console.log('마이크 권한이 거부되었습니다.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startListening = async () => {
    try {
      RNSoundLevel.start(500);
      setIsRunning(true);
    } catch (e) {
      console.error(e);
    }
  };
  const stopListening = () => {
    RNSoundLevel.stop();
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Clock secondHandColor="red"></Clock>
      <Text style={styles.text}>현재 소음: {noiseLevel}dB</Text>
      <Button title="시작" onPress={startListening} disabled={isRunning} />
      <Button title="종료" onPress={stopListening} disabled={!isRunning} />
      <Text style={styles.text}>
        {isRunning ? '현재 측정이 진행중입니다.' : '측정이 종료되었습니다.'}
      </Text>
      <SoundAvg value={noiseLevel}></SoundAvg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
});

export default App;
