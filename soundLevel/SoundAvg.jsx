import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import NoiseLevel from './NoiseLevel';

const SoundAvg = props => {
  const [dbList, setDbList] = useState([]);
  const [average, setAverage] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    // console.log('list == ', dbList);
    if (dbList.length < 120) {
      setDbList(prevList => [...prevList, props.value]);
    } else {
      const tmplist = [...dbList];
      tmplist.shift();
      tmplist.push(props.value);
      setDbList(tmplist);
    }
    setAverage(getAverage(dbList));
    setNoiseLevel(average);
  }, [props.value]);

  // 평균값 구하는 함수
  const getAverage = arr => {
    if (arr.length === 0) return 0;

    const sum = arr.reduce((acc, cur) => acc + cur, 0);
    return sum / arr.length;
  };

  //소음 레벨 측정하는 함수
  const setNoiseLevel = avg => {
    console.log(avg);
    if (avg > 100) {
      setLevel(5);
    } else if (avg > 80) {
      setLevel(4);
    } else if (avg > 60) {
      setLevel(3);
    } else if (avg > 40) {
      setLevel(2);
    } else {
      setLevel(1);
    }
  };

  return (
    <View>
      <Text style={styles.text}>현재 1분당 평균값 : {average.toFixed(2)}</Text>
      <NoiseLevel level={level}></NoiseLevel>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
});

export default SoundAvg;
