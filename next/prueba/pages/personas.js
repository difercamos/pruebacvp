//Components
import Layout from '../components/Layout';
import Create from '../components/Personas/Create';
import Delete from '../components/Personas/Delete';
import Edit from '../components/Personas/Edit';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: '',
      persons: []
    }
  }

  async componentWillMount() {
    const res = await fetch('http://localhost/api/v1/persons');
    const json = await res.json();
    const status = await res.status;
    this.setState({
      status: status,
      persons: json
    })
  }

  render() {
    if (this.state.status === 200) {
      const list = this.state.persons.map((person) => (
        <tr key={person.id}>
          <td>{person.id}</td>
          <td>{person.name}</td>
          <td>{person.lastName}</td>
          <td>{person.document.name}</td>
          <td>{person.numberDocument}</td>
          <td>{person.age}</td>
          <td>{person.country.name}</td>
          <td>
            <Delete id={person.id} />
          </td>
          <td>
            <Edit id={person.id} />
          </td>
        </tr>));
      return (
        <Layout>
          <div className='container'>
            <div className='row'>
              <div className='col-12 mt-5'>
                <div className='row'>
                  <div className='col-6'>
                    <h1>Listado de Personas</h1>
                  </div>
                  <div className='col-6'>
                    <Create />
                  </div>
                </div>
              </div>
              <div className='col-12 mt-5' style={{ height: 600, overflow: 'auto' }}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Codigo</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Tipo documento</th>
                      <th scope="col">documento</th>
                      <th scope="col">edad</th>
                      <th scope="col">pais</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {list}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Layout>
      );
    }
    return (<>Fallas en el servidor</>);
  }
}