import express from "express";
import cors from "cors"
import generateAIReply from "./serviceAi.js"




const app= express();

app.use(cors());
app.use(express.json());

app.post("/api/chat",async(req,res)=>{
    try{
        const{message,messages}=req.body;
        const response= await generateAIReply(message,messages);

        res.json({
            response:response,
        });
    }
    catch(error){
        console.log("AI Error:",error);

        res.status( error.status===503?503:500).json({
            error:"Failed to get AI response",
        });
    }
});

app.listen(5000,()=>{
    console.log("NOVA AI backend running  on http://localhost:5000");
});