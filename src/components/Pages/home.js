import React from 'react';
import { Link } from 'react-router-dom';
import EpisodeList from '../components/epilist.js';
import EpisodeEditor from '../components/episodeEditor.js';
import Logo from '../components/logo.js';
import About from '../components/about.js';
import Contact from '../components/contact.js';
import EventEmitter from '../events/events.js';

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
		this.handleOffset = this.handleOffset.bind(this);
	}
	handleOffset(e){
		let offset = document.querySelector(".latestContents").offsetTop - window.pageYOffset - 25;
			if(window.location.pathname === "/"){
				this.handleScroll(offset);
			}
	}
	componentDidMount(){
		window.scrollTo(0, 0);
		window.addEventListener("scroll", this.handleOffset);
			$.ajax({
				type:"PUT",
				url:'/getfiveepisodes',
				success: (data)=>{
					if(data.length > 0){
						this.setState({
							podcasts: data,
							latest: data[0]
						});
						EventEmitter.dispatch('loadPlayer', {episode: this.state.latest})
					}else{
						return
					}
				}
			})
		let offset = document.querySelector(".latestContents").offsetTop - window.pageYOffset;
		this.handleScroll(offset);
	}
	componentWillUnmount(){
		window.removeEventListener("scroll", this.handleOffset);
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
								<Logo />
								<h1 className='title'>Episode {this.state.latest.number}: {this.state.latest.title}</h1>
								<p className='date'>{this.state.latest.date} | {this.state.latest.length}</p>
								<p className='description'>{this.state.latest.summary}</p>
								<div className='homeBtns'>
									<button onClick={this.play.bind(this)} className='playBtn nonRef' id={`${this.state.latest.title}-play`}>Play Episode</button><Link to={`/episodes/${this.state.latest.url}`} style={{ textDecoration: 'none', height: '50px', width:'110px'}} name='episode' className='playBtn'>More Info</Link>
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
					<Link className='allBtn' to='/episodes'>See all Episodes</Link>
					<About />	
					<Contact />	
					<EpisodeEditor />		
				</div>
			</div>
		)
	}
}

export default Home