import { useFormik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const validateSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setApiError("");

      const response = await fetch(
        `http://localhost:4000/auth/userlogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        toast.error("Login Failed. Check credentials")
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      toast.success(data.message ||'Welcome back')
      localStorage.setItem("token", data.token);
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error while submitting:", error);
      setApiError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="container">
        <div className="item">
          <div className="item1">
            <h4>Service provider Login</h4>
          </div>
          <div className="item2">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <br />
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                )}
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <br />
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                )}
              </div>

              {apiError && <div style={{ color: "red" }}>{apiError}</div>}

              <button type="submit" id="btn" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
          <hr />
          <button id="switch" onClick={() => navigate("/register")}>
            Create New Account
          </button>
        </div>
      </div>
    </>
  );
}
