import Cart from './components/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals';

const App = () => {
    return (
        <>
            <Cart />
            <Header />
            <main>
                <Meals />
            </main>
        </>
    )
}

export default App;
