import AppRouter from "./components/AppRouter"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"

const AppContent = () => {

    return (
        <>
            <Header />
            <AppRouter />
            <Footer />
        </>
    )
}

export default AppContent