import React, { useState } from 'react'
import "../../Styles/Admin/AdminEditBook.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AdminEditBook = ({ book, onClose, onUpdate }) => {

  const { id: bookId } = useParams();
  const categories = ["STUDENT","STAFF"];
  
  const [formData, setFormData] = useState({
    name: book.authorName || "",
    bookName: book.bookName || "",
    description: book.description || "",
    category: book.category || "STUDENT",
    image: null,
    pdf: null,
    imagePreview: book.imagePath ? `http://localhost:5001/${book.imagePath}` : "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [e.target.name]: file, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!book || !book._id) {
    console.error("Error: Book ID is missing");
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("bookName", formData.bookName);
  formDataToSend.append("description", formData.description);
  formDataToSend.append("category", formData.category);

  if (formData.image) {
    formDataToSend.append("imageFile", formData.image); // Ensure key matches backend
  }
  if (formData.pdf) {
    formDataToSend.append("bookFile", formData.pdf); // Ensure key matches backend
  }

  try {
    const response = await axios.put(
      `http://localhost:5001/editBook/${book._id}`,
      formDataToSend,
      {
        headers: { "Content-Type": "multipart/form-data" }, // Important header
      }
    );

    console.log("Book updated successfully:", response.data);
    onUpdate(response.data);
  } catch (error) {
    console.error("Error updating book:", error);
  }
};

  return (
    <div>
      <div className="admin-dashboard-container" >
        <div className="admin-dashboard-topbar">
          <h4 className="admin-dashboard-topbar-h4">ALL STAFF LISTS</h4>
        </div>
      </div>
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>✖</button>
          <div className="form-container">
            <h2 className='admin-editbook-h2'>UPDATING BOOKS</h2>
            <form onSubmit={handleSubmit} className="book-form">
              {/* Name Field */}
              <label className='admin-editbook-label'>
                {/* Your Name: */}
                <input className='admin-editbook-input' type="text" name="name" placeholder='AUTHOR NAME' value={formData.name} onChange={handleChange} required />
              </label>

              {/* Book Name Field */}
              <label className='admin-editbook-label'>
                {/* Book Name: */}
                <input className='admin-editbook-input' type="text" name="bookName" placeholder='BOOK NAME' value={formData.bookName} onChange={handleChange} required />
              </label>

              {/* Image Upload */}
              <label className='admin-editbook-label'>
                Upload Image:
                <input className='admin-editbook-input' type="file" name="image" accept="image/*" placeholder='UPLOAD IMAGE' onChange={handleFileChange}  />
              </label>

              {/* Image Preview */}
              {formData.imagePreview && (
                <div className="image-preview">
                  <img className='admin-editbook-img' src={formData.imagePreview} alt="Preview" />
                </div>
              )}

              {/* PDF Upload */}
              <label className='admin-editbook-label'>
                Upload PDF:
                <input className='admin-editbook-input' type="file" name="pdf"  accept="application/pdf" onChange={handleFileChange} />
              </label>

              {/* Description Field */}
              <label className='admin-editbook-label'>
                Description:
                <textarea className='admin-editbook-textarea' name="description" value={formData.description} onChange={handleChange} required />
              </label>

              {/* Category Dropdown */}
              <label className='admin-editbook-label'>
                Category:
                <select className='admin-editbook-select' name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>

              {/* Submit Button */}
              <button className='admin-editbook-button' type="submit">UPADTE</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminEditBook