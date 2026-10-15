import React from "react";
import { useState } from "react";
import useApi from "../../shared/authAxiosInterceptor";
import { useAuthContext } from "../../context/authContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await useApi().post("/auth/register", formData);
      useAuthContext.setAccessToken(response.data.data.accessToken)
      useAuthContext.setUser(user);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message,
      );
    }

  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-2 p-5">
          <input
            className="w-100 border-2 border-black "
            placeholder="Enter your name"
            title="Name"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            className="w-100 border-2 border-black "
            placeholder="Enter your valid email"
            title="Email"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            className="w-100 border-2 border-black "
            placeholder="Enter your password"
            title="Password"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button className="w-100 h-10 rounded-2xl bg-cyan-400">
            Register Here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
