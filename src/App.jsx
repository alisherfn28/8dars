import React, { useEffect, useState } from "react";
import Kitob from "./components/vazifa2";
import axios from "axios";
import Search from "./components/vazifa3";

function user() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function validate() {
    if (!name) {
      alert("Iltimos ismni kiriting!!");
      return false;
    }
    if (!email) {
      alert("Iltimos email kiriting!!");
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
      name,
      email,
    };
    setData([...data, newData]);

    setName("");
    setEmail("");
  }

  return (
    <div>
      <div className="container box">
        <h1 className="title">User qo'shish</h1>
        <form onSubmit={handleAdd} className="form">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            type="text"
            placeholder="Ismingizni kiritng.."
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            placeholder="Enter your email.."
          />
          <button className="button" type="submit">
            Add User
          </button>
        </form>
        <div className="user-list">
          {data.map((value, index) => (
            <div key={index} className="user-card">
              <h3>
                <strong>Name:</strong> {value.name}
              </h3>
              <p>
                <strong>Email:</strong> {value.email}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="container box">
        <Kitob />
      </div>
      <div className="container box">
        <Search />
      </div>
    </div>
  );
}

export default user;
