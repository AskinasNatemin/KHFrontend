import React, { useState } from 'react'
import "../../Styles/Admin/AdminEditBook.css"
import axios from 'axios';

const AdminEditBook = ({ book, onClose, onUpdate }) => {  
  const categories = ["Student","Staff"];
  const [formData, setFormData] = useState({
    authorName: book.authorName || '',
    bookName: book.bookName || '',
    description: book.description || '',
    category: book.category || 'Student',
    image: null,
    pdf: null,
    imagePreview: book.imagePath ? `http://localhost:5001/${book.imagePath}` : "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData({ ...formData, [e.target.name]: file, imagePreview: reader.result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      const updatedData = { ...formData, [name]: file };

      // Show preview if it's an image
      if (name === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          updatedData.imagePreview = reader.result;
          setFormData(updatedData);
        };
        reader.readAsDataURL(file);
      } else {
        setFormData(updatedData);
      }
    }
  };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onUpdate(formData);
  // };

  // const editBook = () => {
  //   axios.post(`http://localhost:5001/editBook/${book._id}`,formData)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }
  
  const editBook = () => {
    const data = new FormData();
    data.append("authorName", formData.authorName);
    data.append("bookName", formData.bookName);
    data.append("description", formData.description);
    data.append("category", formData.category);

    if (formData.image) {
      data.append('imageFile', formData.image); 
    }
    
    if (formData.pdf) {
      data.append('bookFile', formData.pdf); 
    }
    
  
    axios
      .post(`http://localhost:5001/editBook/${book._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("Book updated:", res.data);
        onUpdate(res.data.updatedBook);
        onClose();
      })
      .catch((err) => {
        console.error("Update error:", err);
      });
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
            <form  onSubmit={(e) => e.preventDefault()}className="book-form">
              {/* Name Field */}
              <label className='admin-editbook-label'>
                {/* Your Name: */}
                <input className='admin-editbook-input' type="text" name="authorName" placeholder='AUTHOR NAME' value={formData.authorName} onChange={handleChange} required />
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
              <button className='admin-editbook-button' onClick={editBook}>UPADTE</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminEditBook