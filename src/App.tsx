import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { getUsers } from './api/users'
import {Select, message} from 'antd'
import './App.less'

function App() {
  const [users, setUsers] = useState<{label:string;value:string}[]>([])

  useEffect(() => {
    getUserList()
  }, [])

  const getUserList = async () => {
    const res = await getUsers()
    const {data: {Response}} = res
    if(Response.Data) {
      setUsers(Response.Data.map(item => ({label: item.UserName, value: item.UserName})))
      return
    }
    if(Response.Error) {
      message.error(`${Response.Error.Code}, ${Response.Error.Message}`)
    }
  }


  return (
    <>
      <Select options={users} style={{width: 200}}></Select>
    </>
  )
}

export default App
