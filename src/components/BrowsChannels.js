import React, { useRef } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import SidebarOption from './SidebarOption'

import {
  db,
  collection,
} from "../firebase"

function BrowsChannels() {
  const channelsRef = useRef()
  const roomColRef = collection(db, 'rooms');
  const [channels] = useCollection(roomColRef)
  

  return (
    <div>
      <h1>Channel Catagory is coming soon</h1>
      <div ref={channelsRef}>
        {channels?.docs.map((doc) => (
          <SidebarOption
            key={doc.id}
            id={doc.id}
            title={doc.data().name}
          />
        ))}
      </div>
    </div>
  )
}

export default BrowsChannels

