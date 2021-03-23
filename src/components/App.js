import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Menu from './Menu'
import Publicaciones from './Publicaciones'
import Usuarios from './Users'

const Tareas = () => <div>Tareas</div>

const App = () => (
  <BrowserRouter>
    <Menu />
    <div  className="margin">
      <Route exact path='/' component={ Usuarios } />
      <Route exact path='/tareas' component={ Tareas } />
      <Route exact path='/publicaciones/:key' component={ Publicaciones } />
    </div>
  </BrowserRouter>
)

export default App