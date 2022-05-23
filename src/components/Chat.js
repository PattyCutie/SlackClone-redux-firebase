import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import ChatInput from './ChatInput';

//Mui Icon
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import { db, orderBy, collection, doc, query } from '../firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import Message from './Message';
import { useNavigate } from 'react-router-dom';

function Chat() {
    const chatRef = useRef();
    const roomId = useSelector(selectRoomId);
    const navigate = useNavigate();
    const roomColRef = doc(db, "rooms", `${roomId}`);
    const [roomDetails] = useDocument(roomId && roomColRef);

    const msgColRef = collection(roomColRef, "messages");
    const [roomMsgs, roomLoading] = useCollection(roomId && query(msgColRef, orderBy("timestamp", "asc")));

    // Scolling to the latest message at the bottom <ChatBottom /> by default
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }, [roomMsgs, roomLoading]);
    // remomve /channels:title when f5 webrowser 
    //can delete after make go back to main page button///
    useEffect(() => {
        if (!roomId) {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //////////////////////////////
    //console.log(roomDetails?.data())
    //console.log(roomMsgs)
 
    return (
        <ChatContainer>
            {roomDetails && roomMsgs && (
                <>
                    <Header>
                        <HeaderLeft>
                            <h4>#<strong>{roomDetails?.data().name}</strong></h4>
                            <StarBorderOutlinedIcon />
                        </HeaderLeft>
                        <HeaderRight>
                            <InfoOutlinedIcon />
                            <p>Details</p>
                        </HeaderRight>
                    </Header>
                    <ChatMessages>
                        {roomMsgs?.docs.map((doc) => {
                            const { message, timestamp, user, userImage } = doc.data();
                            return (
                                <Message
                                    key={doc.id}
                                    message={message}
                                    timestamp={new Date(timestamp?.seconds * 1000).toUTCString()}
                                    user={user}
                                    userImage={userImage}
                                />
                            )
                        })}
                        <ChatBottom ref={chatRef} />
                    </ChatMessages>
                    <ChatFooter>
                        <ChatInput
                            chatRef={chatRef}
                            channelName={roomDetails?.data().name}
                            channelId={roomId} />
                    </ChatFooter>
                </>
            )}
        </ChatContainer>
    )
}

export default Chat

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 70%;
    height: 100%;
    background-color: #ffc0cb;
`;
const Header = styled.div`
    display: flex;
    position: fixed;
    height: 6%;
    width: 100%;
    opacity: 0.4;
    color: #fff;
    border-top: 1px solid #49274b;  
    background-color: var(--slack-color);
    :hover {
        opacity: 1;
    }
`;
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    > h4 {
        display: flex;
        text-transform: capitalize;
        margin-right: auto;
        margin-left: 5px;
        font-size: 14px;
    }
    > .MuiSvgIcon-root {
        margin-right: auto;
        margin-left: 5px;
        font-size: 24px;
    }
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  margin-right: 14px;
  margin-left: auto;
    > p {
        font-size: 12px;
    }
    > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 14px;
    }
`;
const ChatMessages = styled.div`
    display: flex;
    flex-direction: column;
    height: 90%;
    overflow-y: auto;
    /* Firefox */
    scrollbar-width: none;
    scrollbar-color: #49274b #3f0f40;
  /* Chrome, Edge, and Safari */
  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-track {
    background:  #ffd1dc;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #49274b;
    border-radius: 10px;
    border: 1px solid #49274b;
}
`;
const ChatBottom = styled.div`
    height: 1%;
`;

const ChatFooter = styled.div`
    flex: 1;
    height: 6%;
    background-color: #ff9fd3;
`;