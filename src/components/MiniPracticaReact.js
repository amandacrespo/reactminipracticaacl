import React, { Component, createRef } from 'react' 
import axios from 'axios';

export default class MiniPracticaReact extends Component {
    url = 'https://apiejemplos.azurewebsites.net/';

    cajaSelect = createRef();
    cajaInput = createRef();

    state = {
        equipos: null,
        jugadores: null,
    }

    loadEquipos = () => {
        let request = 'api/equipos'

        axios.get(this.url+request)
        .then((response) => {
            this.setState({
                equipos: response.data
            })
        })

    }

    componentDidMount = () =>{
        this.loadEquipos();
    }

    loadJugadores = (e) => {
        e.preventDefault();
        let idEquipo = this.cajaSelect.current.value;
        let request = 'api/Jugadores/JugadoresEquipos/'+idEquipo;
        axios.get(this.url+request)
        .then((response) => {
            this.setState({
                jugadores: response.data
            })
        })
    }

    filtrarJugadores = (e) => {
        e.preventDefault();
        let nombre = this.cajaInput.current.value;
        let request = 'api/Jugadores/FindJugadores/'+nombre;

        axios.get(this.url+request)
        .then((response) => {
            this.setState({
                jugadores: response.data
            })
        })
        .catch((error)=>{
            this.setState({
                jugadores: null
            })
        })
    }

    render() {
        return (
            <div>
               <h1>Mini Practica React</h1> 
               <form>
                    <label>Nombre jugador: </label>
                    <input type="text" ref={this.cajaInput}/>
                    <button onClick={this.filtrarJugadores}>Buscar por nombre</button>
               </form>
               <hr/>
               <form>
                    <label>Seleccione un equipo: </label>
                    <select ref={this.cajaSelect}>
                        {
                            this.state.equipos && (
                                this.state.equipos.map((equipo, index)=>{
                                    return (<option key={index} value={equipo.idEquipo}>{equipo.nombre}</option>)
                                })
                            )
                        }
                    </select>
                    <button onClick={this.loadJugadores}>Buscar jugadores</button>
               </form>
               <br/>
               {
                this.state.jugadores && (
                    <table border='1'>
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Posición</th>
                                <th>País</th>
                                <th>Fecha Nacimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.jugadores.map((jugador, index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img src={jugador.imagen} alt={jugador.nombre} width='100px' height='100px'/>
                                            </td>
                                            <td>{jugador.nombre}</td>
                                            <td>{jugador.posicion}</td>
                                            <td>{jugador.pais}</td>
                                            <td>{jugador.fechaNacimiento}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                )
               }
            </div>
        )
    }
}
