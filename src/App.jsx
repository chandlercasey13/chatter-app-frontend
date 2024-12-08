import React, { useState, useEffect, useContext,useRef } from "react";
import { useParams } from "react-router-dom";
import ChatBar from "./components/chatbar/ChatsLeftNavBar";

import ChatBox from "./components/ChatBox";
import * as authService from "../services/userService";
import * as chatService from "../services/chatService";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import UserAvatar from "./components/chatbar/UserAvatar";
import { ChatContext } from "../src/context";

import { VscSquirrel } from "react-icons/vsc";
import ImageUploadModal from "./components/ImageUploadModal";
import {Avatar, AvatarImage, AvatarFallback} from "./components/ui/avatar"
import Layout from "../layout";
import { Menu } from 'lucide-react';

import "./App.css";

function App() {
  const navigate = useNavigate();
  
  const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

  const [user, setUser] = useState(authService.getUser());

  const [loginText, setLoginText] = useState({ username: "", password: "" });
  const [isSignedup, setIsSignedUp] = useState(true);
  const [loginMessage, setLoginMessage] = useState(
    "Connect with your friends and family, build your community, and deepen your interests."
  );

  const [userChats, setUserChats] = useState([]);
  const { previewMessage, setPreviewMessage } = useContext(ChatContext);
  const {foundUserId} =useParams();

  const userId = user?._id;
  const [isInChat, setIsInChat] =useState(false);
 const [imageUploadOpen, setImageUploadOpen]= useState(false);
 const [sideBarOpen, setSideBarOpen]=useState(false);
 const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(`${BACKEND_URL}/users/${user?._id}/images`);






const handleImageUploadModalClose = function () {

setImageUploadOpen(false)

}

const handleImageUploadModalOpen = function () {

  setImageUploadOpen(true)
  
  }

const handleIsInChat = function () {
  setIsInChat(true)
}

const handleOpenSidebar =function () {
  setSideBarOpen(!sideBarOpen)
}
  useEffect(() => {
    if (userId  ) {
      refreshUserChats(userId);
    }
  }, [previewMessage, user]);
 


  

  useEffect(()=>{
    
    const getUserChats = async function (userId) {
      if (userId ) {
        const allUserChats = await chatService.getUserChats(userId);
  
        
  if (allUserChats) {
    setUserChats([allUserChats]);
  }
        
       
      } else {
        setUserChats([]); 
      }
    };
  
getUserChats(userId)


    
    
    },[])






  useEffect(()=>{
    




    if (userChats[0]?.length > 0  && !isInChat && user){
      navigate(`/chatlogs/${userChats[0][0]?._id}/user/${userChats[0][0]?.participants[0].username === user.username ? `${userChats[0][0]?.participants[1]._id}`: `${userChats[0][0]?.participants[0]._id}`}/${userChats[0][0]?.participants[0]?.username === user.username ? `${userChats[0][0]?.participants[1]?.username}`: `${userChats[0][0]?.participants[0].username}` }
        ` );
    } else if (userChats[0]?.length ===0  && user) {
      //setUserChats([])
       navigate(`/chatlogs/undefined/user/${user._id}/${user.username} ` );
    }
    
      
    
    
    },[userChats])



  const refreshUserChats = async function (userId) {
    if (userId ) {
      const allUserChats = await chatService.getUserChats(userId);

      
if (allUserChats) {
  setUserChats([allUserChats]);
}
      
   
    } else {
      setUserChats([]); 
    }
  };

  async function loginSubmit(e) {
    e.preventDefault();

    try {
      const userToken = isSignedup
        ? await authService.signin(loginText)
        : await authService.signup(loginText);
        // navigate(`/chatlogs/undefined/user/${user._id}/${user.username} ` )
        
      setUser(userToken);
    } catch (err) {
      console.log(err);
      setLoginMessage("Invalid username or password");
    }

  }



function handleSignOut () {
  authService.signout();
                    setUser(false);
                    setUserChats([]);
                    setIsInChat(false)
                    navigate("/");
                    setImageUploadOpen(false)
}




  function handleTextInput(event) {
    setLoginText({ ...loginText, [event.target.name]: event.target.value });
  }

  const [openSearchBox, setOpenSearchBox] = useState(false);

  const onOpen = () => {
    
    setOpenSearchBox(!openSearchBox);
  };

  const onClose = () => {
    setOpenSearchBox(false);
  };

  useEffect(() => {
    const adjustAppToViewport = () => {
      const appElement = document.getElementById('root');

      if (window.visualViewport) {
        const { width, height } = window.visualViewport;

        // Set the app's dimensions to match the visual viewport
        
        appElement.style.height = `${height}px`;
      } else {
        // Fallback for browsers without Visual Viewport API
        // appElement.style.width = '100vw';
        // appElement.style.height = '100vh';
      }
    };

    // Initial adjustment
    adjustAppToViewport();

    // Listen for viewport changes
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', adjustAppToViewport);
      window.visualViewport.addEventListener('scroll', adjustAppToViewport);
    }

    // Cleanup event listeners on component unmount
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', adjustAppToViewport);
        window.visualViewport.removeEventListener('scroll', adjustAppToViewport);
      }
    };
  }, []);



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL
      console.log(imageUrl); // Logs the URL
      setImage(imageUrl); // Set the URL to your state
      setImageFile(file)
    }
  };




  return (
    <div id="root">
    <>
    
        {user ? (
          <>
         <ImageUploadModal handleImageChange={handleImageChange} image={image} imageFile={imageFile} imageUploadOpen={imageUploadOpen} handleImageUploadModalClose= {handleImageUploadModalClose} user={user} setUser={setUser} setUserChats={setUserChats} setIsInChat={setIsInChat} handleSignOut={handleSignOut}/>

            <section className="chat-screen-container">
              <nav className=" chat-top-navbar border-gray-250 border-y-2 border-t-0 ">
                 <button
                  className="block  md:invisible"
                  onClick={() => {
handleOpenSidebar()

                    
                  
                  }}
                >
                  <Menu />
                  
                </button>
                <VscSquirrel size={30} className="chat-logo" />

                <button onClick={handleImageUploadModalOpen}>
              

              <Avatar className='h-8 w-8 ml-2' >
    <AvatarImage className   src={image} alt="@shadcn" />
    <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
  </Avatar>

                
               
              </button>




               
              </nav>
              <Layout  user={user}
                  userId={userId}
                  onOpen={onOpen}
                  onClose ={onClose}
                  userChats={userChats}
                  refreshUserChats={refreshUserChats}
                  handleIsInChat ={handleIsInChat}
                  sideBarOpen={sideBarOpen}
                  setSideBarOpen = {setSideBarOpen}
                  openSearchBox={openSearchBox}
                  handleOpenSidebar={handleOpenSidebar}>
                   
              <div className=" chat-window ">
               
               

                <div className="chat-window-right-panel">
                  <Routes>
                    <Route path="/" element={<ChatBox user={user} />} />

                    <Route
                      path="/chatlogs/:chatId/user/:foundUserId/:foundUserusername"
                      element={
                        <ChatBox 
                          user={user}
                          onOpen={onOpen}
                          onClose ={onClose}
                          openSearchBox={openSearchBox}
                          refreshUserChats={refreshUserChats}
                          
                        />
                      }
                    />
                  </Routes>
                </div>
               
              </div>
               </Layout>
            </section>
          </>
        ) : (
          <>
          
            <nav className="navbar-container">
              {" "}
              <div className="navbar">
                <VscSquirrel size={50} className="logo" />{" "}
                <p className="chatter-title">Chatter</p>
              </div>
            </nav>
            <div className="login-container">
              <div className="login-inner">
                <>
                  <div className="landing-column-left-container">
                    <div className="landing-column-left">
                      <h1 className="landing-column-left-header">
                        A place for meaningful conversations
                      </h1>

                      <p id="landing-column-left-pitch">{loginMessage}</p>

                      <div id="login-form-container">
                        <form id="login-form" onSubmit={loginSubmit}>
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
                            <button id="login-button" type="submit">
                              {isSignedup ? "Log In" : "Sign Up"}
                            </button>
                            <button
                              type="button"
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
                  <div className="landing-column-right-container">
                    <div className="landing-column-right">hey</div>
                  </div>
                </>
              </div>
            </div>
          </>
        )}
      
    </>
    </div>
  );

}

export default App;
