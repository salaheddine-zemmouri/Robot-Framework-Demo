import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import {
  Input,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button,
} from "reactstrap";

const App = () => {
  const [books, setBooks] = useState([]);
  const [newBookData, setNewBookData] = useState({
    title: "",
    author: "",
    isbn: "",
  });
  const [newBookModal, setNewBookModal] = useState(false);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("books") || "[]");
    setBooks(data);
    console.log(books);
  }, []);

  const toggleNewBookModal = () => setNewBookModal(!newBookModal);

  const addBook = () => {
    const allBooks = JSON.parse(localStorage.getItem("books") || "[]");
    allBooks.push(newBookData);
    localStorage.setItem("books", JSON.stringify(allBooks));
    setBooks([...books, newBookData]);
    setNewBookData({
      title: "",
      author: "",
      isbn: "",
    });
    toggleNewBookModal();
  };

  return (
    <div className="App container">
      <h1>Books App</h1>

      <Button
        className="my-3"
        color="primary"
        id="btn-addBook"
        onClick={() => toggleNewBookModal()}
      >
        Add Book
      </Button>

      <Modal isOpen={newBookModal} toggle={toggleNewBookModal}>
        <ModalHeader toggle={toggleNewBookModal}>Add a new book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              value={newBookData.title}
              onChange={(e) => {
                let data = e.target.value;
                setNewBookData({ ...newBookData, title: data });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="author">Author</Label>
            <Input
              id="author"
              value={newBookData.author}
              onChange={(e) => {
                let data = e.target.value;
                setNewBookData({ ...newBookData, author: data });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="isbn">isbn</Label>
            <Input
              id="isbn"
              value={newBookData.isbn}
              onChange={(e) => {
                let data = e.target.value;
                setNewBookData({ ...newBookData, isbn: data });
              }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addBook} id="btn-submitAddBook">
            Add Book
          </Button>{" "}
          <Button color="secondary" onClick={toggleNewBookModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => {
            return (
              <tr>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>
                  <Button color="success" size="sm" className="mr-2">
                    Edit
                  </Button>
                  <Button color="danger" size="sm">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default App;
