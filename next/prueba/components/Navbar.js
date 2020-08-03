import Link from 'next/link'

//Component navbar
export default class extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link href='/'>
                                <a className="nav-link">Paises</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='tipos'>
                                <a className="nav-link">Tipos de documentos</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href='personas'>
                                <a className="nav-link">Personas</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}