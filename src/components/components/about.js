import React from 'react';

const About = (props)=>{
    return (
        <div className='aboutContainer'>
            <h1 className='latestTitle title'>Behind the Mic</h1>
            <hr />
            <div className='aboutCard'>
                <div className='aboutImage'>
                    <img src='/images/adam.jpg' />
                </div>
                <h2>Adam Eisentrout</h2>
                <h3>Show Host</h3>
                <div className='aboutDescription'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
    )
}

export default About;