import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import Swal from "sweetalert2";

import { AuthContext } from "../context/AuthProvider";

export default function Home() {
  const router = useRouter();

  const { auth } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState<number>();
  const [quantity, setQuantity] = useState<number>(1);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [render, setRender] = useState<number>(0);

  function fetchProduct() {
    try {
      axios.get("http://localhost:5000/api/products").then((response) => {
        setProducts(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateProduct = (
    e: FormEvent<HTMLFormElement>,
    productId: string
  ) => {
    e.preventDefault();

    try {
      axios
        .post(
          "http://localhost:5000/api/products/update",
          {
            productId,
            price,
          },
          { withCredentials: true }
        )
        .then((response) => {
          setRender((prev) => prev + 1);
          Swal.fire("Good job!", `${response.data.message}`, "success");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    try {
      axios
        .delete(`http://localhost:5000/api/products/delete/${productId}`, {
          withCredentials: true,
        })
        .then((response) => {
          setRender((prev) => prev + 1);
          Swal.fire("Good job!", `${response.data.message}`, "success");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchProductSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      axios
        .get(`http://localhost:5000/api/products?name=${searchTerm}`)
        .then((response) => {
          if (response.data.message) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${response.data.message}`,
            });
          } else {
            setProducts(response.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (productId: string) => {
    if (!auth) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please sign in or sign up.",
      });
    }

    try {
      axios
        .post(
          "http://localhost:5000/api/carts/add-to-cart",
          {
            productId,
            quantity,
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
            router.push("/cart");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [render]);

  return (
    <div>
      <form
        action="GET"
        className="flex"
        onSubmit={(e) => {
          handleSearchProductSubmit(e);
        }}
      >
        <input
          type="text"
          className="border-2 p-4 w-full rounded-md outline-none "
          placeholder="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-red-400 text-white p-3 rounded-md ml-3"
        >
          Search
        </button>
      </form>
      <div className=" flex flex-wrap gap-10 mt-10">
        {products &&
          products.map((product: Product) => (
            <div
              key={product._id}
              className="w-80 h-60 shadow-md flex flex-col justify-between p-3"
            >
              <div className="flex justify-between">
                <p className="text-center font-bold">{product.name}</p>
                {auth?.isAdmin && (
                  <AiOutlineClose
                    className="cursor-pointer text-red-400 hover:text-yellow-400"
                    onClick={() => handleDeleteProduct(product._id)}
                  />
                )}
              </div>
              <p className="text-xs">{product.description}</p>
              <div className="flex justify-between">
                <p>Price : {product.price}</p>
                {auth?.isAdmin && (
                  <div>
                    <form
                      action="POST"
                      onSubmit={(e) => {
                        handleUpdateProduct(e, product._id);
                      }}
                    >
                      <input
                        type="number"
                        className="border-2 w-20 mr-3"
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                      />
                      <button
                        type="submit"
                        className="text-red-400 hover:text-yellow-400"
                      >
                        update
                      </button>
                    </form>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                add to cart
                <div className="flex">
                  <input
                    type="number"
                    className="border-2 w-20 mr-3"
                    min="1"
                    placeholder="1"
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <BsCart3
                    className="text-2xl cursor-pointer text-red-400 hover:text-yellow-400"
                    onClick={() => {
                      handleAddToCart(product._id);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
