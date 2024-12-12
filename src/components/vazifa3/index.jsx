import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/")
      .then((response) => {
        if (response.status === 200 && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Unexpected API response format");
          setData([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filterEl = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search">
      <div className="container search-container">
        <h1>Qidiruv bo'limi</h1>
        <input
          id="searchInput"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search ?"
        />
        <div className="wr-cont">
          {loading ? (
            <p>Loading...</p>
          ) : filterEl.length > 0 ? (
            filterEl.map((item) => (
              <div className="wrOpen" key={item.id}>
                <div>{item.title}</div>
                <hr />
              </div>
            ))
          ) : (
            <p>Not found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
