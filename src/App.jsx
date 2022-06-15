import "./App.css";
import { useState } from "react";
import Form from "./components/Form";
import Input from "./components/Input";

export default function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [registerResponse, setRegisterResponse] = useState("");
  const [loginResponse, setLoginResponse] = useState("");
  const [loginUser, setLoginUser] = useState({ username: "", password: "" });

  const register = async (e) => {
    e.preventDefault();
    // Write your register code here
    try {
      const opts = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      };
      fetch(`http://localhost:4000/register`, opts)
        .then((res) => res.json())
        .then((response) => {
          setRegisterResponse(response.data);
          console.log(user);
        });
    } catch (e) {
      setRegisterResponse("Username is already taken");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    // Write your login code here
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    };
    fetch(`http://localhost:4000/login`, opts)
      .then((res) => res.json())
      .then((response) => {
        setLoginResponse(`Welcome ${loginUser.username}!`);
      });
  };

  // You can safely ignore everything below this line, it's just boilerplate
  // so you can focus on the exercise requirements

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    const { value, name } = e.target;

    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <h1>Register</h1>

      <Form
        handleSubmit={register}
        inputs={[
          <Input
            key={1}
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            handleChange={handleChange}
          />,
          <Input
            key={2}
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            handleChange={handleChange}
          />,
        ]}
      />

      {registerResponse && <p>{registerResponse}</p>}

      <h1>Login</h1>

      <Form
        handleSubmit={login}
        inputs={[
          <Input
            key={1}
            type="text"
            name="username"
            placeholder="Username"
            value={loginUser.username}
            handleChange={handleLogin}
          />,
          <Input
            key={2}
            type="password"
            name="password"
            placeholder="Password"
            value={loginUser.password}
            handleChange={handleLogin}
          />,
        ]}
      />

      {loginResponse && <p>{loginResponse}</p>}
    </div>
  );
}
