

import React, { useState } from 'react'

import SingleChat from './SingleChat'

const ChatBox = ({fetchAgain,setFetchAgain}) => {
 
  
  return(
    <div className='flex-1 bg-green-300 p-4 h-full rounded-xl'>
    <SingleChat  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
  </div>
  )
}

export default ChatBox
