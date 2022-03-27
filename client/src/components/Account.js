import React, { useEffect, useState } from "react";
import { loginAction, registerAction } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import "./account.css";

function Account() {
  const [fheight, setFheight] = useState({ height: "300px" });
  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo: registerInfo } = userRegister;
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginAction(log.email, log.password));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(
      registerAction({
        email: reg.emaill,
        password: reg.passwordd,
        clientname: reg.client,
        phone: reg.phone,
        plan: "Silver",
      })
    );
    setReg({
      client: "",
      company: "",
      address: "",
      phone: "",
      gst: "",
      emaill: "",
      passwordd: "",
    });
  };

  useEffect(() => {
    if (userInfo) {
      history("/");
    }
  }, [userLogin]);
  useEffect(() => {
    if (registerInfo) {
      setAccess(true);
    }
  }, [userRegister]);
  const strong = {
    backgroundColor: "green",
    width: "100%",
  };

  const [reg, setReg] = useState({
    client: "",
    company: "",
    address: "",
    phone: "",
    gst: "",
    emaill: "",
    passwordd: "",
  });
  const [log, setLog] = useState({
    email: "",
    password: "",
  });
  const [bar, setBar] = useState(false);
  const [style, setStyle] = useState({});

  const registration = (e) => {
    if (e.target.id === "passwordd") {
      setReg({ ...reg, [e.target.id]: e.target.value });
      passwordStrength(e.target.value);
      if (e.target.value >= 6) {
        setBar(true);
      }
    } else {
      setReg({ ...reg, [e.target.id]: e.target.value });
    }
  };
  const loggingIn = (e) => {
    setLog({ ...log, [e.target.id]: e.target.value });
  };

  const [access, setAccess] = useState(true);
  const register = () => {
    setAccess(false);
    setFheight({ height: "425px" });
  };
  const login = () => {
    setAccess(true);
    setFheight({ height: "300px" });
  };

  function passwordStrength(val) {
    if (val.length >= 6) {
      setBar(true);
      setStyle(strong);
    } else {
      setBar(false);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="account-page">
          <div className="container">
            <div className="row">
              <div className="col-2">
                <img src="images/recover.svg" alt="Logo" width="100%" />
              </div>
              <div className="col-2">
                <div className="form-container" style={fheight}>
                  <div className="form-btn">
                    <Link to="/login">
                      <span onClick={login}>Login</span>
                    </Link>
                    <Link to="/login">
                      <span onClick={register}>Register</span>
                    </Link>
                    <hr
                      id="Indicator"
                      style={
                        access
                          ? { transform: "translateX(-50px)" }
                          : { transform: "translateX(50px)" }
                      }
                    />
                  </div>
                  {error && <h4 style={{ color: "red" }}>{error}</h4>}

                  <form
                    className="mainform"
                    id="LoginForm"
                    style={
                      access
                        ? { transform: "translateX(300px)" }
                        : { transform: "translateX(0px)" }
                    }
                    onSubmit={handleLogin}
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={log.email}
                      onChange={loggingIn}
                    />
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={log.password}
                      onChange={loggingIn}
                    />
                    <button type="submit" className="butn">
                      Login
                    </button>
                    <a href="">Forget Password</a>
                  </form>

                  <form
                    className="mainform"
                    id="RegForm"
                    style={
                      access
                        ? { transform: "translateX(300px)" }
                        : { transform: "translateX(0px)" }
                    }
                    onSubmit={handleRegister}
                  >
                    <input
                      type="text"
                      placeholder="Clientname"
                      id="client"
                      value={reg.client}
                      onChange={registration}
                    />
                    <input
                      type="number"
                      placeholder="Phone No."
                      id="phone"
                      value={reg.phone}
                      onChange={registration}
                    />
                    <input
                      type="email"
                      id="emaill"
                      placeholder="Email"
                      value={reg.emaill}
                      onChange={registration}
                    />
                    <input
                      type="password"
                      id="passwordd"
                      placeholder="Password"
                      value={reg.passwordd}
                      onChange={registration}
                    />
                    {bar && (
                      <div
                        id="bar"
                        style={{
                          border: "1.5px solid gray",
                          borderRadius: "5px",
                          height: "10px",
                        }}
                      >
                        <div
                          id="status"
                          style={{
                            transition: "all ease-in-out 450ms",
                            height: "100%",
                            borderRadius: "12px",
                            ...style,
                          }}
                        ></div>
                      </div>
                    )}
                    {/* {bar && <PasswordStrengthBar password={reg.password} />} */}
                    <button type="submit" className="butn">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Account;
