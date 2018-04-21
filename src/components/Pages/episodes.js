import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Data from '../../../data.js';
import Episode from './episode';
import EventEmitter from '../events/events.js';

class Episodes extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		EventEmitter.dispatch('scrolled', {data:"scrolled"})
	}
	render(){
		return(
			<div className='wrapper'>
				<p>Episodes</p>
			</div>
		)
	}
}

export default Episodes