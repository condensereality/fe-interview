import React from 'react'



const Status = ({status}) => {

  return <div className={'rig-status-info_status'} style={{ textTransform: "capitalize" }}>
    Status:  {status}
  </div>
}

export default Status