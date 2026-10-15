import React from 'react'
import ReactMarkdown from 'react-markdown'
import "./Message.css"
const Message = ({message,sender,timestamp}) => {

  return (
    <>
      <div className={`message ${sender}`}>
        <div className="message-conent">
          <ReactMarkdown>
            {message}
          </ReactMarkdown>
        </div>
        
      </div>
      {timestamp &&(
        <div className='message-time'>
          {
            new Date(timestamp).toLocaleTimeString([],{
              hour:"2-digit",
              minute:"2-digit",
            })
          }
        </div>
      )}
    </>
  )
}

export default Message
