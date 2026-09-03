import React from 'react'
import Navbar from '../components/Navbar'
import AdminSidebar from '../components/AdminSidebar'
import Orders from './AddItems'
import List from './List'
import { useParams } from 'react-router-dom'
import AddItems from './AddItems'

const Admin = () => {
  const { page } = useParams();

  return (
    <div>
     {page === 'list' ? <List /> : ''}
     {page === 'additems' ? <AddItems /> : ''}

      

    </div>
  )
}

export default Admin
