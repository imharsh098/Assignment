import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../actions/userActions";

const HomePage = () => {
  const [plan, setPlan] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-key": userInfo.token,
    },
  };

  useEffect(async () => {
    if (!userInfo) {
      history("/login");
    } else {
      setPlan(userInfo.plan);
      console.log("setplan");
    }
  }, []);
  const handlePlan = async (newPlan) => {
    const { data } = await axios.post(
      "/api/users/newplan",
      { plan: newPlan },
      config
    );
    setPlan(newPlan);
  };
  const handleLogout = () => {
    if (userInfo) {
      dispatch(logoutAction());
      history("/login");
    }
  };
  return (
    <div className="whole">
      <div className="navbar">
        <button className="logout" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
      <table>
        <tr>
          <th>Plans</th>
          <th>Details</th>
          <th>Status</th>
        </tr>
        <tr>
          <td className="plan">Silver</td>
          <td>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, ab!
          </td>
          <td className="tdd">
            <button className="upgrade" disabled>
              {plan == "Silver" ? "Current Plan" : "Upgrade"}
            </button>
          </td>
        </tr>
        <tr>
          <td className="plan">Gold</td>
          <td>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, ab!
          </td>
          <td className="tdd">
            <button
              className="upgrade"
              onClick={() => {
                handlePlan("Gold");
              }}
              disabled={plan != "Silver" || plan == "Gold"}
            >
              {plan == "Gold" ? "Current Plan" : "Upgrade"}
            </button>
          </td>
        </tr>
        <tr>
          <td className="plan">Diamond</td>
          <td>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, ab!
          </td>
          <td className="tdd">
            <button
              className="upgrade"
              onClick={() => {
                handlePlan("Diamond");
              }}
              disabled={plan != "Gold" || plan == "Diamond"}
            >
              {plan == "Diamond" ? "Current Plan" : "Upgrade"}
            </button>
          </td>
        </tr>
        <tr>
          <td className="plan">Platinum</td>
          <td>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, ab!
          </td>
          <td className="tdd">
            <button
              className="upgrade"
              onClick={() => {
                handlePlan("Platinum");
              }}
              disabled={plan != "Diamond" || plan == "Platinum"}
            >
              {plan == "Platinum" ? "Current Plan" : "Upgrade"}
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default HomePage;
