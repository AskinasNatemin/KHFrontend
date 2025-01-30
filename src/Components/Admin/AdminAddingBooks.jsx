import React from "react";
import "../../Styles/AdminAddingBooks.css";
export const AdminAddingBooks = () => {
  return (
    <div className="AdminAddingBookscontainer">
      <h2 className="addbookshead mt-5">Add Books</h2>
      <div className="addbookinputs">
        <input className="form-control" type="text" placeholder="Book Name" />

        <input className="form-control" type="text"  placeholder="Author Name"/>

        <input className="form-control" type="text" placeholder="Book Category" />
      </div>
      <div className="addbookfile">
    <input className="form-control" type="file" />
      </div>
      <div className="addbookbut">
       <button className="resetbut btn btn-secondary">Reset</button> <button className="savebut btn btn-primary">Save</button>
      </div>
    </div>
  );
};
