import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            open: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        const res = await fetch('http://localhost/api/v1/countries/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": this.state.name})
        });

        const status = await res.status;
        if(status !== 200){
            alert('Falla al crear el elemento')
        }

    }

    render() {
        return (
            <>
                <Button className='float-right' onClick={() => { this.setState({ open: !this.state.open }) }}>Agregar pais</Button>
                <Modal
                    show={this.state.open}
                    backdrop="static"
                    keyboard={true}>
                    <Modal.Header >
                        <Modal.Title>Agregar Pais</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='container'>
                            <div className='col-12'>
                                <form onSubmit={this.handleSubmit} method='post'>
                                    <input className='col-12 mb-2' type="text" name="name" placeholder='Nombre del tipo' value={this.state.name} onChange={this.handleInputChange} />
                                    <input className='btn btn-primary' type="submit" value="Guardar" />
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