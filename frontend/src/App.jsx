import './App.css'
import { Route, Routes } from 'react-router'
import GameModePage from './pages/GameModePage.jsx'
import ComputeLevelPage from './pages/ComputeLevelPage.jsx'
import ComputeBoardlPage from './pages/ComputeBoardlPage.jsx'

import CreaterOnlinePage from './pages/CreaterOnlinePage.jsx'
import UserOnlinePage from './pages/UserOnlinePage.jsx'

import { useEffect } from 'react'
import {setNavigator} from './hook/useNavigate.js'
import { useNavigate } from 'react-router'

function App() {
  // creating custion navigating hook
  const navigate = useNavigate();
  useEffect(() => {
    setNavigator(navigate);
  },[navigate])

  return (
    <>
      <Routes>
        <Route path='/' element={<GameModePage></GameModePage>}/>
        <Route path='/computelevel'  element={<ComputeLevelPage/>}/>
        <Route path='/computelevel/:levelid'  element={<ComputeBoardlPage/>}/>

        <Route path='/createronlineground'  element={<CreaterOnlinePage/>}/>
        <Route path='/useronlineground/:id/:name'  element={<UserOnlinePage/>}/>
      </Routes>
    </>
  )
}

export default App
