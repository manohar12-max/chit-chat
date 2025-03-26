import React from 'react'
import Avatar from '../Avatar/Avatar'
import { getSenderFull } from '@/folder/ChatLogics'

const UserInfo = ({user,selectedChat}) => {
    const sender=getSenderFull(user,selectedChat.users)
  return (
    <div className='flex gap-1'>
      <Avatar pic={sender.pic}/>
      {sender.name}
    </div>
  )
}

export default UserInfo
