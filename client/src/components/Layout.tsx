import React, { PropsWithChildren, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

import { AuthContext } from "../context/AuthProvider";
import { BsCart3 } from "react-icons/bs";
import Swal from "sweetalert2";

export default function Layout({ children }: PropsWithChildren<{}>) {
  const router = useRouter();

  const { auth, setAuth } = useContext(AuthContext);

  const handleSignOut = () => {
    setAuth(null);

    try {
      axios
        .get("http://localhost:5000/api/users/signout", {
          withCredentials: true,
        })
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
    setAuth(null);
  };

  return (
    <div>
      <nav className="flex justify-between mx-5 my-5 md:mx-10 font-bold text-red-400">
        <Link href="/">
          <a className="hover:text-yellow-400">Home</a>
        </Link>
        <div className="flex text-end gap-5">
          <Link href="/cart">
            <a
              className="hover:text-yellow-400 text-3xl"
              onClick={() => {
                if (!auth) {
                  return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please sign in or sign up.",
                  });
                }
              }}
            >
              <BsCart3 />
            </a>
          </Link>
          {!auth && (
            <>
              <Link href="/signin">
                <a className="hover:text-yellow-400">signIn</a>
              </Link>
              <Link href="/signup">
                <a className="hover:text-yellow-400">signUp</a>
              </Link>
            </>
          )}

          {auth?.isAdmin && (
            <>
              <Link href="/add-product">
                <a className="hover:text-yellow-400">Add Product</a>
              </Link>
              <Link href="/orders">
                <a className="hover:text-yellow-400">Orders</a>
              </Link>
            </>
          )}

          {auth && (
            <span
              className="hover:text-yellow-400 cursor-pointer"
              onClick={handleSignOut}
            >
              signOut
            </span>
          )}
        </div>
      </nav>
      <div>{children}</div>
    </div>
  );
}
