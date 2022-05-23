import React, { useState } from 'react'
import { Button } from '@mui/material'
import styled from 'styled-components'

//firebase
import {
  serverTimestamp,
  db,
  addDoc,
  collection,
  auth
} from "../firebase"
import { useAuthState } from 'react-firebase-hooks/auth'

function ChatInput({ channelName, channelId, chatRef }) {

  const [user] = useAuthState(auth)
  const [msgInput, setMsgInput] = useState("");
  const roomColRef = collection(db, "rooms")
  const msgColRef = collection(roomColRef, `${channelId}`, "messages")

  const sendMsg = (e) => {
    e.preventDefault();
    
    console.log(channelId);

    if (channelId) {
      addDoc(msgColRef, {
        message: msgInput,
        timestamp: serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      })
      //scroll to new message at the bottom
      chatRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        
      });
      setMsgInput("");
    } 
  }

  return (
    <ChatInputContainer>
      <form>
        <input          
          max-length="600"
          type="text"
          value={msgInput}
          onChange={(e) => setMsgInput(e.target.value)}
          placeholder={`Message #${channelName}`} />
        <Button type='submit' disabled={!msgInput} onClick={sendMsg} hidden>SEND</Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput

const ChatInputContainer = styled.div`
  > form {
    display: flex;
    justify-content: center;
    margin-top: 1%;
  }
  > form > input {

    font-size: 14px;
    width: 60%;
    padding: 5px 10px;
    outline: none;
    border-radius: 25px;
    border: 2px solid #ffffff;
    background-color: whitesmoke;
  }
  > form > button {
    display: none !important;
  }
`;