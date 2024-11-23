import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./login.css";
import { motion } from "framer-motion";
import "./register.css"
import { Loader2Icon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      toast.success(`Welcome back, ${user.email}!`);
      console.log(user.email)
      setErrorMessage("");
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
      toast.error(`Login failed: ${errorMessage}`);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div id="loginpage" className="h-screen bg-pink-300 font-mono flex flex-col items-center justify-center px-6 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
       
          
          <div className="w-full bg-white backdrop-blur-sm bg-opacity-25 rounded-lg shadow md:max-w-md xl:p-0 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-black font-mono text-center font-bold leading-tight tracking-tight md:text-2xl">
                LOGIN
              </h1>
              {errorMessage && (
                <p className="text-red-500 mb-4">{errorMessage}</p>
              )}
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-md font-medium text-black text-left"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white backdrop:blur-sm border border-gray-300 focus:outline-none text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-left block mb-2 text-md font-medium text-black"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="bg-white backdrop:blur-sm  border border-gray-300 text-gray-900 focus:outline-none sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded bg-white backdrop:blur-sm border focus:ring-3 focus:ring-primary-300  dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                    <label
                      htmlFor="remember"
                      className="ml-3 text-sm text-black "
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="flex justify-center">
                <button
                  id="explore-btn"
                  type="submit"
                  className="w-full font-mono disabled={loading} text-white hover:text-black focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading ?( <div className="flex items-center justify-center"><Loader2Icon className="animate-spin"/></div> ) : "Sign in"}

                </button>
                </div>
                <p className="text-sm font-light text-black ">
                  Don’t have an account yet? <Link to="/register">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
       
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Login;
