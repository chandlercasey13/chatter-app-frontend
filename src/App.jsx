import React, { useState, useEffect } from "react";
import ChatBar from "./components/chatbar/ChatsLeftNavBar";
import Chat from "./components/chatbar/Chat";
import ChatBox from "./components/ChatBox";
import * as authService from "../services/authService";
import * as chatService from "../services/messageService";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import UserAvatar from "./components/chatbar/UserAvatar";
import { ChatProvider } from './context';



import { VscSquirrel } from "react-icons/vsc";


import io from "socket.io-client";
import "./App.css";

function App() {




  const navigate = useNavigate();


  const [user, setUser] = useState(authService.getUser());





 
  const [loginText, setLoginText] = useState({ username: "", password: "" });
  const [isSignedup, setIsSignedUp] = useState(true);
  const [loginMessage, setLoginMessage] =useState("Connect with your friends and family, build your community, and deepen your interests.")
  



 async function loginSubmit(e) {
  e.preventDefault();
   
  
try {
  

const user = isSignedup ?  await authService.signin(loginText) : await authService.signup(loginText)

  setUser(authService.getUser());
  navigate('/');

} catch (err) {
  console.log(err)
  setLoginMessage('Invalid username or password')
}

  }

  function handleTextInput(event) {
    setLoginText({ ...loginText, [event.target.name]: event.target.value });

   
  }






  return (
    <>
      

      <div
        id="root"
       
      >
        {user ? (
          <>
          <section className="chat-screen-container">
          <nav className=" chat-top-navbar"><button><Link to="/" >Home</Link></button> <VscSquirrel size={30} className="chat-logo"/> <button onClick={() => {authService.signout(); setUser(null); navigate('/');}}>Sign Out</button></nav>
          <div className=" chat-window ">
            
          <ChatProvider>
              <ChatBar user={user} />
              
              <div className="chat-window-right-panel">
              
                <Routes>
                  <Route path="/" element={<ChatBox user={user} />} />
                  
                  <Route
                    path="/chatlogs/:chatId/user/:foundUserId/:foundUserusername"
                    element={<ChatBox user={user} />}
                  />
                </Routes>
              </div>
              </ChatProvider>


              
            </div>
            </section>
          </>
        ) : (
          <>
          <nav className="navbar-container"> <div className="navbar"><VscSquirrel size={50} className="logo"/> <p className="chatter-title">Chatter</p></div></nav>
            <div className="login-container">
              <div className="login-inner">
              
                <>

              
                  <div className="landing-column-left-container">
<div className="landing-column-left">
                  
                  <h1 className="landing-column-left-header">A place for meaningful conversations</h1>
                  

<p id="landing-column-left-pitch">{loginMessage}</p>




                    <div id="login-form-container">
                     

                       
                        <form
                          id="login-form"
                          onSubmit={loginSubmit}
                        >
                          <label htmlFor="username"></label>

                          <input
                            className="form-input"
                            id="username"
                            name="username"
                            type="text"
                            onChange={handleTextInput}
                            value={loginText.username}
                            placeholder="Username"
                          ></input>

                          <input
                            className="form-input"
                            id="password"
                            name="password"
                            type="text"
                            onChange={handleTextInput}
                            value={loginText.password}
                            placeholder="Password"
                          ></input>
<div id="form-buttons">
                          <button
                            id="login-button"
                            type="submit"
                          >
                            {isSignedup? "Log In": "Sign Up"}
                            
                          </button>
                          <button type='button'
                        onClick={function () {
                          setIsSignedUp(!isSignedup);
                        }}
                      >
                        Don't have an account ?
                      </button>
                      </div>
                        </form>
                     
                      
                    </div>
                    </div>
                  </div>
                  <div className="landing-column-right-container"><div className="landing-column-right">hey</div></div>
                </>
               
              
            </div>
            </div>
            
          </>
        )}
      </div>
      
    </>
  );
}

export default App;
