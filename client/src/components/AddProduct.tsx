import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

import { AuthContext } from "../context/AuthProvider";

export default function AddProduct() {
  const router = useRouter();

  const { auth } = useContext(AuthContext);

  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, description, price } = input;

    axios
      .post(
        "http://localhost:5000/api/products/create",
        {
          name,
          description,
          price: parseInt(price),
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
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (!auth?.isAdmin) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      {auth?.isAdmin && (
        <div className="flex flex-col justify-center align-center text-center">
          <h1 className="text-3xl mb-3">Add Product</h1>
          <form action="POST" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                value={input.name}
                placeholder="name"
                onChange={handleChange}
                className="border-2 mb-3 p-3"
              />
            </div>
            <div>
              <textarea
                name="description"
                value={input.description}
                placeholder="description"
                rows={4}
                cols={50}
                onChange={handleChange}
                className="border-2 mb-3 p-3"
              ></textarea>
            </div>
            <div>
              <input
                type="number"
                name="price"
                value={input.price}
                placeholder="price"
                onChange={handleChange}
                className="border-2 p-3"
              />
            </div>
            <br />
            <button type="submit" className="border-2 mb-3 p-3 w-40 text-3xl">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
