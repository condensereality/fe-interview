import React from 'react'
import { ICamera, IRigStatus, IServer } from '../../models'
import './style.css';

type Props = {
  rig: IRigStatus
}

const RigStatus = ({ rig }: Props) => {
  return <div className='container'>

    <div className='title'>Rig Status</div>

    <div className='card'>
      <div>{rig.name} ({rig.id})</div>
      <div style={{ textTransform: "capitalize" }}>Status: {rig.status}</div>
      <div>Framerate: {rig.framerate}</div>
    </div>

    <div className='servers'>
      {rig.capture_servers && rig.capture_servers.map((server: IServer, i) => {
        return <div key={i} className='card'>
          <div>Server: {server.id}</div>
          {server.cameras && server.cameras.map((camera: ICamera, i) => {
            return <div key={i}>
              Camera: {camera.id}
            </div>
          })}
        </div>
      })}
    </div>
  </div>
}

export default RigStatus