import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            type: '',
            open: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount = () =>{
        fetch('http://localhost/api/v1/types/'+this.props.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((type) => this.setState({type: type, name: type.name, description: type.description}));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit() {
        this.setState({ open: !this.state.open });

        const res = await fetch('http://localhost/api/v1/types/'+this.props.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"id": this.props.id, "name": this.state.name, "description": this.state.description})
        });

        const status = await res.status;
        if(status !== 200){
            alert('Falla al actulizar el elemento')
        }

    }

    render() {
        return (
            <>
                <Button className='btn-primary' onClick={() => { this.setState({ open: !this.state.open }) }}>Editar</Button>
                <Modal
                    show={this.state.open}
                    backdrop="static"
                    keyboard={true}>
                    <Modal.Header >
                        <Modal.Title>Agregar Tipo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='container'>
                            <div className='col-12'>
                                <form onSubmit={this.handleSubmit} method='post'>
                                    <input className='col-12 mb-2' type="text" name="name" placeholder='Nombre del tipo' value={this.state.name} onChange={this.handleInputChange} />
                                    <input className='col-12 mb-2' type="text" name="description" placeholder='descripcion del tipo' value={this.state.description} onChange={this.handleInputChange} />
                                    <input className='btn btn-primary' type="submit" value="Actualizar" />
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit' variant="secondary" onClick={() => { this.setState({ open: !this.state.open }) }}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}