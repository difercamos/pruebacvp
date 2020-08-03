//Components head of Nextjs
import Head from 'next/head';

//Components
import Navbar from './Navbar';

//Component Layout
export default function Layout({ children }) {
    return (
        <main>
            <Head>
                <title>App</title>
                <meta name="author" content="Diego Caicedo" />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <meta name="description" content="App Admin" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
            </Head>
            <Navbar />
            {children}
        </main>
    )
}