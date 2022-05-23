import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import logo from "./assets/slack_logo_icon_134008.png"
import BrowsChannels from './components/BrowsChannels'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebase'
import WelcomePage from './components/WelcomePage';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingLogo>
          <img
            style={{ animation: `spin ${5}s linear infinite` }}
            src={logo} alt="sl" />
        </AppLoadingLogo>
      </AppLoading>
    )
  }

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
          <>
            <AppLayout>
          <Header />
          <AppBody>
            <Sidebar />
            <Routes>
                  <Route exact path="/" element={<WelcomePage />}/>
                  <Route path='/channels' element={<BrowsChannels />}/>
                  <Route path="/channels/:title" element={<Chat />} />
            </Routes>
          </AppBody>
        </AppLayout>
        </>
      )}

    </Router>
  );
}

export default App;



const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  > img {
    height: 300px;
    margin: 20px;
@keyframes spin {
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
}
  }
`;
const AppLayout = styled.div`
  height: 100vh;
  background-color: aqua;

`;

const AppBody = styled.div`
  display: flex;
  height: 90%;
  background-color: #ffd1dc;
`;
