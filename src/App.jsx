import React, { useEffect, useState } from "react";
import "./App.css";
import img from "./assets/globe.png";
import axios from "axios";
function App() {
  const [IP, setIP] = useState("");
  const [data, setData] = useState({"API Credit Goes to":"<a target='_blank' href='https://geolocation-db.com/'>geolocation-db.com</a>"});
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    document.addEventListener("keydown",(e)=>{
      console.log(e)
      if (e.key=="Enter"){
        getInfo()
      }
    })
  },[])
  function showTable() {
    let table = document.getElementById("table")
    table.innerHTML = ""
    let cols1 = Object.keys(data);
    cols1.forEach((i) => {
      table.innerHTML += `<tr><td>${i}</td><td>${data[i]}</td></tr>`;
    });
  }
  async function pasteText() {
    await navigator.clipboard.readText().then((res) => setIP(res));
  }
  const options = {
    method: "GET",
    url: `https://geolocation-db.com/json/${
      import.meta.env.VITE_API_KEY
    }/${IP}`,
  };
  async function getInfo() {
    setLoading(true)
    try {
      await axios
        .request(options)
        .then((response) => setData(response.data))
        setLoading(false)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    showTable()
  },[data])
  return (
    <div className="container">
      <div className="wrapper">
        <img src={img} alt="" />
        <div className="input">
          <input
            value={IP}
            onChange={(e) => {
              setIP(e.target.value);
            }}
            placeholder="Enter Ipv4 or Ipv6"
            type="text"
            name="ipAddress"
            id="ipAddress"
          />
          <button onClick={pasteText}>Paste</button>
        </div>
        <button
          onClick={() => {
            getInfo();
          }}
        >
         {loading?"Loading...":"Get Info"}
        </button>
        <p>
          *Leave the input Field Empty to get info about your own IP Address
        </p>
        <table >
          <tbody id="table">

          </tbody>
        </table>
        <p>Made with Love By <a target="_blank" href="https://github.com/Sujas-Aggarwal">Sujas Aggarwal</a></p>
      </div>
    </div>
  );
}

export default App;
