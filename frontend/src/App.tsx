import React from 'react';

import { host, wshost } from './constants';
import { IRigStatus } from "./models";
import Messages from './components/Messages';
import RigStatus from './components/RigStatus';

interface AppProps { }

interface AppState {
  msgs: IRigStatus[];
  rig?: IRigStatus;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    msgs: [],
    rig: undefined,
  }

  ws: WebSocket | undefined;

  handleMsgUpdate = (msg: IRigStatus) => {
    const oldMsgs = this.state.msgs;
    const msgs = [...oldMsgs, msg];
    this.setState({ msgs, rig: msg })
  }

  componentDidMount() {
    // Register websocket connection and add listener
    this.ws = new WebSocket(`${wshost}/ws`);
    this.ws.onmessage = (event) => {
      const json = JSON.parse(event.data);
      console.log("Received: ", json);
      this.handleMsgUpdate(json);
    };

    // Fetch initial data from server 
    fetch(host)
      .then(response => response.json())
      .then(rig => {
        this.setState({ rig })
      });
  }

  componentWillUnmount() {
    if (this.ws) this.ws.close();
  }

  render() {
    const { msgs, rig } = this.state;
    return (
      <div className='AppContainer'>
        {rig && <RigStatus rig={rig} />}
        <Messages msgs={msgs} />
      </div>
    );
  }
}

export default App