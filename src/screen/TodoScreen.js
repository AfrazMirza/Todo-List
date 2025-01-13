import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import { useState } from "react";
// import { IconButton} from '@iconify/react';
import Icon from "react-native-vector-icons/MaterialIcons";
//
import React from "react";
import Fallback from "../components/Fallback";

const TodoScreen = () => {
  // initialise local states
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null)

  // Handle Add Todo
  const handleAddTodo = () => {
    //structure of a sinle todo item
    // {
    //   id:
    //   title:
    // }

    if (todo === ""){
      return; // early return
    }
    setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
    setTodo("");
  };

  // Handle Delete
  const handelDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    // in this the losgic is performe that when the user is clicked on the delete button which they want to delete they can be deleted from that list because of this function
    setTodoList(updatedTodoList);
  };

  // handle Edit Todo

  const handleEditTodo = (todo) => {

    setEditedTodo(todo);
    setTodo(todo.title);
  }

  // handle Update 
  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map((item)=>{

     if (item.id === editedTodo.id) {
      return {...item, title: todo}
     }

     return item
    }); setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo("");

  };
  // Render Todo
  const renderTodos = ({ item}) => {
    return (
      <View style={styles.data}>
        <Text style={styles.dataText}>{item.title}</Text>
        <View style={styles.actionIcons}>
        <Icon name="edit" size={20} color="#fff" style={styles.iconButton} onPress={() => handleEditTodo(item)} />
        <Icon
          name="delete"
          size={20}
          color="#fff"
          style={styles.iconButton}
          onPress={() => handelDeleteTodo(item.id)}
        />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />
      {/* {
        editedTodo ? <TouchableOpacity style={styles.button} onPress={() => handleUpdateTodo()}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity> : (<TouchableOpacity style={styles.button} onPress={() => handleAddTodo()}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>)
      } */}
       <TouchableOpacity
        style={styles.button}
        onPress={editedTodo ? handleUpdateTodo : handleAddTodo}
      >
        <Text style={styles.buttonText}>{editedTodo ? "Save" : "Add Task"}</Text>
      </TouchableOpacity>

      {/* Scrollable area for the todo list */}
      <ScrollView style={styles.scrollArea}>
      {/* render TODo list */}
      {todoList.length > 0 ? (
      <FlatList data={todoList.reverse()} renderItem={renderTodos} 
      keyExtractor={(item) => item.id}
      />
    ) : (
      <Fallback />
    )}
  </ScrollView>
      {/* // { */}
      {/* //   todoList.length <= 0  && <Fallback/>
      // } */}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 30,
  },
  heading: {
    color: "#495057",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign:"center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#495057",
    borderRadius: 27,
    padding: 12,
    fontSIze: 16,
    backgroundColor: "#ced4da",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#1e90ff",
    borderWidth: 1,
    borderRadius: 27,
    borderColor: "#388ef8",
    padding: 11,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#495057",
    fontWeight: "bold",
    // alignItems: "center",
    fontSize: 18,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: "#1e90ff",
    borderRadius: 27,
    padding: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {width:0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // elvation: 
  },
  dataText: {
    flex: 1,
    color: "#495057",
    fontStyle: 20,
    fontWeight: "800",
    paddingHorizontal: 6,
  },
  iconButton: {
    margin: 10,
    color: "#495057",
  },
  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
