import React, { useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import DvrIcon from '@mui/icons-material/Dvr';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function Navbar({setBlog, setProf, setProfUser, username}) {
    const [show, setShow] = useState(false);

  return (
    <div className='Navbar'>
        { !show ? <ArrowBackIosNewIcon className='Icon ArrowIcon' onClick={() => setShow(true)}/> : <ArrowForwardIosIcon className='Icon ArrowIcon' onClick={() => setShow(false)}/>}
        <div style={{display: show ? 'block' : 'none'}}>
            <ChatIcon className='Icon' onClick={() => {setBlog(false); setProf(false)}}/>
            <DvrIcon className='Icon' onClick={() => {setBlog(true); setProf(false)}}/>
            <AccountBoxIcon className='Icon' onClick={() => {setBlog(false); setProf(true); setProfUser(username);}}/>
        </div>
        
    </div>
  )
}

export default Navbar