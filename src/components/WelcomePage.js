import React from 'react'

function WelcomePage() {
  return (
    <div>
      <div style={{ padding: "100px" }}>
        <h1>Welcome to Slack Clone</h1>
        <h2>This project made for education purpose and developed by Patpicha S.</h2>
        <p>Get start with Slack clone version 1.0</p>
     
      <div >
        <ul >
        <li>User login to the app with Google authenticate(sign in with google popup)</li>
        <li>Click "Add channels to add the chat room</li>
        <li>Choose the chat room to from the list below the "Add channels" button</li>
        <li>Click at "channel browser" to explor the existing channels</li>
        </ul>
      </div>
      <div >
        <h3 >
          Main tech stacks used in this project
        </h3>
        <ul >
        <li>React & Redux</li>
        <li>Firbase & Google authenticate</li>
        </ul>
        </div> 
      </div>  
    </div>
  )
}

export default WelcomePage