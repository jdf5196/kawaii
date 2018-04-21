import React from 'react';
import { Link, Switch } from 'react-router-dom';
import EventEmitter from '../events/events.js';

class Episode extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		EventEmitter.dispatch('scrolled', {data:"scrolled"})
	}
	render(){
		return(
			<div className='wrapper'>
                <p>{this.props.match.params.episodeTitle}</p>
			</div>
		)
	}
}

export default Episode