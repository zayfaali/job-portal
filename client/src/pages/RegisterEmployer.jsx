import React from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { FormRow } from "../components";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register-employer", data);
    toast.success("Registration successfull");
    return redirect("/login-employer");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const RegisterEmployer = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />

        <FormRow type="text" name="companyName" labelText="company name" />
        <FormRow type="text" name="lastName" labelText="last name" />
        <FormRow type="text" name="location" />

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <p>
          Already a member?
          <Link to="/login-employer" className="member-btn">
            Login As Employer
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default RegisterEmployer;
