import React, { useEffect, useRef, useState } from 'react'
import Message from '../Message/Message'
import "./Chat.css"
import getAIResponse from '../../service/aiServices'
import Loader from '../Loader/Loader'


const Chat = ({selectedChat,messages,setMessages,setRecentChats,setSelectedChat,}) => {

  

  const[input,setInput]=useState("");
  const [loading,setLoading]=useState(false);


  const messagesEndRef=useRef(null);
   useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({
      behavior:"smooth",
    });
  },[messages,loading]);



  const handleSend=async()=>{
    if(! input.trim()|| loading) return;
    {/***if the Input  box is empty, don't send anythings */}

    const userInput =input.trim()
   
    setInput("")
    setLoading(true)

    const newMessage={
      id:Date.now(),
      message:userInput,
      sender:"user",
      timestamp:new Date().toISOString(),
    };
    

    //show user's message immmediately


     setMessages((prevMessages)=>[
      ...prevMessages,
      newMessage,
     ]);
     

try{
     // Ask AI for a message 
     const aiReply = await getAIResponse(userInput,messages);

    const botMessage={
      id : Date.now()+1,
      message:aiReply,
      sender:"bot",
      timestamp:new Date().toISOString(),
    };

    //Show Ai response

    setMessages((prevMessages)=>[
      ...prevMessages,
      botMessage
    ]);

    


    //save message inside the selected chat
    if(selectedChat)
    {
      setRecentChats((prevChats)=>
      prevChats.map((chat)=>
      chat.id===selectedChat.id
      ?{
        ...chat,
       messages:[...chat.messages,newMessage,botMessage],
      }
      :chat
      )
    );
    } else{
      //create a New Chat
      const newChat={
        id: Date.now(),
        title:userInput.slice(0,30),
        messages:[
          newMessage,
          botMessage,
        ],
      };
      setRecentChats((prevChats)=>[
        newChat,
        ...prevChats,
      ]);
      
      setSelectedChat(newChat)
    }
  }catch(error){
    console.log("AI response error",error)
  }finally{
    setLoading(false);
  }
    
  };

  
  
  
  return (
    <>
      <div className='chat'>

        
        
     
        {
          selectedChat?(
            <h2>{selectedChat.title}</h2>
          ):(
            <h2>Welcome to NOVA AI</h2>
          )
        }
        
        {/**You can use parentheses ( ) directly after the arrow: 
         * This is called an implicit return.
         * 
         * JavaScript automatically returns whatever is inside the parentheses.
         * 
         * {}
         * its doesn't work because it creates a function body,
         * but you never return the mesage
        */}
        <div className="messages">

        
        {(messages||[]).map((msg)=>(
          <Message
          key={msg.id}
          message={msg.message}
          sender={msg.sender}
          timestamp={msg.timestamp}
        />
        ))}
        {
          loading &&<Loader/>

        }

        <div ref={messagesEndRef}></div>
        </div>
        </div>

        {/**Chat Input  */}
        <div className="chat-input">
          <input type="text" placeholder='Enter Your message...' value={input} onChange={(e)=>setInput(e.target.value)}
          
          onKeyDown={(e)=>{
            if(e.key=== "Enter"){
              handleSend();
            }
          }}
          
          /> 
          <button onClick={handleSend}>
            Send
          </button>



        </div>
      
       


    </>
  )
}

export default Chat
