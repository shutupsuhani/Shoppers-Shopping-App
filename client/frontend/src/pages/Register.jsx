import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setErrorMessage("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registered successfully");
      setErrorMessage("");
      navigate("/home");
    } catch (error) {
      console.error("Error during registration:", error);
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
      toast.error(`Registration failed: ${errorMessage}`);
    }
  };

  return (
    <>
      <div className="dark:bg-gray-900 mt-20 flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-slate-50 rounded-lg mb-20 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 font-mono space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-pink-600 md:text-2xl dark:text-white">
              Sign up
            </h1>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium font-serif text-gray-900 dark:text-white text-left"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your Email-Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="bg-gray-50 border-b-2 border-black font-serif text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 focus:outline-none dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-left block mb-2 text-sm font-serif font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="Enter 6 digit pin"
                  className="bg-gray-50 border-b-2 border-black font-serif text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 focus:outline-none dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="block mb-2 text-sm font-serif font-medium text-gray-900 dark:text-white text-left"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Enter confirm password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmpassword"
                  className="bg-gray-50 border-b-2 font-serif border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 focus:outline-none dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:text-black focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already Registered? <Link to="/login">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
