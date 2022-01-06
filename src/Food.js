import React, { useState } from "react";
import axios from "axios";
import food from "../src/food.jpg";
import kitchen from "./kitchen.jpg";
import "./Food.css";

function Food() {
  const [query, setQuery] = useState("");
  const [rcp, setRcp] = useState([]);
  const [list, setList] = useState("alcohol-free");
  const YOUR_APP_ID = "587d81f4";
  const YOUR_APP_KEY = "9b329ec03f4d80c947036cccb5a5143c";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${list}`;

  async function getRecipe() {
    const result = await axios.get(url);
    setRcp(result.data.hits);
    console.log(result.data);
  }

  const submitForm = (e) => {
    e.preventDefault();
    getRecipe();
  };
  return (
    <div className="App">
      <div className="head">
        <nav className="nav">
          <div className="logo">
            {/* <img src={kitchen} alt="" /> */}
            <img src={food} alt="" className="img-1" />
          </div>
          <ul className="ul">
            <li>
              <a href="#">Sponsors</a>
            </li>
            <li>
              <a href="#">Customers</a>
            </li>
            <li>
              <a href="#">Meals</a>
            </li>
            <li>
              <a href="#">contact</a>
            </li>
          </ul>

          <form className="form-1" onSubmit={submitForm}>
            <input
              type="text"
              placeholder="Enter name of product"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="button-1">
              Search
            </button>
          </form>
        </nav>

        <div>
          <div className="text">
            <h1>
              <span className="span-h1">Fastest delivery</span> on earth
            </h1>
            <p>
              Feel the <span>Taste</span>
            </p>
          </div>

          <div className="print">
            {rcp.map((item, index) => {
              return (
                <div key={index} className="product">
                  <img src={item["recipe"]["image"]} alt="" />
                  <p>
                    <span>Name: </span>
                    {item["recipe"]["label"]}
                  </p>
                  <p>
                    <span> Number of calories: </span>
                    {item["recipe"]["calories"].toFixed(2)}
                  </p>
                  <div className="buttons">
                    <p>
                      {
                        <a className="a-2" href={item["recipe"]["url"]}>
                          Read Recipe
                        </a>
                      }
                    </p>
                    <button className="button-2">Order</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Food;
