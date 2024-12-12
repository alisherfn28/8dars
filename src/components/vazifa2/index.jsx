import React, { useState } from "react";
import "./index.css";

function Kitob() {
  const [kitob, setKitob] = useState("");
  const [muallif, setMuallif] = useState("");
  const [data, setData] = useState([]);

  function validate() {
    if (!kitob) {
      alert("Iltimos kitobni nomini kiriting!!");
      return false;
    }
    if (!muallif) {
      alert("Iltimos kitobning muallifini kiriting!!");
      return false;
    }
    return true;
  }

  function handleAdd(event) {
    event.preventDefault();
    let isValid = validate();
    if (!isValid) {
      return;
    }
    const newData = {
      id: Date.now(),
      kitob,
      muallif,
      isRead: false,
    };
    setData([...data, newData]);

    setKitob("");
    setMuallif("");
  }

  function handleChange(cardId) {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === cardId ? { ...item, isRead: !item.isRead } : item
      )
    );
  }

  return (
    <div className="container">
      <h1 className="title">Kitob qo'shish</h1>
      <form onSubmit={handleAdd} className="form">
        <input
          value={kitob}
          onChange={(e) => setKitob(e.target.value)}
          className="input"
          type="text"
          placeholder="Kitob nomini kiriting.."
        />
        <input
          value={muallif}
          onChange={(e) => setMuallif(e.target.value)}
          className="input"
          type="text"
          placeholder="Muallif ismi kiriting.."
        />
        <button className="button" type="submit">
          Add Book
        </button>
      </form>
      <div className="books-container">
        {data.map((value, index) => (
          <div key={index} className="card">
            <h3>
              <strong>Kitob:</strong> {value.kitob}
            </h3>
            <p>
              <strong>Muallif:</strong> {value.muallif}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kitob;
