import React from 'react'
import NavSearch from './NavSearch'
import NavLogo from './NavLogo'
import NavUser from './NavUser'
import Title from './Title'

const NavMain = () => {
  return (
    <div className='flex justify-between py-1.5 px-6  mx-auto  bg-green-500  shadow-lg'>
      <NavLogo/>
      <Title title="chit"/>
      <NavSearch/>
      <Title title="chat"/>
      
      <NavUser/>
    </div>
  )
}

export default NavMain
