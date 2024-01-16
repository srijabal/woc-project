import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import Navbar from './Navbar';
import { FaTrash, FaPen } from "react-icons/fa";

const Todo = () => {
  const [list, setList] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => setList(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTodo = (task_title) => {
    axios.post('http://localhost:3001/tasks', { task_title, status: false })
      .then(response => {
        setList([...list, response.data]);
      })
      .catch(error => console.error(error));
  }

  const removeTodo = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => {
        setList(list.filter(item => item.task_id !== id));
      })
      .catch(error => console.error(error));
  }
  
const toggleTodo = (key) => {
  axios.post('http://localhost:3001/updatetasks', { key})
    .then(response => {
      
    })
    .catch(error => console.error(error));
}

  const updateInput = (value) => {
    setUserInput(value);
  };

  const addItem = () => {
    if (userInput !== "") {
      const newItem = {
        task_id: Math.random(),
        task_title: userInput,
        status: false,
      };

      setList((prevList) => [...prevList, newItem]);
      setUserInput("");
      addTodo(newItem.task_title);
    }
  };

  const deleteItem = (id) => {
    setList(list.filter(item => item.task_id !== id));
    removeTodo(id);
  };

  const editItem = (index) => {
    const editedTodo = prompt("Edit the todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      const updatedTodos = [...list];
      updatedTodos[index].value = editedTodo;
      setList(updatedTodos);
    }
  };

  const toggleItemCompletion = (key) => {
    console.log(list);
    const updatedList = list.map((item) =>
    item.task_id === key ? { ...item, status: !item.status } : item);
    setList(updatedList);
    toggleTodo(key);
  };

  return (
    <>
    <Navbar/>
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "3rem",
      fontWeight: "bolder",
      marginTop: "2rem",
    }}>Todo List</div>
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "2rem",
    }}>
      <Container>
        <Row>
            <InputGroup className="mb-3 flex">
              <FormControl
                placeholder="Add item"
                size="lg"
                value={userInput}
                onChange={(e) => updateInput(e.target.value)}
                aria-label="add something"
                aria-describedby="basic-addon2"
              />
              <InputGroup>
                <Button variant="dark" className="mt-2" onClick={addItem}>
                  ADD
                </Button>
              </InputGroup>
            </InputGroup>
        </Row>
        <Row>
          <Col xs={12} md={8}>
            <ListGroup>
              {list.map((item, index) => (
                <div key={index}>
                  <ListGroup.Item
                    variant={item.status ? "success" : "dark"}
                    action
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "center",
                      itemAlign: "center",
                      gap: "10px",
                      width: "100%",
                    }}
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={item.status}
                        onChange={() => toggleItemCompletion(item.task_id)}
                      />
                    </div>
                    <div>
                      {item.task_title}
                    </div>
                    <div style={{
                      display: "flex",
                      itemAlign: "center",
                      gap: "10px",
                      width: "100%",
                    }}>
                      <FaTrash onClick={()=>deleteItem(item.task_id)}/>
                      <FaPen onClick={()=>editItem(index)}/>
                    </div>
                  </ListGroup.Item>
                </div>
              ))}
            </ListGroup>
          </Col>
        </Row>
        </Container>
    </div>
    </>
  );
};

export default Todo;
