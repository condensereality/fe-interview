import React, { useState, useEffect, useRef } from "react";

import { host, wshost } from './constants';
import { IRigStatus } from "./models";
import RigStatus from "./components/RigStatus";
import Messages from "./components/Messages";


type Props = {}


const App: React.FC<Props> = () => {
  const [msgs, updateMessages] = useState<IRigStatus[]>([])
  const [rig, updateRig] = useState<IRigStatus>()
  const stateRef = useRef<IRigStatus[]>([]);
  stateRef.current = msgs;

  useEffect(() => {
    // Register websocket connection and add listener
    const ws = new WebSocket(`${wshost}/ws`);
    ws.onmessage = (event) => {
      const json = JSON.parse(event.data);
      console.log("Received: ", json);
      const newMessages: IRigStatus[] = [...stateRef.current, json]
      updateMessages(newMessages)
      updateRig(json);
    };

    // Fetch initial data from server
    fetch(host)
      .then(response => response.json())
      .then(updateRig);

    return ws.close;
  }, [])

  return (
    <div className='AppContainer'>
      <div>Condense Reality Frontend Test</div>
      {rig && <RigStatus rig={rig} />}
      <Messages msgs={msgs} />
    </div>
  );
};

export default App