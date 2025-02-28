import React, { useState } from "react";
import "../../Styles/Admin/AdminAddingBooks.css";
import axios from "axios";
import convertToBase64 from "../Utills/Admin/convertToBase64";

const AdminAddingBooks = () => {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [category, setCategory] = useState("Student");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const data = {
    bookName,
    authorName,
    description,
    image,
    bookFile,
    category,
  };

  const handleReset = () => {
    setBookName("");
    setAuthorName("");
    setDescription("");
    setImage(null);
    setBookFile(null);
    setCategory("");
    setErrorMessage("");
  };

  const handleImageChange = async (e) => {
    setErrorMessage("");
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  const handleFileChange = async (e) => {
    setErrorMessage("");
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setBookFile(base64);
  };

  const submit = () => {
    axios
      .post("http://localhost:5001/AdminAddBooks", data)
      .then((res) => {
        console.log(res.data);
        setSuccess(res.data.message);
        setBookName("");
        setAuthorName("");
        setDescription("");
        setImage(null);
        setBookFile(null);
        setCategory("");
        setErrorMessage("");
        setTimeout(() => {
          setSuccess("");
        }, 700);
      })
      .catch((err) => {
        console.log(err.response.data);
        setSuccess("");
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div className="adminAddPageContainer border mt-5">
      <>
        {success && <div className="alert alert-success">{success}</div>}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
      </>
      <div className="d-flex w-100 flex-column flex-md-row">
        <div className="adminAddPageImageWrapper my-md-auto">
          {image ? (
            <img src={image} alt="Book" className="adminAddPageBookImage" />
          ) : (
            <label className="adminAddPageImageUploadLabel">
              <input
                type="file"
                className="adminAddPageImageInput"
                accept="image/*"
                onChange={handleImageChange}
              />
              <span className="adminAddPagePlusIcon">+</span>
            </label>
          )}
        </div>

        <div className="d-flex flex-column md-ps-5 flex-fill ps-sm-0 ps-md-5 my-md-auto">
          <div className="adminAddPageInputField">
            <input
              type="text"
              className="adminAddPageInputBox"
              value={bookName}
              placeholder="Book Name"
              onChange={(e) => {
                setBookName(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>

          <div>
            <input
              type="text"
              className="adminAddPageInputBox"
              value={authorName}
              placeholder="Author Name"
              onChange={(e) => {
                setAuthorName(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>
        </div>
      </div>

      <div className="adminAddPageFormFields">
        <div className="adminAddPageInputField mt-2">
          <label className="adminAddPageLabel">Description</label>
          <textarea
            className="adminAddPageInputBox adminAddPageDescriptionBox"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrorMessage("");
            }}
          />
        </div>

        <div className="adminAddPageInputField">
          <label className="adminAddPageLabel">Upload Book File</label>
          <input
            type="file"
            className="adminAddPageFileInput"
            accept=".pdf, .epub, .mobi"
            onChange={handleFileChange}
            placeholder="Upload Book File"
          />
          {bookFile && (
            <span className="adminAddPageFileName">{bookFile.name}</span>
          )}
        </div>

        <div className="adminPageCategory d-flex my-3">
          <select
            name="category"
            id="category"
            className="w-50 ms-auto p-1"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setErrorMessage("");
            }}
            required
          >
            <option value="Student">Student</option>
            <option value="Staff">Staff</option>
        </div>

        <div className="bookButtons d-flex flex-column flex-md-row gap-3">
          <button className="adminAddPageSubmitButton" onClick={submit}>
            Add Book
          </button>
          <button onClick={handleReset} className="adminAddPageResetButton">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddingBooks;
