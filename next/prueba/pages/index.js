//Components
import Layout from '../components/Layout';
import Delete from '../components/Pais/Delete';
import Create from '../components/Pais/Create';
import Edit from '../components/Pais/Edit';

export default class extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      status: '',
      countries: []
    }
  }

  async componentWillMount(){
    const res = await fetch('http://localhost/api/v1/countries');
    const json = await res.json();
    const status = await res.status;
    this.setState({
      status: status,
      countries: json
    })
  }

  render() {
    if (this.state.status === 200) {
      const list = this.state.countries.map((country) => (
        <tr key={country.id}>
          <td>{country.id}</td>
          <td>{country.name}</td>
          <td>
            <Delete id={country.id} />
          </td>
          <td>
            <Edit id={country.id} />
          </td>
        </tr>));
      return (
        <Layout>
          <div className='container'>
            <div className='row'>
              <div className='col-12 mt-5'>
                <div className='row'>
                  <div className='col-6'>
                    <h1>Listado de paises</h1>
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