import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import aboutus from "../assets/aboutimg.png";
import { useNavigate } from "react-router-dom";
import {
  auth_user,
  get_forms,
  get_user_det_by_id,
  delete_form,
  submit_form,
} from "../controllers/user";
import "../styles/index.css";

export default function DashboardUser() {
  const navigate = useNavigate();
  let [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [forms, setForms] = useState([]);
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      let obj = {
        token: localStorage.getItem("user_token"),
      };
      auth_user(obj).then((data) => {
        if (data.tag) {
          setIsUserLoggedIn(true);
          let obj = {
            id: JSON.parse(
              atob(localStorage.getItem("user_token").split(".")[1])
            ).id,
          };
          get_user_det_by_id(obj).then((data) => {
            setName(data.message.user_name);
            setEmail(data.message.user_email);
          });
          get_forms(obj).then((data) => {
            console.log(data.message);
            setForms(data.message);
          });
        } else {
          setIsUserLoggedIn(false);
        }
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashbg p-16">
        {/* <img className="imgabout" src={about1} /> */}
        <div className="userdetails bg-[#e6e6e6] rounded-lg shadow-2xl p-16 ml-10 mr-10 mt-20">
          <h1 className="text-2xl m-2 p-2 text-black">Name: {name} </h1>
          <h1 className="text-2xl m-2 p-2 text-black">Email: {email} </h1>
          <div className="serveButton">
            <button
              className="p-3 bg-red-500 rounded-lg"
              onClick={() => navigate("/requestservice")}
            >
              Request A Service
            </button>
          </div>
        </div>

        {isUserLoggedIn ? (
          <div className="responses-section">
            <div className="text-5xl font-semibold m-10 text-white">
              My Forms
            </div>

            {forms ? (
              forms.map((form) => (
                <div className="rounded flex flex-row">
                  <div className="dashcard p-10  mt-5 mb-5 w-full rounded-lg text-white flex flex-row">
                    <div className="data-container flex flex-col">
                      <div className="form-title text-3xl text-red font-bold">
                        {form.form_title}
                      </div>
                      <div className="form-desc text-2xl text-red mt-2 mb-2 text-wrap w-1/2">
                        {form.form_desc}
                      </div>
                      <div className="form-desc text-2xl text-red text-wrap w-1/ font-semibold">
                        Budget: ${form.form_budget}
                      </div>
                    </div>
                    <div className="data-container-button flex flex-row">
                      <button className="m-2 p-2 edit-dash rounded-lg">
                        Edit
                      </button>
                      <button className="m-2 p-2 delete-dash rounded-lg">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>No forms</>
            )}
          </div>
        ) : (
          <>You are not logged in</>
        )}
      </div>
    </>
  );
}
