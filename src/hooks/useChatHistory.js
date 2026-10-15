import { useEffect, useState } from "react"
import defaultChats from "../data/defaultChats";



const useChatHistory=()=>{
    const [recentChats,setRecentChats]=useState(()=>{
        const savedChats= localStorage.getItem("novaChats");

    return savedChats ? JSON.parse(savedChats):defaultChats;

    });
    useEffect(()=>{
        localStorage.setItem(
            "novaChats",
            JSON.stringify(recentChats)
        );
    },[recentChats]);

    return{
        recentChats,
        setRecentChats,
    };

}
export default  useChatHistory