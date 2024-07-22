import React, { useEffect, useState } from 'react';
import { readOTF } from '../Utils/database';
import Listing from '../Components/Listing';

const OneThreeFiveList = ({ navigation, route }) => {
  const [list, setList] = useState([]);
  const type = route.params?.type;
  useEffect(() => {
    navigation.setOptions({
      title: `${type} Task`
    });
    const getList = async () => {
      const arr = ['Major', 'Medium', 'Minor'];
      const index = arr.findIndex(ele => ele === type);
      const list = await readOTF(index);
      setList([...list]);
    };
    getList();
  }, [navigation]);
  return <Listing list={list} />;
};

export default OneThreeFiveList;
