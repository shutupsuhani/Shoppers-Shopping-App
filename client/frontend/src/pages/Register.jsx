import Topbar from '../components/Topbar'

const Register = () => {
  return (
   
    <>
     <Topbar/>


     <div className="bg-gray-300 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

     <div className="w-full  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign up
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  
                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Name</label>
                      <input type="name" name="Name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Name" required="true"/>
                   </div>
                  
                  
                  
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Your Email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="true"/>
                  </div>

                  <div>
                      <label htmlFor="password" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="Enter 6 digit pin" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="true"/>
                  </div>

                  <div>
                      <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Confirm Password</label>
                      <input type="password" name="confirmpassword" id="confirmpassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm Your Password" required="true"/>
                  </div>
                  
                  <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-200 hover:text-blue-700   focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already Registered? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                  </p>
              </form>
          </div>
      </div>


     </div>
    
    </>
     
    
  )
}

export default Register