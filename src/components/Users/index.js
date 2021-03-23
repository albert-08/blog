import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import Table from './Table'

import * as usersActions from '../../actions/usersActions'

class Users extends Component {

  componentDidMount() {
    if(!this.props.usuarios.length) this.props.traerTodos()
  }

  ponerContenido = () => {
    if(this.props.cargando) return <Spinner />

    if(this.props.error) return <Fatal mensaje={ this.props.error } />

    return <Table />
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <h1>Users</h1>
        { this.ponerContenido() }
      </div>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer
}

export default connect(mapStateToProps, usersActions)(Users)