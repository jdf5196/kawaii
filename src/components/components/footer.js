import React from 'react';
import { Link } from 'react-router-dom';
import Player from './player.js';
import EventEmitter from '../events/events.js';

class Footer extends React.Component{
        constructor(props){
		super(props);
		this.state = {
			latest: {title: "Podcast", soundcloudlink: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/431155824&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"},
			auto: false
		}
	}
	componentWillMount(){
		EventEmitter.subscribe("playerChange", (data)=>{
			if(data.episode === this.state.latest){
				EventEmitter.dispatch('sameEpisode', {data:'Play'});
			}else{
				this.setState({
					auto:true,
					latest: data.episode,
				})
			}
		});
		EventEmitter.subscribe("loadPlayer", (data)=>{
			this.setState({
				latest: data.episode
			})
		})
	}
	render(){
                return(
                        <footer className='footer' id='footer'>
                                <Player auto={this.state.auto} key={this.state.latest.title} instance={this.state.latest.title} title={this.state.latest.title} soundcloudlink={this.state.latest.soundcloudlink}></Player>
                        </footer>
                )
	}
}

export default Footer