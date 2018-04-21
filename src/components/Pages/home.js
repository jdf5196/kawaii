import React from 'react';
import { Link, Switch } from 'react-router-dom';
import yourname from '../../images/yourname.jpg';
import kawaii from '../../images/kawaii.png';
import trash from '../../images/trash.png';
import Data from '../../../data.js';
import EpisodeList from '../components/epilist.js';
import EventEmitter from '../events/events.js';

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			podcasts: [],
			latest: {},
			scrolled: false
		}
		this.play = this.play.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}
	componentWillMount(){
		this.setState({
			podcasts: Data.podcasts,
			latest: Data.podcasts[Data.podcasts.length - 1]
		});
		window.addEventListener("scroll", (e)=>{
			let offset = document.querySelector(".latestContents").offsetTop - window.pageYOffset;
			if(window.location.pathname === "/"){
				this.handleScroll(offset);
			}
		});
	}
	componentDidMount(){
		let offset = document.querySelector(".latestContents").offsetTop - window.pageYOffset;
		this.handleScroll(offset);
	}
	play(){
		EventEmitter.dispatch('playerChange', {episode: this.state.latest});
	}
	handleScroll(num){
		if(num <= 50 && !this.state.scrolled){
			this.setState({
				scrolled:true
			})
			EventEmitter.dispatch('scrolled', {data:"scrolled"})
		}else if(num > 50){
			this.setState({
				scrolled:false
			})
			EventEmitter.dispatch('scrolled', {data:"unscrolled"})
		}
	}
	render(){
		return(
			<div className='wrapper'>
				<div className='homeHeader' style={{backgroundImage:`linear-gradient(rgba(52, 0, 101, 0.4), rgba(0, 0, 0, 0.4)), url(${this.state.latest.image})`}}>
					<div className='latestContainer'>
						<div className='epiContainer'>
							<div className='latestContents'>
								<h1 className='title'>Episode {this.state.latest.episode}: {this.state.latest.title}</h1>
								<p className='date'>{this.state.latest.date} | {this.state.latest.length}</p>
								<p className='description'>{this.state.latest.description}</p>
								<div className='homeBtns'>
									<button onClick={this.play.bind(this)} className='playBtn' id={`${this.state.title}-play`}>Play Episode</button><button className='playBtn'>More Info</button>
								</div>
								</div>
						</div>
					</div>
				</div>
				<div className='latestEpisodes homeDiv'>
					<br />
					<h1 className='latestTitle title'>Latest Episodes</h1>
					<hr />
					<EpisodeList episodes={this.state.podcasts} />
				</div>
				<div className='support homeDiv'>
					<br />
					<h1 className='supportTitle title'>Support Us</h1>
					<hr />
				</div>
			</div>
		)
	}
}

export default Home