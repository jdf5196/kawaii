import React from 'react';
import { Link, Switch } from 'react-router-dom';
import EventEmitter from '../events/events.js';

class Blog extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			blogs: []
		}
		this.showBlogs.bind(this);
	}
	componentDidMount(){
		EventEmitter.dispatch('scrolled', {data:"scrolled"});
		$.ajax({
            type: 'PUT',
            url: '/getallblogs',
            success: (data)=>{
                this.setState({
					blogs: data
				});
				this.showBlogs();
            }
        })
	}
	showBlogs(){
		this.state.blogs.map((blog)=>{
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