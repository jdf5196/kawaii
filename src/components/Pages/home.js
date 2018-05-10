import React from 'react';
import { Link, Switch } from 'react-router-dom';
import yourname from '../../images/yourname.jpg';
import kawaii from '../../images/kawaii.png';
import trash from '../../images/trash.png';
import EpisodeList from '../components/epilist.js';
import EventEmitter from '../events/events.js';
import Store from '../events/store.js';

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			podcasts: [{title:"Placeholder", soundcloudlink: "placeholder", image: "placeholder", }],
			latest: {},
			scrolled: false
		}
		this.play = this.play.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}
	componentWillMount(){
		window.addEventListener("scroll", (e)=>{
			let offset = document.querySelector(".latestContents").offsetTop - window.pageYOffset;
			if(window.location.pathname === "/"){
				this.handleScroll(offset);
			}
		});
	}
	componentDidMount(){
		console.log(Store.podcasts.length);
		if(Store.podcasts.length > 0){
			this.setState({
				podcasts: Store.podcasts,
				latest: Store.podcasts[0]
			});
		}else{
			$.ajax({
				type:"PUT",
				url:'/getallepisodes',
				success: (data)=>{
					if(data.length > 0){
						this.setState({
							podcasts: data,
							latest: data[0]
						});
						Store.podcasts = data;
						EventEmitter.dispatch('loadPlayer', {episode: this.state.latest})
					}else{
						return
					}
				}
			})
		}
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
								<h1 className='title'>Episode {this.state.latest.number}: {this.state.latest.title}</h1>
								<p className='date'>{this.state.latest.date} | {this.state.latest.length}</p>
								<p className='description'>{this.state.latest.summary}</p>
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
				<div className='about homeDiv'>
					<br />
					<h1 className='supportTitle title'>Behind the Mic</h1>
					<hr />

				</div>
			</div>
		)
	}
}

export default Home