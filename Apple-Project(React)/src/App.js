import Ads from './Main/Ads';
import './App.css';
import Header from './Header/Nav';
import './Ads.css';

function App() {
    return (
        <div>
            <Header/>
            <main style={{paddingTop:"44px"}}>
                <Ads />
            </main>
            
        </div>
    )
}

export default App