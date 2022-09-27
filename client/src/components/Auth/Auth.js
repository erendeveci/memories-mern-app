import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//Components
import Navbar from "../Navbar";

//Image  , Icons
import { AiOutlineLogin, AiFillEye } from "react-icons/ai";
import { IoIosPersonAdd } from "react-icons/io";
import people from "../../images/people.jpg";

//Google Auth Procces
import { GoogleLogin } from "@react-oauth/google";

//Redux Process
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../reducers/authSlice";
import { signIn } from "../../reducers/authSlice";
import { signUp } from "../../reducers/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const dispatch = useDispatch();

  const [loggedError, setLoggedError] = useState(false);
  const navigate = useNavigate();
  const [isSignUp, setSignUp] = useState(false);

  const [togglePassword, setTogglePassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if (isSignUp) {
      try {
        response = await dispatch(signUp(formData));
      } catch (error) {
        console.log(error);
      }

      if (response.payload !== undefined) navigate("/");
      else setLoggedError(true);
    } else {
      try {
        response = await dispatch(signIn(formData));
      } catch (error) {
        console.log(error);
      }

      if (response.payload !== undefined) navigate("/");
      else setLoggedError(true);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSucces = async (res) => {
    console.log("Google Auth is  Successfully");
    console.log(res);
    const credential = res.credential;

    try {
      dispatch(authActions.login({ credential }));
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was uncessfull");
  };
  return (
    <>
      <Navbar />
      <div className="flex max-w-[60rem] md:m-auto">
        <div className="  w-[60%] hidden md:block ">
          <img src={people} className="w-full h-[24rem]  " alt="people" />
        </div>

        <div className="max-w-[40rem]  mx-auto p-6 text-sm box-border w-[100%] md:w-[50%] md:max-w-[26rem]   ">
          {isSignUp ? (
            <IoIosPersonAdd className=" w-full h-6 mb-3" />
          ) : (
            <AiOutlineLogin className=" w-full h-6 mb-3" />
          )}

          {isSignUp && (
            <>
              <h1 className="font-semibold text-xl text-center mb-3 ">
                Sign Up
              </h1>
              <form method="POST" onSubmit={handleSubmit}>
                <div className=" flex justify-between relative  ">
                  <input
                    onChange={handleChange}
                    className="w-full p-2  mb-2 mr-2 border-[1px] border-gray-400  rounded-md"
                    type="text"
                    placeholder="First Name*"
                    name="firstName"
                  />
                  <input
                    onChange={handleChange}
                    className="w-full p-2  mb-2   border-[1px] border-gray-400  rounded-md"
                    type="text"
                    placeholder="Second Name*"
                    name="lastName"
                  />
                </div>
                <div className="">
                  <input
                    onChange={handleChange}
                    className="w-full p-2  mb-2  border-[1px] border-gray-400  rounded-md"
                    type="mail"
                    placeholder="Email Address*"
                    name="email"
                  />
                  <div className="flex relative ">
                    <input
                      onChange={handleChange}
                      className="w-full p-2  mb-2  border-[1px] border-gray-400  rounded-md"
                      type={togglePassword ? "text" : "password"}
                      placeholder="Password*"
                      name="password"
                    />
                    <div className=" absolute right-2 top-2 cursor-pointer  w-fit h-fit hover:bg-gray-100 rounded-2xl">
                      <AiFillEye
                        className="w-8 h-6 "
                        onClick={() => setTogglePassword(!togglePassword)}
                      />
                    </div>
                  </div>

                  <div className="flex relative ">
                    <input
                      onChange={handleChange}
                      className="w-full p-2  mb-2  border-[1px] border-gray-400  rounded-md"
                      type={togglePassword ? "text" : "password"}
                      placeholder="Password*"
                      name="confirmPassword"
                    />
                  </div>

                  <button className="bg-black text-white p-3 rounded-md w-full mt-2  border hover:text-black hover:border hover:border-black hover:bg-white">
                    Sign Up
                  </button>
                </div>
              </form>
            </>
          )}

          {!isSignUp && (
            <>
              <h1 className="font-semibold text-xl text-center mb-3 ">
                Sign In
              </h1>
              <form method="POST" onSubmit={handleSubmit}>
                <div className="  flex flex-col relative  ">
                  <input
                    name="email"
                    onChange={handleChange}
                    className="w-full p-2  mb-2 mr-2 border-[1px] border-gray-400  rounded-md"
                    type="mail"
                    placeholder="Email Address*"
                  />
                  <div className=" relative w-full   ">
                    <input
                      name="password"
                      onChange={handleChange}
                      className="w-full p-2  mb-2 mr-2 border-[1px] border-gray-400  rounded-md"
                      type={togglePassword ? "text" : "password"}
                      placeholder="Password*"
                    />
                    {loggedError && (
                      <p className="text-red-500">
                        Email or password is incorrect{" "}
                      </p>
                    )}
                    <div className=" absolute right-0 top-2 cursor-pointer  w-fit h-fit">
                      <AiFillEye
                        className="w-8 h-6 "
                        onClick={() => setTogglePassword(!togglePassword)}
                      />
                    </div>
                  </div>
                </div>
                <button className="bg-black text-white p-3 rounded-md w-full mt-2  border hover:text-black hover:border hover:border-black hover:bg-white">
                  Sign In
                </button>
                <div>
                  <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-400">Or</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                  </div>
                  <div className="flex ">
                    <GoogleLogin
                      size="large"
                      onSuccess={googleSucces}
                      onError={googleFailure}
                      width="200px"
                    ></GoogleLogin>
                  </div>
                </div>
              </form>
            </>
          )}
          <div className="text-base mt-6 text-right">
            <p>
              {isSignUp
                ? "Already have an account ?"
                : "Don't have an account ? "}{" "}
              <b
                className="cursor-pointer"
                onClick={() => setSignUp((prevState) => !prevState)}
              >
                {isSignUp ? " Sign in " : " Sign up now"}{" "}
              </b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Auth;
