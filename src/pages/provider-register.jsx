import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

export default function ProviderRes() {
  const navigate = useNavigate();
  const validateSchema = Yup.object({
    email: Yup.string().email().required("email is required"),
    name: Yup.string().min(3).required("name is required"),
    job: Yup.string().required("job is required"),
    description: Yup.string().min(20).required("description is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 8 characters")
      .matches(/[a-z]/, "At least one lowercase letter required")
      .matches(/[A-Z]/, "At least one uppercase letter required")
      .matches(/[0-9]/, "At least one number required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch(`http://localhost:4000/auth/providerRegister`, {
        method: "post",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log("submitted data:", data);
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      console.error("error while registring:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      job: "",
      description: "",
      password: "",
      comfirmPassword: "",
    },
    validationSchema: validateSchema,
    onsubmit: handleSubmit,
  });
  return (
    <>
      <div className="res-form">
        <form onSubmit={formik.handleSubmit}>
          <h3>create a new account</h3>
          <hr />
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="enter your name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            )}
          </div>
          <div>
            <label htmlFor="job">Job</label>
            <input
              type="text"
              name="job"
              placeholder="enter your job"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.job}
            />
            {formik.touched.job && formik.errors.job && (
              <div style={{ color: "red" }}>{formik.errors.job}</div>
            )}
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              placeholder="exaple i offer graphics design services"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <div style={{ color: "red" }}>{formik.errors.description}</div>
            )}
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              placeholder="enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            )}
          </div>
          <div>
            <label htmlFor="comfirmPassword">comfirmPassword</label>
            <input
              type="password"
              name="comfirmPassword"
              placeholder="enter your comfirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comfirmPassword}
            />
            {formik.touched.comfirmPassword &&
              formik.errors.comfirmPassword && (
                <div style={{ color: "red" }}>
                  {formik.errors.comfirmPassword}
                </div>
              )}
          </div>
          <button type="submit" id="btn" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
          <br /> <hr />
          <button
            id="switch"
            type="button"
            onClick={() => navigate("/provider-login")}
          >
            Already have an account
          </button>
        </form>
      </div>
    </>
  );
}
