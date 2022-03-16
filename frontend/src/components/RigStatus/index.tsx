import React from 'react'
import { ICamera, IRigStatus, IServer } from '../../models'

type Props = {
  rig: IRigStatus
}

const RigStatus = ({ rig }: Props) => {
  return <div style={{ flexGrow: 2 }}>
    <div>RigStatus:</div>
    <div>
      {rig.name} ({rig.id})
      <div style={{ textTransform: "capitalize" }}>Status: {rig.status}</div>
      <div>Framerate: {rig.framerate}</div>
    </div>
    {rig.capture_servers && rig.capture_servers.map((server: IServer, i) => {
      return <div key={i}>
        Server: {server.id}
        {server.cameras && server.cameras.map((camera: ICamera, i) => {
          return <div key={i}>
            Camera: {camera.id}
          </div>
        })}
      </div>
    })}
  </div>
}

export default RigStatus