import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";

const datasets = () => {
  let data = [
    { id: "1", name: "hello" },
    { id: "1", name: "world" },
  ];
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={(itemInfo) => <Text>{itemInfo.item.name}</Text>}
    />
  );
};

export default datasets;

const styles = StyleSheet.create({});
