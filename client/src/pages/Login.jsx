import React from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import { customFetch } from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>

        <FormRow type="email" name="email" />

        <FormRow type="password" name="password" />

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <button type="button" className="btn btn-block">
          Explore The App
        </button>
        <p>
          Not a member?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
