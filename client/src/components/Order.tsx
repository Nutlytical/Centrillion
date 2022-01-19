import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

import { AuthContext } from "../context/AuthProvider";

const { NEXT_PUBLIC_BACKEND_URI } = process.env;

export default function Order() {
  const router = useRouter();

  const { auth } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);

  function fetchOrders() {
    try {
      axios
        .get(`${NEXT_PUBLIC_BACKEND_URI}/orders/admin`, {
          withCredentials: true,
        })
        .then((response) => {
          setOrders(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateOrder = (
    e: ChangeEvent<HTMLSelectElement>,
    orderId: string
  ) => {
    try {
      axios
        .post(
          `${NEXT_PUBLIC_BACKEND_URI}/orders/update`,
          {
            orderId,
            status: e.target.value,
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
    fetchOrders();
  }, [orders]);

  return (
    <>
      <div className="flex flex-col justify-center align-center text-center">
        <table>
          <thead>
            <tr>
              <th>order by</th>
              <th>amount</th>
              <th>status</th>
              <th>change status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders?.map((order: Order) => (
                <tr key={order._id}>
                  <td>{order.user.username}</td>
                  <td>{order.amount}</td>
                  <td>{order.status}</td>
                  <td>
                    <select
                      name="cars"
                      id="cars"
                      className="p-3"
                      onChange={(e) => handleUpdateOrder(e, order._id)}
                    >
                      <option value="PENDING">pending</option>
                      <option value="CANCEL_BY_CUSTOMER">
                        cancel by customer
                      </option>
                      <option value="IN_PROGRESS">in progress</option>
                      <option value="CANCEL_BY_ADMIN">cancel by admin</option>
                      <option value="DONE">done</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
