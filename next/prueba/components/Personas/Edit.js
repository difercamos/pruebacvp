import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            numberDocument: '',
            genero: '',
            age: '',
            document: '',
            country: '',
            documents: [],
            countries: [],
            persons: '',
            open: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost/api/v1/persons/' + this.props.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((persons) => {
                this.setState({
                    persons: persons,
                    name: persons.name,
                    lastName: persons.lastName,
                    numberDocument: persons.numberDocument,
                    genero: persons.genero,
                    age: persons.age,
                    document: persons.document.id+':'+persons.document.name+':'+persons.document.description,
                    country: persons.country.id+':'+persons.country.name
                })
            });

        fetch('http://localhost/api/v1/types', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((documents) => {
                this.setState({ documents: documents })
            });

        fetch('http://localhost/api/v1/countries', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((countries) => {
                this.setState({ countries: countries })
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(e) {
        this.setState({ open: !this.state.open });
        const document = this.state.document.split(':');
        const country = this.state.country.split(':');
        const body = {
            name: this.state.name,
            lastName: this.state.lastName,
            numberDocument: this.state.numberDocument,
            genero: this.state.genero,
            age: this.state.age,
            document: {
                id: document[0],
                name: document[1],
                description: document[2]
            },
            country: {
                id: country[0],
                name: country[1]
            }
        };

        const res = await fetch('http://localhost/api/v1/persons/'+this.props.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const status = await res.status;
        if (status !== 200) {
            alert('Falla al crear el elemento')
        }

    }

    render() {
        const listItems = this.state.documents.map((document) =>
            <option key={document.id} value={document.id + ':' + document.name + ':' + document.description}>{document.name}</option>
        );
        const listItems2 = this.state.countries.map((country) =>
            <option key={country.id} value={country.id + ':' + country.name}>{country.name}</option>
        );
        return (
            <>
                <Button className='btn-primary' onClick={() => { this.setState({ open: !this.state.open }) }}>Editar</Button>
                <Modal
                    show={this.state.open}
                    backdrop="static"
                    keyboard={true}>
                    <Modal.Header >
                        <Modal.Title>Editar Persona</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='container'>
                            <div className='col-12'>
                                <form onSubmit={this.handleSubmit} method='post'>
                                    <input className='col-12 mb-2' type="text" name="name" placeholder='Nombre' value={this.state.name} onChange={this.handleInputChange} />
                                    <input className='col-12 mb-2' type="text" name="lastName" placeholder='Apellido' value={this.state.lastName} onChange={this.handleInputChange} />
                                    <input className='col-12 mb-2' type="text" name="numberDocument" placeholder='Numero documneto' value={this.state.numberDocument} onChange={this.handleInputChange} />
                                    <input className='col-12 mb-2' type="text" name="genero" placeholder='genero' value={this.state.genero} onChange={this.handleInputChange} />
                                    <input className='col-12 mb-2' type="number" name="age" placeholder='Edad' value={this.state.age} onChange={this.handleInputChange} />
                                    <select className="form-control mb-2" id='document' name='document' value={this.state.document} onChange={this.handleInputChange}>
                                        <option value=''>Seleccione un tipo</option>
                                        {listItems}
                                    </select>
                                    <select className="form-control mb-2" id='country' name='country' value={this.state.country} onChange={this.handleInputChange}>
                                        <option value=''>Seleccione un pais</option>
                                        {listItems2}
                                    </select>
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