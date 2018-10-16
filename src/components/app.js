import React from 'react';
import {Route} from 'react-router-dom';
import Home from './Pages/home.js';
import Episodes from './Pages/episodes.js';
import Episode from './Pages/episode.js';
import Navbar from './components/navbar.js';
import Dev from './components/dev.js';
import Footer from './components/footer.js';
import Edit from './Pages/edit.js';
import '../../node_modules/toastr/toastr.scss';

class App extends React.Component {
    render(){
        return (
            <div id='appWrapper'>
                <Navbar />
                <Route exact path='/' component={Home} />
                <Route exact path='/episodes' component={Episodes} />
                <Route exact path='/episodes/:episodeTitle' component={Episode} />
                <Route exact path='/edit' component={Edit} />
                <Dev />
                <Footer />
            </div>
        )
    }
}

export default App
