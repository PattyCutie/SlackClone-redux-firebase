import React, { useRef } from 'react'
import SidebarOption from './SidebarOption';
import styled from 'styled-components';
// MUI ICONs
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
    auth,
    db,
    collection,
} from "../firebase"
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebar() {
    const channelsRef = useRef()
    const [user] = useAuthState(auth);
    const roomColRef = collection(db, 'rooms');
    const [channels] = useCollection(roomColRef)

    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>Dev Community</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        Patpicha Sitthitrai
                    </h3>
                </SidebarInfo>
                <SidebarAvatar>
                    <SidebarAvatarBG />
                    <SidebarAvatarUser
                        alt={user?.displayName}
                        src={user?.photoURL}
                    />
                </SidebarAvatar>

            </SidebarHeader>

            <SidebarMenu>
                    <SidebarOption Icon={InsertCommentIcon} title="Threads" />
                    <SidebarOption Icon={InboxIcon} title="Mentions & Reactions" />                           
                    <SidebarOption Icon={DraftsIcon} title="Saved items" />
                <Link
                    to='/channels'
                    style={{ textDecoration: "none", color: "#ffffff" }}>
                    <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
                </Link>
                <SidebarOption Icon={PeopleAltIcon} title="People & User groups" />
                <SidebarOption Icon={AppsIcon} title="Apps"/>
                <SidebarOption Icon={FileCopyIcon} title="File Browser" />
            </SidebarMenu>
            <SidebarChannels>
                <SidebarOption Icon={ExpandLessIcon} title="Show less" />
                <hr />
                <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
                <hr />
                <SidebarOption Icon={AddIcon} title="Add Channels" browsMenuChannels />
            </SidebarChannels>
            
            <SidebarChannelsList channelsRef={channelsRef}>
                {channels?.docs.map((doc) => (
                    <SidebarOption
                        key={doc.id}
                        id={doc.id}
                        title={doc.data().name}
                    />
                ))}
            </SidebarChannelsList>
        </SidebarContainer>
    )
}

export default Sidebar

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 30%;
    max-width: 250px;
    min-width: 180px;
    color: #ffffff;
    background-color: var(--slack-color);    
`;
const SidebarHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #49274b;  
    border-bottom: 1px solid #49274b;
`;
const SidebarInfo = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
    margin-left: 2px;

    > h2 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 5px;
    }
    > h3 {
        display: flex;
        font-size: 14px;
        font-weight: 400;
        align-items: center;
    }
    > h3 > .MuiSvgIcon-root {
        font-size: 12px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`;
const SidebarAvatar = styled.div`
  display: flex;
  flex: 0.2;
  align-items: center;
  padding: 10px;
  position: relative;
`;
const SidebarAvatarBG = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 100%;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    background: linear-gradient(#36C5F0, #2EB67D, #E01E5A, #ECB22E);
    opacity: 0.8;
    animation: blinker ${5}s linear infinite;
    @keyframes blinker {
  50% {
    opacity: 0.2;
  }
}
`;
const SidebarAvatarUser = styled(Avatar)`
   margin: 4px;
   z-index: 2;
   position: absolute;
`;
const SidebarMenu = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin-left: 2px;
`;
const SidebarChannels = styled.div`

    > hr {
        margin-top: 1px;
        margin-bottom: 1px;
        border: 1px solid #49274b;
    }
    > h4 {
    display: flex;
    justify-content: space-between;
    :hover {
    background-color: #340e36;
    opacity: 0.8;
  }
 }
`;
const SidebarChannelsList = styled.div`
    display: flex;
    height: 180px;
    flex-direction: column;
    overflow-y: auto;
    
     /* Firefox */
    scrollbar-width: none;
    scrollbar-color: #49274b #3f0f40;

  /* Chrome, Edge, and Safari */
  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-track {
    background: #3f0f40;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #49274b;
    border-radius: 10px;
    border: 3px solid #3f0f40;
  }
    
`;
