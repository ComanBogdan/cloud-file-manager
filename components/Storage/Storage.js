import React from 'react'
import UserInfo from './UserInfo'
import StorageInfo from './StorageInfo'
import StorageDetailList from './StorageDetailList'

const Storage = () => {
  return (
    <div >
        <UserInfo/>
        <StorageInfo/>
        <StorageDetailList/>
    </div>
  )
}

export default Storage