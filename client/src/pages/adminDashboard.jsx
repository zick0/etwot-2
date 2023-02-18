import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import aboutus from "../assets/aboutimg.png";
import { useNavigate } from "react-router-dom";
import {
  auth_admin,
  get_forms,
  get_admin_det_by_id,
} from "../controllers/admin";
import "../styles/index.css";

export default function DashboardAdmin() {
  const navigate = useNavigate();
  let [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [forms, setForms] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("admin_token")) {
      let obj = {
        token: localStorage.getItem("admin_token"),
      };
      auth_admin(obj).then((data) => {

        if (data.tag) {
          setIsAdminLoggedIn(true);
          let obj = {
            id: JSON.parse(
              atob(localStorage.getItem("admin_token").split(".")[1])
            ).id,
          };
          get_admin_det_by_id(obj).then((data) => {
            setName(data.message.admin_name);
            setEmail(data.message.admin_email);
          });
          get_forms(obj).then((data) => {
            console.log(data.message);
            setForms(data.message);
          });
        } else {
          setIsAdminLoggedIn(false);
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
        </div>

        {isAdminLoggedIn ? (
          <div className="responses-section">
            <div className="text-5xl font-semibold m-10 text-white">Forms</div>

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
                        Accept
                      </button>
                      <button className="m-2 p-2 delete-dash rounded-lg">
                        Reject
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
