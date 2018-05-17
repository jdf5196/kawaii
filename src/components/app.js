import React from 'react';
import {Route} from 'react-router-dom';
import Home from './Pages/home.js';
import About from './Pages/about.js';
import Episodes from './Pages/episodes.js';
import Episode from './Pages/episode.js';
import Blog from './Pages/blog.js';
import Navbar from './components/navbar.js';
import Footer from './components/footer.js';
import Edit from './Pages/edit.js';
import Social from './components/social.js';

class App extends React.Component {
    render(){
        return (
            <div id='appWrapper'>
                <Navbar />
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/episodes' component={Episodes} />
                <Route exact path='/episodes/:episodeTitle' component={Episode} />
                <Route exact path='/blog' component={Blog} />
                <Route exact path='/edit' component={Edit} />
                <Footer />
            </div>
        )
    }
}

export default App