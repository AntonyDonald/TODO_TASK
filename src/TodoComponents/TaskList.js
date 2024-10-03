import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { screenHeigth, screenWidth } from "./CustomStyles";
import { Checkbox } from "react-native-paper";
import axios from "axios";

const TaskList = () => {
  const [taskDetails, setTaskDetails] = useState({
    id: 0,
    title: "",
    completed: false,
  });
  const [taskList, setTaskList] = useState([]);

  // this useEffect only Render Initally because of Empty Dependency
  useEffect(() => {
    getUserList();
  }, []);

  //this function is used to fetch the data from api url and using axios for this api integration
  const getUserList = async () => {
    // the async await used for return promises i.e, if the data is load it still waiting to get api data .then return the success data, .catch is return the error

    await axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => setTaskList(res.data))
      .catch((err) => setTaskList([]));
  };

  //handleAddTask Button is use to add user to the uselist
  const handleAddTask = () => {
    // this validation filter is used to  check the task title already exist or not if the task is already exist the warning alert will be shown.
    const filterTask = taskList.filter(
      (val) =>
        (val?.title).toLocaleLowerCase().trim() ===
        (taskDetails?.title).toLocaleLowerCase().trim()
    );

    if (filterTask.length > 0) {
      alert("Warning!   Task Name Already Exist");
      return;
    }

    // this newid is set based on the tasklist length, find out the last object id then add one Number to the id. if the taskList is empty array set default id 0
    const newid = taskList.length ? taskList[taskList.length - 1].id + 1 : 0;
    // the trim() is used to avoid empty spaces
    const data = {
      ...taskDetails,
      id: newid,
      title: taskDetails?.title?.trim(),
    };
    // if the taskList have length using spread oprator to add new data with existing data
    // otherwise the data set it directly
    if (taskList?.length) {
      setTaskList([...taskList, data]);
    } else {
      setTaskList([data]);
    }
    // after this set the taskDetails to initial state
    setTaskDetails({ id: 0, title: "", completed: false });
  };

  //this function is used to check and uncheck the checkbox
  const handleCheckBox = (id) => {
    // this map function is used to map the tasklist data and the received parameter id is matching with the mapped data id then that object completed status will changed. after that the mapped array is set to the taskList
    const mappedUser = taskList?.map((val) =>
      val?.id === id ? { ...val, completed: !val?.completed } : val
    );
    setTaskList(mappedUser);
  };

  //this function is used to Delete the user
  const handleDelete = (id) => {
    // this filter function is used to omit that one object from the taskList, the the obtained Filtered Array is set to the taskList
    const filteredUser = taskList?.filter((val) => val?.id !== id);
    setTaskList(filteredUser);
  };

  //Flatlist renderItem

  const renderItem = ({ item, index }) => {
    return (
      // each components are in row
      <View style={[styles?.flatlistContainer]}>
        {/* Checkbox : This checkbox mentioned the task is completed or not  */}
        <Checkbox
          status={item?.completed ? "checked" : "unchecked"}
          onPress={() => handleCheckBox(item?.id)}
        />
        {/* In this Text Element Display tasks name  */}
        <Text style={[styles?.title]}>{item?.title || ""}</Text>
        {/* this Button used to pass the id as parameter to the handleDelete Function */}
        <Button title="Delete" onPress={() => handleDelete(item?.id)} />
      </View>
    );
  };

  return (
    <View style={styles?.container}>
      {/* This TextInput for enter the name of the Task  */}
      <TextInput
        value={taskDetails?.title || ""}
        onChangeText={(e) => setTaskDetails({ ...taskDetails, title: e })}
        placeholder="Enter Task Name"
        style={[styles?.textInput]}
      />
      {/* after enter the task name press this button to the task is added to the taskList.
      if the task name is empty the button is disabled */}
      <View style={[styles?.button]}>
        <Button
          title="Add Task"
          onPress={handleAddTask}
          disabled={!taskDetails?.title.trim()}
        />
      </View>
      {/* FlatList : is used to display the each tasks one by one */}
      <FlatList
        data={taskList || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.id}
        style={[styles?.flatlist]}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: "90%",
    alignSelf: "center",
    height: screenHeigth * 0.06,
    paddingHorizontal: screenWidth * 0.05,
  },
  button: {
    marginVertical: screenHeigth * 0.05,
    width: "50%",
    alignSelf: "center",
  },
  flatlist: {
    width: "90%",
    alignSelf: "center",
    marginBottom: screenHeigth * 0.16,
  },
  flatlistContainer: {
    marginVertical: screenHeigth * 0.005,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: screenHeigth * 0.02,
    paddingHorizontal: screenWidth * 0.018,
    width: "75%",
  },
  container: {
    marginVertical: screenHeigth * 0.05,
  },
});
