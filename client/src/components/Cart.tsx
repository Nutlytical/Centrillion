import React, { MouseEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";

import { AuthContext } from "../context/AuthProvider";

export default function Cart() {
  const router = useRouter();

  const { auth } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchCart = () => {
    try {
      axios
        .get(`http://localhost:5000/api/carts`, {
          withCredentials: true,
        })
        .then((response) => {
          setCart(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrder = () => {
    try {
      axios
        .get(`http://localhost:5000/api/orders`, {
          withCredentials: true,
        })
        .then((response) => {
          setOrders(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCartItem = (productId: string) => {
    try {
      axios
        .delete(`http://localhost:5000/api/carts/delete/${productId}`, {
          withCredentials: true,
        })
        .then((response) => {
          setCart(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    try {
      axios
        .get("http://localhost:5000/api/orders/create", {
          withCredentials: true,
        })
        .then((response) => {
          setOrders(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateOrder = (orderId: string) => {
    try {
      axios
        .post(
          "http://localhost:5000/api/orders/update",
          {
            orderId,
            status: "CANCEL_BY_CUSTOMER",
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data.message) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${response.data.message}`,
            });
          } else {
            setOrders(response.data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!auth) router.push("/");

    fetchCart();
    fetchOrder();
  }, [orders]);

  return (
    <>
      {auth && (
        <div className="flex flex-col justify-center align-center text-center">
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>price</th>
                <th>quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((cartItem: CartItem) => (
                <tr key={cartItem._id}>
                  <td>{cartItem.product?.name}</td>
                  <td>{cartItem.product?.price}</td>
                  <td>{cartItem.quantity}</td>
                  <td>{cartItem.quantity * cartItem.product?.price}</td>
                  <td>
                    <AiOutlineClose
                      className="cursor-pointer text-red-400 hover:text-yellow-400"
                      onClick={() =>
                        handleDeleteCartItem(cartItem.product?._id)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-3xl my-20 flex justify-center">
            <span className="py-3 font-bold">Total : &nbsp;</span>
            <span className="py-3 font-bold">
              {cart?.reduce(
                (prev: number, cur: CartItem) =>
                  prev + cur.quantity * cur.product?.price,
                0
              )}
            </span>
            <form action="GET">
              <button
                type="submit"
                className="flex align-center ml-10 bg-red-400 hover:bg-red-500 text-white p-3"
                onClick={(e) => {
                  handleOrderSubmit(e);
                }}
              >
                Order Now
              </button>
            </form>
          </div>

          <table>
            <thead>
              <tr>
                <th>orderId</th>
                <th>amount</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders?.map((order: Order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.amount}</td>
                    <td>{order.status}</td>
                    <td>
                      <AiOutlineClose
                        className="cursor-pointer text-red-400 hover:text-yellow-400"
                        onClick={() => handleUpdateOrder(order._id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
