import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import MyTasks from './pages/MyTasks'
import FlowDesigner from './pages/FlowDesigner'

function App(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MyTasks />} />
        <Route path="flow-designer" element={<FlowDesigner />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
