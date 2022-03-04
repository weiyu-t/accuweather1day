import React, { useState } from "react";
import { Input } from "@material-ui/core";
import Errmsg from "./error";
import Header from "./Header";
import "./styles.css";

export default function Homepage() {
  const apikey = "GnBzQ3GZEr7ASo6FHHtnBalDjXQwEr76";
  const rooturl = "https://dataservice.accuweather.com";

  const [inp, setInp] = useState("");
  const [wdata, setWdata] = useState();
  const [err, setErr] = useState("");
  const [cname, setCname] = useState("");

  let inpHandler = (e) => {
    setInp(e.target.value);
  };

  const sbmHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${rooturl}/locations/v1/cities/search?apikey=${apikey}&q=${inp}`
      );
      const data = await response.json();

      const cityKey = data[0].Key;
      setCname(data[0].EnglishName);

      const wres = await fetch(
        `${rooturl}/forecasts/v1/daily/1day/${cityKey}?apikey=${apikey}`
      );
      const details = await wres.json();
      setWdata(details);
      setErr(null);
    } catch (error) {
      setErr(error.message);
      setWdata(null);
    }
  };

  return (
    <div className="App">
      <Header className="heading" />
      <div className="input_container">
        <Input value={inp} onChange={inpHandler} />
        <button type="submit" className="btn" onClick={sbmHandler}>
          click to see!
        </button>
      </div>

      {err && <Errmsg err="Not Found" className="error_containter" />}

      {wdata && (
        <div className="main_container">
          <div className="card">
            <h1>{cname}</h1>
            <div className="temp_box">
              <div className="temp_container">
                <p className="temp_title">Min: </p>
                <h2 className="temp_value">
                  {wdata?.DailyForecasts[0]?.Temperature.Minimum.Value}
                </h2>
                <p className="temp_unit">
                  °{wdata?.DailyForecasts[0]?.Temperature.Minimum.Unit}
                </p>
              </div>
              <div className="temp_container">
                <p className="temp_title">Max:</p>
                <h2 className="temp_value">
                  {wdata?.DailyForecasts[0]?.Temperature.Maximum.Value}
                </h2>
                <p className="temp_unit">
                  °{wdata?.DailyForecasts[0]?.Temperature.Minimum.Unit}
                </p>
              </div>
            </div>

            <div className="time_card">
              <h5>Day:</h5>
              <div className="image_container">
                <img
                  className="temp_image"
                  src={
                    "https://developer.accuweather.com/sites/default/files/" +
                    (wdata.DailyForecasts[0].Day.Icon < 9 ? "0" : "") +
                    wdata.DailyForecasts[0].Day.Icon +
                    "-s.png"
                  }
                  alt=""
                />
                <p className="temp_phrase">
                  {wdata.DailyForecasts[0].Day.IconPhrase}
                </p>
              </div>

              <h5>Night:</h5>
              <div className="image_container">
                <img
                  className="temp_image"
                  src={
                    "https://developer.accuweather.com/sites/default/files/" +
                    (wdata.DailyForecasts[0].Night.Icon < 9 ? "0" : "") +
                    wdata.DailyForecasts[0].Night.Icon +
                    "-s.png"
                  }
                  alt=""
                />
                <p className="temp_phrase">
                  {wdata.DailyForecasts[0].Night.IconPhrase}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
