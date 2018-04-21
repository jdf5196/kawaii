import React from 'react';
import { Link, Switch } from 'react-router-dom';
import EventEmitter from '../events/events.js';

class About extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		EventEmitter.dispatch('scrolled', {data:"scrolled"})
	}
	render(){
		return(
			<div className='wrapper'>
                <p>About</p>
			</div>
		)
	}
}

export default About