import React from 'react';
import { Link, Switch } from 'react-router-dom';
import Store from '../events/store.js';
import EventEmitter from '../events/events.js';

class Blog extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			blogs: Store.blogs
		}
		this.showBlogs.bind(this);
	}
	componentDidMount(){
		EventEmitter.dispatch('scrolled', {data:"scrolled"});
		if(Store.blogs.length > 0){
			this.showBlogs();
		}else{
			$.ajax({
				type: 'PUT',
				url: '/getallblogs',
				success: (data)=>{
					Store.blogs = data;
					this.setState({
						blogs: data
					});
					this.showBlogs();
				}
			})
		}
	}
	showBlogs(){
		console.log(this.state.blogs)
		this.state.blogs.map((blog)=>{
			console.log("hmm")
			let elm = document.createElement('div');
			elm.innerHTML = blog.html
			let parent = document.querySelector(".wrapper");
			parent.appendChild(elm);
		})
	}
	render(){
		return(
			<div className='wrapper'>
			</div>
		)
	}
}

export default Blog