import { useEffect, useState } from "react";
import axios from "axios";
import Board from "./Components/Board";
import "./Components/style.scss";

function App() {
  //hook to set data results from api
  const [data, setData] = useState();

  //useEffect to pull data in from api
  useEffect(() => {
    const dataUrl =
      "https://gist.githubusercontent.com/mikekwright/691f1eb79b506bc278c289fac0c7176f/raw/d8cf60a6ca110c01bfba596bc534187c4f64a529/data.json";
    const makeApiCall = async () => {
      try {
        const response = await axios(dataUrl);
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    makeApiCall();
  }, []);

  return (
    <div className="App">
      <header>
        <img
          src="https://images.squarespace-cdn.com/content/v1/5a7ccb200100273f20dded55/1579814043153-QLBTLUNASY4JNFJPFNNG/Dwelo-Logo-Full-Orange.png?format=1500w"
          alt="logo"
        />
        <h1>Device Tracking</h1>
      </header>
      {data ? <Board data={data} /> : "loading"}
    </div>
  );
}

export default App;
