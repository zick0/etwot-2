import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

import { auth_user, submit_form } from "../controllers/user";
import "../styles/index.css";

export default function DashboardApplicant() {
  let [title, setTitle] = useState("");
  let [desc, setDesc] = useState("");
  let [budget, setBudget] = useState("");
  let [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  let [userId, setUserId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      let obj = {
        token: localStorage.getItem("user_token"),
      };
      auth_user(obj).then((data) => {
        if (data.tag) {
          setIsUserLoggedIn(true);
          setUserId(
            JSON.parse(atob(localStorage.getItem("user_token").split(".")[1]))
              .id
          );
        } else {
          setIsUserLoggedIn(false);
        }
      });
    }
  });

  const handleChange = async (e) => {
    console.log("yesss");
    e.preventDefault();
    let obj = {
      form_title: title,
      form_desc: desc,
      form_budget: budget,
      token: localStorage.getItem("user_token"),
    };
    console.log("yesss");

    submit_form(obj).then((data) => {
      console.log("yesss");
      console.log(data);
      alert(data.message);
      window.location.reload();
    });
  };

  return (
    <>
      <Navbar />
      <div className="dashbg p-16">
        {/* <img className="imgabout" src={about1} /> */}
        <div className="userdetails bg-[#e6e6e6] rounded-lg shadow-2xl p-16 ml-10 mr-10 mt-20">
          <div className="text-5xl text-center">What Service do you need?</div>

          {isUserLoggedIn ? (
            <>
              {/* <label className="text-xl ml-10 font-medium "> Title</label>
              <br />
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="role shadow-2xl p-3 w-[85%] text-xl ml-10 bg-white  outline-none border-2 rounded-xl"
              />

              <label className="text-xl ml-10 font-medium "> Description</label>
              <br />
              <input
                type="text"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                className="role shadow-2xl p-3 w-[85%] text-xl ml-10 bg-white  outline-none border-2 rounded-xl"
              />

              <label className="text-xl ml-10 font-medium ">Budget</label>
              <br />
              <input
                type="number"
                value={budget}
                onChange={(e) => {
                  setBudget(e.target.value);
                }}
                className="role shadow-2xl p-3 w-[85%] text-xl ml-10 bg-white  outline-none border-2 rounded-xl"
              />

              <button
                className="submit p-3 border-2 shadow-2xl w-[85%] text-xl hover:bg-[#c0c0c0] ml-10 mb-5 bg-white outline-none rounded-xl "
                type="submit"
                onClick={handleChange}
              >
                Submit
              </button> */}
              <div>
                <div class="signup">
                  <form method="POST">
                    <input
                      className="input"
                      type="text"
                      name="txt"
                      placeholder="Title"
                      required=""
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                    <input
                      className="input"
                      type="text"
                      name="Description"
                      placeholder="Description"
                      required=""
                      value={desc}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                    />
                    <input
                      className="input"
                      type="number"
                      name="budget"
                      placeholder="Budget"
                      required=""
                      value={budget}
                      onChange={(e) => {
                        setBudget(e.target.value);
                      }}
                    />
                    <button
                      className="signup-btn"
                      value="Register"
                      onClick={handleChange}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>

              <div className="already flex flex-row mt-32">
                <button
                  className="submit p-2 border-2 shadow-2xl w-[30%] text-xl hover:bg-[#c0c0c0] bg-white outline-none rounded-xl "
                  type="submit"
                  onClick={() => {
                    navigate("/userdashboard");
                  }}
                >
                  Back to Dashboard
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
