import React, { useEffect, useState } from 'react';
import { readEisenhower } from '../Utils/database';
import Listing from '../Components/Listing';

const EisenhowerList = ({ navigation, route }) => {
  const [list, setList] = useState([]);
  const title = route.params?.heading;
  const isImportant = route.params?.isImportant;
  const isUrgent = route.params?.isUrgent;
  useEffect(() => {
    navigation.setOptions({
      title: title
    });
    async function getEisenhower(isImportant, isUrgent) {
      const data = await readEisenhower(isImportant, isUrgent);
      setList([...data]);
    }
    getEisenhower(isImportant, isUrgent);
  }, [navigation]);
  return <Listing list={list} />;
};

export default EisenhowerList;
