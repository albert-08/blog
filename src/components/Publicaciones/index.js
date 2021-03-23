import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'

import * as usersActions from '../../actions/usersActions'
import * as publicacionesActions from '../../actions/publicacionesActions'

const { traerTodos: usersTraerTodos } = usersActions
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions

class Publicaciones extends Component {
    async componentDidMount() {
        const {
            usersTraerTodos,
            publicacionesTraerPorUsuario,
            match: { params: {key} },
            usersReducer
        } = this.props

        if(!this.props.usersReducer.usuarios.length) await usersTraerTodos()
        if(this.props.usersReducer.error) return
        if(!('publicaciones_key' in usersReducer.usuarios[key])) publicacionesTraerPorUsuario(key)
    }

    ponerUsuario = () => {
        const { 
            usersReducer,
            match: { params: {key} }
        } = this.props

        if(usersReducer.error) return <Fatal mensaje={  usersReducer.error } />
        if(!usersReducer.usuarios.length || usersReducer.cargando) return <Spinner />

        const nombre = usersReducer.usuarios[key].name

        return (
            <h1>
                Publicaciones de { nombre }
            </h1>
        )
    }

    ponerPublicaciones = () => {
        const {
            usersReducer,
            usersReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },

        } = this.props
    }

    render() {
        console.log(this.props)
        return (
            <div>
                { this.ponerUsuario() }
                { this.ponerPublicaciones() }
            </div>
        )
    }
}

const mapStateToProps = ({ usersReducer, publicacionesReducer }) => {
    return {
        usersReducer,
        publicacionesReducer
    }
}

const mapDispatchToProps = {
    usersTraerTodos,
    publicacionesTraerPorUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)