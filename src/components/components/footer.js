import React from 'react';
import { Link } from 'react-router-dom';
import Player from './player.js';
import EventEmitter from '../events/events.js';
import Store from '../events/store.js'

class Footer extends React.Component{
        constructor(props){
		super(props);
		this.state = {
			latest: {title: "Podcast", soundcloudlink: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/431155824&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"},
			auto: false,
			loaded: false
		}
	}
	componentWillMount(){
		EventEmitter.subscribe("playerChange", (data)=>{
			if(data.episode === this.state.latest){
				this.player.play();
			}else{
				this.setState({
					auto:true,
					latest: data.episode,
					loaded:true
				})
			}

		});
		EventEmitter.subscribe("loadPlayer", (data)=>{
			if(this.state.loaded){
				return
			}else{
				this.setState({
					latest: data.episode,
					loaded:true
				})
			}
		})
	}
	render(){
                return(
                        <footer className='footer' id='footer'>
                                <Player ref={instance => { this.player = instance; }} auto={this.state.auto} key={this.state.latest.title} instance={this.state.latest.title} title={this.state.latest.title} soundcloudlink={this.state.latest.soundcloudlink}></Player>
                        </footer>
                )
	}
}

export default Footer