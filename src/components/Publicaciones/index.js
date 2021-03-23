import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import Comentarios from './Comentarios'

import * as usersActions from '../../actions/usersActions'
import * as publicacionesActions from '../../actions/publicacionesActions'

const { traerTodos: usersTraerTodos } = usersActions
const { 
        traerPorUsuario: publicacionesTraerPorUsuario, 
        abrirCerrar,
        traerComentarios
    } = publicacionesActions

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
            match: { params: { key } }
        } = this.props

        if(!usuarios.length) return
        if(usersReducer.error) return

        if(publicacionesReducer.cargando) return <Spinner />
        if(publicacionesReducer.error) return <Fatal mensaje={ publicacionesReducer.error } />
        if(!publicaciones.length) return
        if(!('publicaciones_key' in usuarios[key])) return

        const { publicaciones_key } = usuarios[key]

        return this.mostrarInfo(publicaciones[publicaciones_key], publicaciones_key)
    }

    mostrarInfo = (publicaciones, pub_key) => (
        publicaciones.map((publicacion, com_key) => (
            <div 
                className="pub_titulo"
                key={ publicacion.id }
                onClick={ () => this.mostrarComentario(pub_key, com_key, publicacion.comentarios) }    
            >
                <h2>
                    { publicacion.title }
                </h2>
                <h3>
                    { publicacion.body }
                </h3>
                {
                    (publicacion.abierto) ? <Comentarios comentarios={ publicacion.comentarios } /> : ''
                }
            </div>
        ))
    )

    mostrarComentario = (pub_key, com_key, comentarios) => {
        this.props.abrirCerrar(pub_key, com_key)
        if(!comentarios.length) this.props.traerComentarios(pub_key, com_key)

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
    publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)