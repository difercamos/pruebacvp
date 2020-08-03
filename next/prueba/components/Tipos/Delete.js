import Link from 'next/link'

//Component navbar
export default class extends React.Component {
    Eliminar = async () => {
        const res = await fetch('http://localhost/api/v1/types/' + this.props.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const status = await res.status;

        if(status !== 200){
            alert('Fallo en la eliminacion del elemento')
        }
        window.location.reload(true);
    }
    render() {
        return (
            <>
                <form method='post' onSubmit={this.Eliminar}>
                    <input type='submit' className='btn btn-danger' value='Eliminar' />
                </form>
            </>
        );
    }
}