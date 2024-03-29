import React, { useEffect, useRef, useState } from "react";
import Loader from "../layout/Loader/Loader";
import "./LoginSignUp.css";
import { FiMail } from "react-icons/fi";
import { MdLockOpen } from "react-icons/md";
import { GiBalaclava } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUp = ({}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const location = useLocation();
  const navigate = useNavigate();

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [curTab, setCurTab] = useState("login");

  const [copiedText, setCopiedText] = useState("");
  const pRef = useRef(null);
  const pRef1 = useRef(null);
  const uRef = useRef(null);

  const handleClick = () => {
    const text = pRef.current.innerText;
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    alert.success("Email copied!");
  };
  const handleClick1 = () => {
    const text = pRef1.current.innerText;
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    alert.success("Email copied!");
  };
  const handlepass = () => {
    const text = uRef.current.innerText;
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    alert.success("Password copied!");
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    console.log("form submited");
  };
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
    console.log("signup form submited");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      setCurTab("login");
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      setCurTab("register");
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <FiMail />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <MdLockOpen />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forget Password ?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>

            {curTab === "login" && (
              <div className="userDetails">
                <div>
                  <p className="credientialHeading">Admin Credential</p>
                  <p>
                    Email:{" "}
                    <span
                      ref={pRef}
                      onClick={handleClick}
                      className="emailBold"
                    >
                      abc@gmail.com
                    </span>
                  </p>
                  <p>
                    password:{" "}
                    <span
                      style={{ cursor: "copy" }}
                      ref={uRef}
                      onClick={handlepass}
                    >
                      12345678
                    </span>{" "}
                  </p>
                </div>
                <div>
                  <p className="credientialHeading">User Credential</p>
                  <p>
                    Email:{" "}
                    <span
                      ref={pRef1}
                      onClick={handleClick1}
                      className="emailBold"
                    >
                      test@gmail.com
                    </span>
                  </p>
                  <p>
                    password:{" "}
                    <span
                      style={{ cursor: "copy" }}
                      ref={uRef}
                      onClick={handlepass}
                    >
                      12345678
                    </span>{" "}
                  </p>
                </div>
              </div>
            )}

            {/*  */}
            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signUpName">
                <GiBalaclava />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <FiMail />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <MdLockOpen />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>

              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input type="submit" value="Register" className="signUpBtn" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignUp;
