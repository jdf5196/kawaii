import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Data from '../../../data.js';
import EpisodeList from '../components/epilist.js';
import Logo from '../components/logo.js';
import EpisodeEditor from '../components/episodeEditor';
import EventEmitter from '../events/events.js';

class Episodes extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			podcasts: [{title:"Placeholder", soundcloudlink: "placeholder", image: "placeholder", }]
		}
	}
	componentDidMount(){
		window.scrollTo(0, 0)
		EventEmitter.dispatch('scrolled', {data:"scrolled"});
			$.ajax({
				type:"PUT",
				url:'/getallepisodes',
				success: (data)=>{
					if(data.length > 0){
						let casts = [];
						for(let i = data.length - 1; i >=0; i--){
							casts.push(data[i]);
						}
						this.setState({podcasts:casts});
						EventEmitter.dispatch('loadPlayer', {episode: this.state.podcasts[this.state.podcasts.length - 1]})
					}
				}
			})
		}
	render(){
		return(
			<div>
				<div className='epiWrapper'>
					<Logo />
					<br />
					<h1>All Episodes</h1>
					<hr />
				</div>
				<EpisodeList episodes={this.state.podcasts} />
				<EpisodeEditor />
			</div>
		)
	}
}

export default Episodes