import React, { useEffect, useState } from 'react';
import { readKanban } from '../Utils/database';
import Listing from '../Components/Listing';

const KanbanList = ({ route, navigation }) => {
  const [list, setList] = useState([]);
  const stage = route.params?.stage;
  useEffect(() => {
    navigation.setOptions({
      title: `Tasks ${stage}`
    });
    const getList = async () => {
      const arr = ['To do', 'Doing', 'Done'];
      const index = arr.findIndex(ele => ele === stage);
      const list = await readKanban(index);
      setList([...list]);
    };
    getList();
  }, [navigation]);

  return <Listing list={list} />;
};

export default KanbanList;
