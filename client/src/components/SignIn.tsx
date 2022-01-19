import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

import { AuthContext } from "../context/AuthProvider";

const { NEXT_PUBLIC_BACKEND_URI } = process.env;

export default function SignIn() {
  const router = useRouter();

  const { setAuth } = useContext(AuthContext);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = input;

    axios
      .post(
        `${NEXT_PUBLIC_BACKEND_URI}/users/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.message) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${response.data.message}`,
          });
        } else {
          setAuth(response.data);
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex flex-col justify-center align-center text-center">
      <form action="POST" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            value={input.email}
            placeholder="email"
            onChange={handleChange}
            className="border-2 mb-3 p-3"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={input.password}
            placeholder="password"
            onChange={handleChange}
            className="border-2 mb-3 p-3"
          />
          <br />
          <button type="submit" className="border-2 mb-3 p-3 w-40 text-3xl">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
