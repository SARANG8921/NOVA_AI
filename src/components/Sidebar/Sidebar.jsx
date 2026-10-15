
import "./Sidebar.css"
import { FaPlus } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useState,useEffect } from "react";

const Sidebar = ({recentChats,handleChatClick,handleNewChat, handleDeleteChat}) => {

const [openMenu,setOpenMenu]=useState(null);
const [editingChat,setEditingChat]=useState(null);
const [editTitle,setEditTitle]=useState("");

useEffect(()=>{
  const handleClickOutside=(event)=>{
    if(!event.target.closest(".chat-options")){
      setOpenMenu(null);
    }
  };
  document.addEventListener("click",handleClickOutside);
  return()=>{
    document.removeEventListener("click",handleClickOutside);
  }
},[])


const [search,setSearch]=useState("");

const filterChats=recentChats.filter((chat)=>
    
  chat.title.toLowerCase().includes(search.toLowerCase())
)


  
  return (
    <>
    <div className='sidebar'>
      
     <h1>NOVA AI</h1> 

     <button  className='new-chat' onClick={handleNewChat}>
     <FaPlus />
       New Chat
     
     </button>

    
       <h3>Recent Chats</h3>
       
             <div className="search-box">
              <input type="text" placeholder="Search chats..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}/>
             </div>
     

     <ul>
      {
        recentChats.map((chat)=>{
        return(
              
       <li className="chat-item"  key={chat.id}>
        
       <button  className="chat-title" onClick={()=>handleChatClick(chat)}>{chat.title}</button> 
       
      
      
      <div className="chat-options">
        <button  type="button" className="dots-button" onClick={(e)=>{e.stopPropagation();
          setOpenMenu(openMenu === chat.id ? null :chat.id);
        }}>
           ⋮
        </button>
        {openMenu === chat.id &&(
          <div className="chat-menu">
        <button onClick={(e)=>{e.stopPropagation(); handleDeleteChat(chat.id); setOpenMenu(null);}}>
        <FaTrash />
       </button>
        </div>

        )}
        
      </div>
       
       </li>
        );
       
        })
      }


     <button>
     <IoSettings />
       Settings    
 
     </button>
     </ul>
   


    </div>



    
    
    </>
    
  )
}

export default Sidebar
