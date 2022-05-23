import React from 'react'
import styled from 'styled-components';

function Message({ message, timestamp, user, userImage}) {
  return (
      <MessageContainer>
          <img src={userImage} alt="" />
          <MessageInfo>
              <h4>
                  {user} <span>{timestamp}</span>
              </h4>
              <p>{message}</p>
          </MessageInfo>
    </MessageContainer>
  )
}

export default Message

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding-bottom: 10px;
    >img {
        height: 35px;
        border-radius: 100%;
    }
`;
const MessageInfo = styled.div`
    padding: 5px 10px;
    overflow-x: hidden;
    > h4 {
        font-size: 12px;
        padding-left: 20px;
    }
        > h4 > span {
        color: gray;
        font-weight: 300;
        margin-left: 5px;
        margin-bottom: 5px;
        font-size: 12px;
        position: relative;
    }
    > p {
        font-size: 14px;
        max-width: 800px;
        margin-top: 5px;
        padding: 5px 15px;
        border-radius: 25px;
        border: 1px solid darkgray;
        background-color: #fcfcfc;
        word-wrap: break-word;
    }
`;
