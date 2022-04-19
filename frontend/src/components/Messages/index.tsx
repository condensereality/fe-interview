import React from 'react'
import { IRigStatus } from '../../models'

import './style.css';

type Props = {
  msgs: IRigStatus[]
}

const Messages = ({ msgs }: Props) => {
  return (
    <div className='Messages'>
      Messages: ({msgs.length}) <hr/>
      {msgs.map((rig: IRigStatus, i) => <div key={i}>
        <span className='Messages_count'>{i}:</span> {rig.name} ({rig.id}) - {rig.status} - {rig.framerate}fps
      </div>)}
    </div>
  )
}

export default Messages