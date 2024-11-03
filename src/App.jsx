import React, { useState, useEffect,useContext } from "react";
import ChatBar from "./components/chatbar/ChatsLeftNavBar";
import Chat from "./components/chatbar/Chat";
import ChatBox from "./components/ChatBox";
import * as authService from "../services/authService";
import * as chatService from "../services/chatService";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import UserAvatar from "./components/chatbar/UserAvatar";
import { ChatContext } from "../src/context";



import { VscSquirrel } from "react-icons/vsc";


import io from "socket.io-client";
import "./App.css";

function App() {




  const navigate = useNavigate();


  const [user, setUser] = useState(null);



 
  const [loginText, setLoginText] = useState({ username: "", password: "" });
  const [isSignedup, setIsSignedUp] = useState(true);
  const [loginMessage, setLoginMessage] =useState("Connect with your friends and family, build your community, and deepen your interests.")
  
  const [userChats, setUserChats] = useState([]);
  const { previewMessage, setPreviewMessage } = useContext(ChatContext);

  const userId = user?._id;



console.log(user)

useEffect(() => {
  if (userId) {
    refreshUserChats(userId);
}

},[previewMessage,userId])

    const refreshUserChats = async function (userId) {
      
      if(userId){
        
      const allUserChats = await chatService.getUserChats(userId);
      
      setUserChats([ allUserChats]);
      } else {
        setUserChats([]); // Clear chats if user is not signed in
    }
      
      
    };
    

 async function loginSubmit(e) {
  e.preventDefault();
   
  
try {
  

const user = isSignedup ?  await authService.signin(loginText) : await authService.signup(loginText)
setUser(user);
console.log(user)
 
  navigate(`/chatlogs/${userChats[0][0]._id}/user/${userChats[0][0].participants[0].username === user.username ? `${userChats[0][0].participants[1]._id}`: `${userChats[0][0].participants[0]._id}`}/${userChats[0][0].participants[0].username === user.username ? `${userChats[0][0].participants[1].username}`: `${userChats[0][0].participants[0].username}` }
   ` );
  

} catch (err) {
  console.log(err)
  setLoginMessage('Invalid username or password')
}

  }

  function handleTextInput(event) {
    setLoginText({ ...loginText, [event.target.name]: event.target.value });

   
  }

  const [openSearchBox, setOpenSearchBox] = useState(false);





  const onOpen = () => {

    setOpenSearchBox(true);
  };

  const onClose= () => {
    setOpenSearchBox(false)
  }






  return (
    <>
      

      <div
        id="root"
       
      >
        {user ? (
          <>
          <section className="chat-screen-container">
          <nav className=" chat-top-navbar"><button><Link to="/" >
          <img className="navbar-profile-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA7hJREFUaEPtWe1R4zAQlZxCLhQARweERkhcSUglSWiE0AEHBeBGYp1XI2fk9X4pDneTGTxzPw6E9d7u2097d+WPv3L87ofA//bgxTxwvw3ztnJLIBS8W/jg5s7Ff036WVO1rmkr9/b55HeXIj6ZwN0+rBPgRSEoILb7WPpN4d8Njp9NAIB31l0lK0/BMIlIMYEkldcLAMekQWKP77WPkrM+RQTut2HRVg7Ac0+0ZgfkDbQPYIBwOgwx8qDIrdgbZgJJMs8E8uJLs4Cn3gdXPFtjw0RAAG++iHKZQsT0bpUAJ5uk14NVq9K525ew8sFtiTMqCZEAAx6CrX6vPQk+s2qfoWJQ+uAOPri98nc4OYh3xfdKlrnbhy+cbSTL/96FbfAxtbJPV+B2f1a+FiQFd+ZP87H0N9wLWQKUWyXwty/htbOytZixoKh7g3c1V71ZAtj6kuUKwUdjSu8jPMkSJgkw1r+higwXJ8G7DVgt1QGoARCkfU2IJDiPpjgaSInzAkcAy4HNBlZrAajjzG1zmXVF7fD55B8pfWMjcmdJAl3eD/lLq9aR1oczWGpSnBDeYqVBeaErbiO8ox9g5pJWEwEzWQKUmGFwbFHGGRHAkpAyQCkB6jxl1d77uAOgjEl5YKB/reJarNQDIpKD6AEsOSoORgQITbP6B2BECpVy/MA4mjwtkqMIDDQtuRgIaO1G306nNtyURnuP/RMCcJmlhcCpUrN+FgeiQSfHQPLCKMdL/RAMO1J/w3nAFAMlQZmDNAwp8bhUvDBpLE9TFiKGF7Unx0SCd+u2cvOs6p5GTa6dtlRjEwFrCVckcpFfYzVQNWkUA9YSTrg7LrZgoZWsP8g4qQM9dPMCDCkw2KjbB0tLM7mZA8IgGW2QQYSbNKFtOCKWKhyNQvmaarqonY1hzaJJid1oYOsXtdOUjHAACYO4Bhr/fkSCqitcQS0ZKZtsSOEWXIPFFkIKtQLiAuIEj56n4Z3y6lkjJdfnwEbiOHNrDELrWnMyzNx7mB1d3SUCPImxQw8bA0IvQspD61gtOZ7TnTRMqQSSF7ilU7zT2tMwJLRNhlpE1c0cXCysFtnB3BLJSiJQwZs80APRlrvW4gTv0/qmkngyecBA4iQn+IQE/5kd43r90M8Dx1n87PQLKrVU9ErjqYhAZr3v+sDB7lw5SRYTsEjAov/sTPH3hfz9ZxFAaRa+TJ7zrWwS8B7DJAK5JdLmbVG17iHrRvuO9LRiL+lGLZ68GAHLZd9x5ofAd1i15J1X74G/LGDXT0wGU60AAAAASUVORK5CYII="/></Link></button> 
          <VscSquirrel size={30} className="chat-logo"/> 
          <button onClick={  () => { authService.signout(); setUser(false); setUserChats([]);  navigate('/');}}>Sign Out</button>
          </nav>
          <div className=" chat-window ">
            
        
              <ChatBar user={user} userId={userId} onOpen={onOpen} userChats={userChats} refreshUserChats= {refreshUserChats} />
              
              <div className="chat-window-right-panel">
              
                <Routes>
                  <Route path="/" element={<ChatBox user={user} />} />
                  
                  <Route
                    path="/chatlogs/:chatId/user/:foundUserId/:foundUserusername"
                    element={<ChatBox user={user} onOpen={onOpen} openSearchBox= {openSearchBox} />}
                  />
                </Routes>
              </div>
             


              
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
