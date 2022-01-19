import { Response } from "express";

function validateUsername(res: Response, username: string) {
  let errorMessage = "";

  if (!username) {
    errorMessage = "Username is required.";
  } else if (typeof username !== "string") {
    errorMessage = "Username type must be a string.";
  } else if (username.length < 3 || username.length > 30) {
    errorMessage =
      "Username must be at least 3 characters and less than 30 characters.";
  }

  if (errorMessage) {
    return res.json({
      message: errorMessage,
    });
  }

  return username.trim();
}

function validateEmail(res: Response, email: string) {
  let errorMessage = "";

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isEmailValid = re.test(email);

  if (!email) {
    errorMessage = "Email is required";
  } else if (typeof email !== "string") {
    errorMessage = "Email type must be a string";
  } else if (!isEmailValid) {
    errorMessage = "Email is in wrong format.";
  }

  if (errorMessage) {
    return res.json({
      message: errorMessage,
    });
  }

  return email.trim().toLowerCase();
}

function validatePassword(res: Response, password: string) {
  let errorMessage = "";

  const re = /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/;

  const isPasswordValid = re.test(password);

  if (!password) {
    errorMessage = "Password is required";
  } else if (typeof password !== "string") {
    errorMessage = "Password type must be a string";
  } else if (!isPasswordValid) {
    errorMessage =
      "Password must contain at least one uppercase one lowercase one number and must be between 8 - 20 characters";
  }

  if (errorMessage) {
    return res.json({
      message: errorMessage,
    });
  }

  return password;
}

export { validateUsername, validateEmail, validatePassword };
