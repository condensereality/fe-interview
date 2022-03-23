import React from 'react'
import { ICamera, IRigStatus, IServer } from '../../models'
import './rigStatus.css'
import Status from '../Status'


type Props = {
  rig: IRigStatus
}

const RigStatus = ({ rig }: Props) => {
  return <div style={{ flexGrow: 2 }} className={'rig-status-container'}>
    <div className={'rig-status-title'}>RigStatus:</div>
    <div className={'rig-status-info'}>
      <div className={'rig-status-info_name'}>{rig.name} ({rig.id})</div>
      <Status status={rig.status} />
      <div className={'rig-status-info_framrate'}>Framerate: {rig.framerate}</div>
    </div>
    {rig.capture_servers ? rig.capture_servers.map((server: IServer, i) => {
      return <div key={i}>
        Server: {server.id}
        {server.cameras && server.cameras.map((camera: ICamera, i) => {
          return <div key={i}>
            Camera: {camera.id}
          </div>
        })}
      </div>
    })
  :
  <div>NO SERVER!!!</div>}
  </div>
}

export default RigStatus