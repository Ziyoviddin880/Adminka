import "./login.scss";
import { useRef } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const number = useRef();
  const password = useRef();
  const form = useRef();
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    axios
      .post(
        `${baseURL}auth/signin`,
        {
          phone_number: number.current.value,
          password: password.current.value,
        },
        {
          headers: {
            "Content-Type":
              "application/json; charset=utf-8;multipart/form-data ",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data.tokens.accessToken.token);
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });

// Fetch orqali

  //   console.log(`${baseURL}auth/signin`);
  //   fetch(`${baseURL}auth/signin`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       phone_number: number.current.value,
  //       password: password.current.value,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8;multipart/form-data ",
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       res.json();
  //     })
  //     .then((data) => console.log(data));
  // };
}

  return (
    <div className="login">
      <form ref={form} onSubmit={login}>
        <label>
          <div>Raqam</div>
          <input
            ref={number}
            required
            minLength={4}
            type="text"
            placeholder="Raqamingizni kiriting"
          />
        </label>{" "}
        <label>
          <div>Parol</div>
          <input
            ref={password}
            required
            minLength={4}
            type="password"
            placeholder="Parolni kiriting kiriting"
          />
        </label>{" "}
        <br />
        <button type="submit">Kirish</button>
      </form>
    </div>
  );
};

export default LoginPage;
