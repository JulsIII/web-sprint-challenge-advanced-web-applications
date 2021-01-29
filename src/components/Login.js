import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  // const { push } = useHistory();
  const [formValues, setFormValues] = useState({
      username:'', 
      password: '',
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormValues({
        ... formValues,
        [name]: value,
    });
};

  const handlelogin = (e) => {
    const config = {
      baseURL: "http://localhost:5000",
    };
    e.preventDefault();
    axiosWithAuth(config)
      .post("/api/login", formValues)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        // change this berlw
        // push("/friends");   
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
      <form onSubmit={handlelogin}>
        <label htmlFor="username">username</label>
        <input
          id="username"
          value={formValues.username}
          name="username"
          onChange={handleChanges}
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          value={formValues.password}
          type="password"
          name="password"
          onChange={handleChanges}
        />
        <button>Login</button>
      </form>
    </div>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEST "username" and "password" RESPECTIVELY.
//4. 
//4b.MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT “username” and “password” RESPECTIVELY.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.



// XXXIf either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.