import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

const Todo = () => {
  const [list, setList] = useState([]);
  const [progress, setProgress] = useState(0);
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
        updateProgress();
      })
      .catch(error => console.error(error));
  }

  const removeTodo = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => {
        setList(list.filter(item => item.task_id !== id));
        updateProgress();
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
      updateProgress();
    }
  };

  const toggleItemCompletion = (key) => {
    const updatedList = list.map((item) =>
    item.task_id === key ? { ...item, status: !item.status } : item

    );
    setList(updatedList);
    updateProgress();
    toggleTodo(key);
  };

  const updateProgress = () => {
    const totalItems = list.length;
    const completedItems = list.filter(item => item.status).length;

    const newProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    setProgress(newProgress);
  };

  const getProgressMessage = () => {
    if (progress === 100) {
      return "Congratulations! You've completed all tasks!";
    } else if (progress >= 90) {
      return "Amazing! You're almost done champion!";
    } else if (progress >= 70) {
      return "You've made significant progress. Keep going!";
    } else if (progress >= 50) {
      return "You're halfway there! Keep forging ahead.";
    } else if (progress >= 1) {
      return "Keep going! You've got this!";
    } else return "Task not found";
  };

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder",
        }}
      >
        TODO LIST
      </Row>

      <hr />
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="add item . . . "
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
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <p>Progress: {progress.toFixed(2)}%</p>
          <p>{getProgressMessage()}</p>
          <ListGroup>
            {list.map((item, index) => (
              <div key={index}>
                <ListGroup.Item
                  variant={item.status ? "success" : "dark"}
                  action
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={item.status}
                      onChange={() => toggleItemCompletion(item.task_id)}
                    />
                    <span style={{ marginLeft: "10px" }}>{item.task_title}</span>
                  </div>
                  <span>
                    <Button
                      style={{ marginRight: "10px" }}
                      variant="light"
                      onClick={() => deleteItem(item.task_id)}
                    >
                      Delete
                    </Button>
                    <Button variant="light" onClick={() => editItem(index)}>
                      Edit
                    </Button>
                  </span>
                </ListGroup.Item>
              </div>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Todo;
