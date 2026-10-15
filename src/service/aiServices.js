import axios from 'axios'

const getAIResponse= async(message,messages=[])=>{
   try
{
    const response= await axios.post("http://localhost:5000/api/chat",
 {
    message,
    message,
 }
  );
   return response. data.response;

}  
catch(error){
   console.error("AI API Error:",error.response?.data || error.message);
   throw error;

} 

   
};
export default getAIResponse
