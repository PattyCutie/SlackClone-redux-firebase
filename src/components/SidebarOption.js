import React from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { enterRoom } from '../features/appSlice';
import {
  db,
  collection,
  addDoc,
} from "../firebase"

function SidebarOption({ Icon, title, browsMenuChannels, id, chatRef }) {
  const roomColRef = collection(db, 'rooms');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addChannel = () => {
    const channelName = prompt('Please enter the channel name');
    if (channelName) {
      addDoc(roomColRef, {
        name: channelName,
      })
      chatRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom({
        roomId: id,
      }))
      navigate(`/channels/${title.toLowerCase().replace('%20', '-').replace(/[^\w-]+/g, '-')}`)
    }

  }

  return (
    <SidebarOptionContainer
      onClick={browsMenuChannels ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 4 }} />}
      {Icon ? (<h3>{title}</h3>)
        : (<SidebarOptionChannel>
          <span>#</span>{title}
        </SidebarOptionChannel>)
      }
    </SidebarOptionContainer>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  :hover {
    background-color: #340e36;
    opacity: 0.9;
  }
  > h3 {
    font-weight: 400;
  }
  > h3 > span {
    padding: 10px;
  }
`;
const SidebarOptionChannel = styled.h3`
  padding: 5px;
  font-weight: 200;
  `;
