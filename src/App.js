import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Button, TextField } from '@mui/material';
import { Routes, Route, Link, Router, useNavigate, useParams } from "react-router-dom";
import { Form, Checkbox, Table } from 'semantic-ui-react'
import axios from 'axios';
const API_URL = "https://638cafbcd2fc4a058a5d556b.mockapi.io/user";
function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
            <Button color="inherit" onClick={() => navigate("/create")} >Create</Button>
            <Button color="inherit" onClick={() => navigate("/read")}>Read</Button>
            <Button color="inherit" onClick={() => navigate("/update")}>Update</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <h1>CRUD OPERATION</h1>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read" element={<Read />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </div>
  );
}
function Profile() {

  return (
    <div>
      <h1>Welcome to the Home Page⭐😊❤️🙋</h1>
    </div>
  )
}

function Create() {
  const navigate = useNavigate();
  // const API_URL = "https://638cafbcd2fc4a058a5d556b.mockapi.io/user";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checked, setChecked] = useState(false);
  const postData = async () => {
    await axios.post(API_URL, {
      firstName,
      lastName,
      checked
    })
    navigate("/read")
  }

  return (
    <Form>
      <Form.Field>
        <label >First name</label>
        <input className='input' value={firstName}
          onChange={event => setFirstName(event.target.value)}
          placeholder='Enter First Name' />
      </Form.Field><br></br>
      <Form.Field>
        <label>Last name</label>
        <input className='input' value={lastName}
          onChange={event => setLastName(event.target.value)}
          placeholder='Enter Last Name' />
      </Form.Field><br></br>
      <Form.Field>
        <Checkbox value={checked}
          onChange={() => setChecked(!checked)}
          label="Agree terms &conditions" />
      </Form.Field>
      <br />
      <Button onClick={postData}>Submit</Button>
    </Form>

  )
}

// In update page you want to change the checbox click in tik other wise don't tik.
function Update() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checked, setChecked] = useState(false);
  const [id, setId] = useState("");

  const updateUser = async () => {
    await axios.put(API_URL + "/" + id, {
      firstName, lastName, checked
    })
    navigate("/read")
  }
  useEffect(() => {
    setId(localStorage.getItem("id"))
    setFirstName(localStorage.getItem("firstName"))
    setLastName(localStorage.getItem("lastName"))
    setChecked(localStorage.getItem("checked"))
  }, [])
  return (
    <Form>
      <Form.Field>
        <label>First name</label>
        <input value={firstName}
          onChange={event => setFirstName(event.target.value)}
          placeholder='Enter First Name' />
      </Form.Field><br></br>
      <Form.Field>
        <label>Last name</label>
        <input value={lastName}
          onChange={event => setLastName(event.target.value)}
          placeholder='Enter Last Name' />
      </Form.Field><br></br>
      <Form.Field>
        <Checkbox value={checked}
          onChange={() => setChecked(!checked)}
          label="Agree terms &conditions" />
      </Form.Field>
      <br />
      <Button onClick={updateUser}>Submit</Button>
    </Form>
  )
}
function Read() {
  const navigate = useNavigate();
  const [apiData, setAPIData] = useState([]);
  const updateUser = ({ firstName, lastName, checked, id }) => {
    localStorage.setItem("id", id);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("checked", checked);
    navigate("/update")
  }
  const deleteUser = async (id) => {
    await axios.delete(API_URL + "/" + id)
    callGetAPI();
  }
  const callGetAPI = async () => {
    const resp = await axios.get(API_URL);
    setAPIData(resp.data);
  }
  useEffect(() => {
    callGetAPI();
  }, []);
  return (
    <div className='read'>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Checked</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>

          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            apiData.map(data => (

              <Table.Row key={data.id}>
                <Table.Cell>{data.firstName}</Table.Cell>
                <Table.Cell>{data.lastName}</Table.Cell>
                <Table.Cell>{data.checked ? "Checked" : "Not Checked"}</Table.Cell>
                <Table.Cell><Button onClick={() =>
                  deleteUser(data.id)}>Delete</Button></Table.Cell>
                <Table.Cell><Button onClick={() =>
                  updateUser(data)}>Update</Button></Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </div>
  )
}

export default App;
