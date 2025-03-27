import React, { useState, useRef } from "react";
import "../../Styles/Admin/AdminAddingBooks.css";
import axios from "axios";

const AdminAddingBooks = () => {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [category, setCategory] = useState("Student");

  const [bookImage, setBookImage] = useState(null);
  const [bookFileData, setBookFileData] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  // Refs to reset file input
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFilesChange = (e) => {
    setErrorMessage("");
    setSuccess("");
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      setBookFile(file);
      setBookFileData(file.name);
    } else if (file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setBookImage(reader.result);
    }
  };

  const handleReset = () => {
    setBookName("");
    setAuthorName("");
    setDescription("");
    setBookImage(null);
    setImageFile(null);
    setBookFile(null);
    setBookFileData(null);
    setCategory("Student");
    setErrorMessage("");
    setSuccess("");
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submit = async () => {
    if (!bookName || !authorName || !description || !imageFile || !bookFile) {
      setErrorMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("bookName", bookName);
    formData.append("authorName", authorName);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("imageFile", imageFile);
    formData.append("bookFile", bookFile);

    try {
      const response = await axios.post(
        "http://localhost:5001/addBook",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(response.data.message);
      setErrorMessage('')
    } catch (err) {
      setSuccess('')
      setErrorMessage(err.response?.data?.message || "Failed to add book!");
    }
  };
  return (

    <>

      <div className="admin-dashboard-container">
        <div className="admin-dashboard-topbar">
          <h4 className="admin-dashboard-topbar-h4">ADD BOOKS</h4>
        </div>
      </div>
      <div className="adminAddPageContainer border mt-5">
        {success && <div className="alert alert-success">{success}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <div className="d-flex w-100 flex-column flex-md-row">
          <div className="adminAddPageImageWrapper my-md-auto">
            {bookImage ? (
              <img src={bookImage} alt="Book" className="adminAddPageBookImage" />
            ) : (
              <label className="adminAddPageImageUploadLabel">
                <input
                  type="file"
                  className="adminAddPageImageInput"
                  accept="image/*"
                  onChange={handleFilesChange}
                  ref={imageInputRef}
                />
                <span className="adminAddPagePlusIcon">+</span>
              </label>
            )}
          </div>

          <div className="d-flex flex-column md-ps-5 flex-fill ps-sm-0 ps-md-5 my-md-auto">
            <input
              type="text"
              className="adminAddPageInputBox mb-3"
              value={bookName}
              placeholder="Book Name"
              onChange={(e) => {
                setBookName(e.target.value);
                setErrorMessage("");
                setSuccess("");
              }}
            />
            <input
              type="text"
              className="adminAddPageInputBox"
              value={authorName}
              placeholder="Author Name"
              onChange={(e) => {
                setAuthorName(e.target.value);
                setErrorMessage("");
                setSuccess("");
              }}
            />
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
                setSuccess("");
              }}
            />
          </div>

          <div className="adminAddPageInputField">
            <label className="adminAddPageLabel">Upload Book File</label>
            <input
              type="file"
              className="adminAddPageFileInput"
              accept=".pdf"
              onChange={handleFilesChange}
              ref={fileInputRef}
            />
            {bookFileData && (
              <span className="adminAddPageFileName">{bookFileData.name}</span>
            )}
          </div>

          <div className="adminPageCategory d-flex my-3">
            <select
              name="category"
              id="category"
              className="w-50 ms-auto p-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
            </select>
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
    </>


  );
};

export default AdminAddingBooks;
