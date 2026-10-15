
import{useState} from 'react'
import "./App.css";
import Sidebar from './components/Sidebar/Sidebar'
import Chat from './components/Chat/Chat'
import Navbar from './components/Navbar/Navbar'
import useChatHistory from './hooks/useChatHistory';

const App = () => {

  const{recentChats,setRecentChats}=useChatHistory()
  
  const[selectedChat,setSelectedChat]=useState(null);
  const [messages,setMessages] = useState([]);

  const handleChatClick=(chat)=>{
    setSelectedChat(chat);
    setMessages(chat.messages);
  };



  const handleNewChat=()=>{
    setSelectedChat(null)
    setMessages([
      {
        id: Date.now(),
        message:"Hi ! How can I help?",
        sender :"bot",
      }
    ]);
    
  }
 
  const handleDeleteChat=(chatId)=>{
    const confirmDelete= window.confirm(
      "Are You Sure  you want to delete this chat?"
    );
    if(!confirmDelete){
      return;
    }
    setRecentChats((prevChats)=>
    prevChats.filter((chat)=>chat.id!==chatId)
  );
  if(selectedChat?.id===chatId){
    setSelectedChat(null);
    setMessages([])
  }
  };


  
  return (
    <>
    <div className="app">
    <Sidebar 
    recentChats={recentChats}
    handleChatClick={handleChatClick}
    handleNewChat={handleNewChat}
    handleDeleteChat={handleDeleteChat}
    />
    <main className="main">
      <Navbar/>
      <Chat 
      selectedChat={selectedChat}
      messages={messages}
      setMessages={setMessages}
      setRecentChats={setRecentChats}
      setSelectedChat={setSelectedChat}
      />
    </main>
    </div>
    </>
  )
}

export default App
