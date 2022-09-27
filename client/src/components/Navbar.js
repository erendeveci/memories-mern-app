import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//Redux Process
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../reducers/authSlice";

//Jwt
import jwtDecode from "jwt-decode";

const Navbar = () => {
  const authData = useSelector((state) => state.auth.authData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = (e) => {
    if (e !== undefined) e.preventDefault();

    dispatch(authActions.logout());

    setUser(null);
    navigate("/auth");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [authData]);

  if (user !== null) {
    let userName = user.result.name;
    let firstLetterName = String(userName).charAt(0);

    return (
      <>
        <div className="w-full p-3  flex justify-between border-b-[1px] mb-5  items-center">
          <Link to="/">
            {" "}
            <h1 className="text-2xl font-mono ml-4">MEMORIES</h1>
          </Link>
          <div className=" flex max-w-[20rem] justify-between    items-center  mr-4">
            {user.result.picture || user.result.sub ? (
              <img
                src={user.result.picture}
                className="w-10 h-10  rounded-3xl mx-3"
              />
            ) : (
              <div className="bg-black text-white w-12 h-10 rounded-3xl text-center flex justify-center items-center">
                <p className="text-lg">{firstLetterName.toUpperCase()}</p>
              </div>
            )}

            <p className=" hidden sm:block text-base  mx-12">
              {user.given_name || user.result.name}
            </p>

            <Link
              onClick={logout}
              to="/auth"
              className="text-base font-semibold  mx-3 hover:text-gray-400"
            >
              Logout
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="w-full p-3 flex justify-between border-b-[1px] mb-5  items-center">
          <Link to="/">
            {" "}
            <h1 className="text-2xl font-mono m">MEMORIES</h1>
          </Link>
          <div className="flex max-w-[14rem] justify-between   h-10  items-center ">
            <Link
              to="/auth"
              className="text-base font-semibold  mx-3 hover:text-gray-400"
            >
              Sign in
            </Link>
          </div>
        </div>
      </>
    );
  }
};
export default Navbar;
