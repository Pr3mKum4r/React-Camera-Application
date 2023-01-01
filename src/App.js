import "./App.css";
import Card from "./components/Card";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Camera } from "react-camera-pro";

function App() {
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);

  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [imgData, setImgData] = useState([]);
  const [localImgData, setLocalImgData] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();

  const imgResetHandler = () => {
    setImgData([]);
    setLocalImgData([]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setDetailsSubmitted(true);
  };
  
  const validateEmailHandler = () => {
    setEmailIsValid(email.includes("@vitstudent.ac.in"));
  };

  const homeHandler = (event) => {
    setDetailsSubmitted(false);
  }

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const genderHandler = (event) => {
    setGender(event.target.value);
  };

  const phoneHandler = (event) => {
    setPhone(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    setImgData((prevImgData) => {
      return [image, ...prevImgData];
    });
    localStorage.setItem("imageStored", JSON.stringify(imgData));
    setLocalImgData(JSON.parse(localStorage.getItem("imageStored")));
  }, [image]);

  return (
    <div>
      {!detailsSubmitted ? (
        <React.Fragment>
          <h1>React-Camera-Pro Application</h1>
        <div className="main-container">
            <div className="camera-container">
              <Camera ref={camera} aspectRatio={4 / 3} className="camera" />
            </div>
            <div className="buttons-container">
            <button
              onClick={() => {
                setImage(camera.current.takePhoto());
              }}
            >
              Take pic
            </button>
            <button onClick={imgResetHandler}>Reset everything</button>
            </div>
          <Card className="form-container">
            <form onSubmit={submitHandler}>
              <div className="control">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Name"
                  onChange={nameHandler}
                />
              </div>
              <div className="control-radio">
                <label>Gender </label>
                <input
                  type="radio"
                  value="Male"
                  onInput={genderHandler}
                  className="radio"
                />
                <label>Male</label>
                <input
                  type="radio"
                  value="Female"
                  onInput={genderHandler}
                  className="radio"
                />
                <label>Female</label>
              </div>
              <div className="control">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  placeholder="Enter Phone No"
                  onChange={phoneHandler}
                />
              </div>
              <div className={emailIsValid === false ? "control invalid" : "control"}>
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  placeholder="Enter VIT Email ID"
                  onChange={emailHandler}
                  onBlur={validateEmailHandler}
                />
              </div>
              <p className="emailValidity-alert">{emailIsValid === false ? "Enter Valid VIT Email" : ""}</p>
              <div className="actions">
                <button type="submit" disabled={!emailIsValid}>Submit</button>
              </div>
              <div></div>
            </form>
          </Card>
        </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
        <h1>Congratulations {name}!</h1>
        <h2>The following details have been submitted!</h2>
        <div>
          <div className="details-container">
            <h4>Name: {name}</h4>
            <h4>Gender: {gender}</h4>
            <h4>Phone Number: {phone}</h4>
            <h4>Email Address: {email}</h4>
            <button onClick={homeHandler}>Go Back</button>
          </div>
          <h3>All previous images on:-</h3>
          <div className="images-container">
            {imgData.map((capturedImg, index) => {
              if (capturedImg != null) {
                return (
                  <img
                    src={capturedImg}
                    key={index}
                    alt="img"
                    className="image"
                  />
                );
              }
            })}
          </div>
        </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
