//Components
import Layout from '../components/Layout';
import Delete from '../components/Tipos/Delete';
import Create from '../components/Tipos/Create';
import Edit from '../components/Tipos/Edit';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: '',
      types: []
    }
  }

  async componentWillMount() {
    const res = await fetch('http://localhost/api/v1/types');
    const json = await res.json();
    const status = await res.status;
    this.setState({
      status: status,
      types: json
    })
  }

  render() {
    if (this.state.status === 200) {
      const list = this.state.types.map((type) => (
        <tr key={type.id}>
          <td>{type.id}</td>
          <td>{type.name}</td>
          <td>{type.description}</td>
          <td>
            <Delete id={type.id} />
          </td>
          <td>
            <Edit id={type.id} />
          </td>
        </tr>));
      return (
        <Layout>
          <div className='container'>
            <div className='row'>
              <div className='col-12 mt-5'>
                <div className='row'>
                  <div className='col-6'>
                    <h1>Listado de Tipos de documentos</h1>
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
                      <th scope="col">descripcion</th>
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