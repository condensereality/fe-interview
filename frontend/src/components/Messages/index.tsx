import React from 'react'
import { IRigStatus } from '../../models'

import './style.css';

type Props = {
  msgs: IRigStatus[]
}

const Messages = ({ msgs }: Props) => {
  return (
    <div className='Messages'>
      Total # messages: {msgs.length}
      {msgs.map((rig: IRigStatus, i) => <div key={i}>
        {i}: {rig.name} - {rig.status}
      </div>)}
    </div>
  )
}

export default Messages