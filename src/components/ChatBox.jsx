import React, { useState } from "react";
import { socket } from "../socket";

function ChatBox () {

    const [textInputData, setTextInputData] = useState({ textInput: "" });
    const [messageLog, setMessageLog] = useState([]);

    
    function handleTextInput(event) {
        setTextInputData({
          ...textInputData,
          [event.target.name]: event.target.value,
        });
      }
    
      function handleButtonSubmit(e) {
        e.preventDefault();
    
        socket.emit("message", textInputData.textInput);
        setMessageLog([...messageLog, textInputData.textInput]);
        setTextInputData({ userId: "" , textInput: "" });
      }
    
     
        socket.on('message', (messagecontent) => {
            setMessageLog([...messageLog, messagecontent])
           


        })
     


      
return ( <>
    <ul className="list-none flex flex-col justify-center items-center">
      {messageLog.map((message, index) => (
        <li key = {index}>{message}</li>
      ))}
    </ul>

    <form className= 'w-full flex justify-center' onSubmit={handleButtonSubmit}>
      <label htmlFor="textInput"></label>

      <input
      className="w-5/6 border-2 rounded-lg border-black/30"
        id="textInput"
        name="textInput"
        type="text"
        value={textInputData.textInput}
        onChange={handleTextInput}
        required
      ></input>

      <button>
        {" "}
        <i className="bx bxs-send"></i>
      </button>
    </form>
  </>)

}


  
  export default ChatBox;
  