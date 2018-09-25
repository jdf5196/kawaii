import React from 'react';

const About = (props)=>{
    return (
        <div className='aboutContainer'>
            <h1 className='latestTitle title'>About Kawaii Trash</h1>
            <hr />
            <div className='aboutCard'>
                <div className='aboutImage'>
                    <img src='/images/adam.jpg' />
                </div>
                <h2>Adam Eisentrout</h2>
                <h3>Show Host</h3>
                <div className='aboutDescription'>
                    <p>Kawaii Trash is a podcast about horror, film, music, anime, manga, comics, and video games. We discuss topics in the form of an imagined toy out of a gashapon or capsule toy.</p>
                    <p>Adam Eisentrout is the host of Kawaii Trash. He is a filmmaker and writer from Pittsburgh, PA. He frequents Letterboxd, where he reviews and rates films. Kawaii Trash was made out of the hope to expand the awareness of all things trashy, cute, and obscure.</p>
                </div>
            </div>
        </div>
    )
}

export default About;