
import Footer from './Footer'
import Header from './Header'
import styles from './Layout.module.css'

function Layout({ children, title = "World Ranks" }) {


    return (
        <div className={styles.container}>
            <Header title={title} />
            <main className={styles.main}> {children} </main>
            <Footer />
        </div>
    )
}

export default Layout
