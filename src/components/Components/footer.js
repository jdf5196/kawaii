import React from 'react';
import { Link } from 'react-router-dom';
import Player from './player.js';
import Data from '../../../data.js';
import EventEmitter from '../events/events.js';

class Footer extends React.Component{
        constructor(props){
		super(props);
		this.state = {
			latest: Data.podcasts[Data.podcasts.length - 1],
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