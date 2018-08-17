import React from 'react';
import { Link, Switch } from 'react-router-dom';
import EventEmitter from '../events/events.js';

class Episode extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			podcast: {number: 0,
				title: "",
				url: "",
				description: "",
				summary: "",
				soundcloudlink: "",
				rawsoundcloud: "",
				date: "",
				length: "",
				image: "",
				resources: [],
				keywords: []
			}
		}
		this.play = this.play.bind(this);
		this.setHTML = this.setHTML.bind(this);
	}
	componentDidMount(){
		window.scrollTo(0, 0);
		EventEmitter.dispatch('scrolled', {data:"scrolled"});
			$.ajax({
				type:"PUT",
				url:'/getepisode',
				data: {url: this.props.match.params.episodeTitle},
				success: (data)=>{
					console.log(data)
					this.setState({
						podcast: data
					})
					EventEmitter.dispatch('loadPlayer', {episode: this.state.podcast});
					this.setHTML(data.description)
				}
			})
	}
	play(){
		EventEmitter.dispatch('playerChange', {episode: this.state.podcast});
	}
	setHTML(desc){
		let elm = document.getElementById("description");
		elm.innerHTML = desc;
	}
	render(){
		let resources = this.state.podcast.resources.map((r, i)=>{
				return(
					<div key={i}>
						<a href={r.link}><p>{r.title}</p></a>
						<div>
							<p>{r.description}</p>
						</div>
					</div>
				)
			})
		return(
			<div className='wrapper'>
				<div className='homeHeader' style={{backgroundImage:`linear-gradient(rgba(52, 0, 101, 0.4), rgba(0, 0, 0, 0.4)), url(${this.state.podcast.image})`}}>
					<div className='latestContainer'>
						<div className='epiContainer'>
							<div className='latestContents'>
								<h1 className='title'>Episode {this.state.podcast.number}: {this.state.podcast.title}</h1>
								<p className='date'>{this.state.podcast.date} | {this.state.podcast.length}</p>
								<p className='description'>{this.state.podcast.summary}</p>
								<div className='homeBtns'>
								<button onClick={this.play.bind(this)} className='playBtn' id={`${this.state.podcast.title}-play`}>Play Episode</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='descriptionWrapper'>
					<h1>{this.state.podcast.title}</h1>
					<div id='description' className='episodeDescription'>
					</div>
				</div>
				<div className='resourceWrapper'>
					<h2>Resources</h2>
					{resources}
				</div>
			</div>
		)
	}
}

export default Episode