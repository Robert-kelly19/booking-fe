import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function ProviderRes() {
  const navigate = useNavigate();
  const validateSchema = Yup.object({
    email: Yup.string().email().required("email is required"),
    providerName: Yup.string().min(3).required("name is required"),
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
      const res1 = await fetch(`http://localhost:4000/auth/providerRegister`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res1.ok) {
        toast.error("error while registering new account");
        return;
      }
      const data = await res1.json();
      toast.success(data.message ||"new account registered successfully!");
      console.log("submitted data:", data);
      resetForm();
      navigate("/login");
    } catch (error) {
      console.error("error while registring:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      providerName: "",
      job: "",
      description: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validateSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="res-form">
        <div className="item">
          <form onSubmit={formik.handleSubmit}>
            <h3>Create Freelancer Account</h3>
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
              <label htmlFor="providerName">Name</label>
              <input
                type="text"
                name="providerName"
                placeholder="enter your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.providerName}
              />
              {formik.touched.providerName && formik.errors.providerName && (
                <div style={{ color: "red" }}>{formik.errors.providerName}</div>
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
                placeholder="example: i offer graphics design services"
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
              <label htmlFor="confirmPassword">confirmPassword</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="enter your confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div style={{ color: "red" }}>
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
            <button type="submit" id="btn" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
            <br />
          </form>
          <hr />
          <button id="switch" type="button" onClick={() => navigate("/login")}>
            Already have an account
          </button>
        </div>
      </div>
    </>
  );
}
