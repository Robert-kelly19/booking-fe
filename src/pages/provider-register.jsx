import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

export default function ProviderRes() {
  const validateSchema = Yub.object({
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
      const res = await fetch(
        `https://url-shortener-production-0bea.up.railway.app/auth/register`,
        {
          method: "post",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      console.log('submitted data:',data)
      resetForm();
      navigate("/dashboard");
    } catch (error) {
        console.error('error while registring:',error)
    } finally {
        setSubmitting(false)
    }
  };

  const formik = useFormik({
    initialValues:{
        email:'',
        name:'',
        job:'',
        description:'',
        password:'',
        comfirmPassword:'',
    },
    validationSchema: validateSchema,
    onsubmit: handleSubmit,
  });
  return( 
  <>
  <div className="res-form">
    <form onsubmit={formik.handleSubmit}>
        
    </form>
  </div>
  </>
  )
}
