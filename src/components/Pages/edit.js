import React from 'react';
import { Link, Switch } from 'react-router-dom';
import EventEmitter from '../events/events.js';
import Quill from 'quill';

class Edit extends React.Component{
	constructor(props){
        super(props);
        this.state = {
            editor: {}
        }
        this.saveBlog = this.saveBlog.bind(this);
        this.submitBlog = this.submitBlog.bind(this);
        this.submitNewEpisode = this.submitNewEpisode.bind(this);
	}
	componentDidMount(){
        var toolbarOptions = [
            [
                'bold', 
                'italic', 
                'underline', 
                'strike', 
                'blockquote', 
                { 'header': 1 }, 
                { 'header': 2 }, 
                { 'list': 'ordered'}, 
                { 'list': 'bullet' }, 
                { 'script': 'sub'}, 
                { 'script': 'super' },
                'image',
                { 'color': [] }, 
                { 'background': [] },
                'clean'
            ]
          ];
		EventEmitter.dispatch('scrolled', {data:"scrolled"})
        let editor = new Quill('#editor', {
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: "Type Text Here...",
            theme: 'snow'
        });
        this.setState({
            editor: editor
        });
        this.setState({
            editor: editor
        });
    }
    saveBlog(){
        let data = this.state.editor.root.innerHTML;
        let output = document.getElementById('editorOutput');
        let preview = document.getElementById('editorpreview');
        output.innerHTML = data;
        preview.classList.add('show');
    }
    submitBlog(){
        let preview = document.getElementById('editorpreview');
        preview.classList.remove('show');
        let data = {
            title: 'Test Blog',
            html: this.state.editor.root.innerHTML
        }
        $.ajax({
            type: 'POST',
            url: '/postnewblog',
            data: data,
            success: (data)=>{
                console.log(data)
            }
        })
    }
    submitNewEpisode(e){
        e.preventDefault();
        let form = new FormData();
        let resources = [];
        let link = document.getElementById("soundcloud").value;
        link = link.split('src="')[1].slice(0, link.split('src="')[1].length - 11);
        form.append("image", document.getElementById("image").files[0]);
        form.append("number", document.getElementById("number").value);
        form.append("title", document.getElementById("title").value);
        form.append("description", document.getElementById("description").value);
        form.append("summary", document.getElementById("summary").value);
        form.append("soundcloud", link)
        form.append("length", document.getElementById("length").value);
        form.append("resources", resources);
        $.ajax({
            type:"POST",
            url:'/postnewepisode',
            data: form,
            contentType: false,
            processData: false,
            success: (data)=>{
                console.log(data)
            }
        })
    }
	render(){
		return(
			<div className='wrapper'>
                <p>Edit</p>
                <div className='editWrapper'>
                    <div id='editor'>
                    </div>
                    <button onClick={this.saveBlog.bind(this)} id='save' className='saveButton'>Preview</button>
                </div>
                <div className='newEpisodeWrapper'>
                    <form id='newEpisodeForm' className='newEpisodeForm'>
                        <input id="title" class='newEpisodeInput' type='text' placeholder='Title' />
                        <input id='number' class='newEpisodeInput' type='text' placeholder="Episode Number" />
                        <textarea id='summary' class='newEpisodeSummary' type='text' placeholder='Summary'></textarea>
                        <textarea id='description' class='newEpisodeText' type='text' placeholder='Description'></textarea>
                        <input id='length' class='newEpisodeInput' type='text' placeholder='Episode Length' />
                        <input id='soundcloud' class='newEpisodeInput' type='text' placeholder='SoundCloud Link' />
                        <input id='image' class='newEpisodeInput' type='file' name="Episode Image" />
                        <input onClick={this.submitNewEpisode} name='image' class='newEpisodeInput' type='submit' value='submit' />
                    </form>
                </div>
                <div id='editorpreview' className='editorpreview'>
                    <div id='editorOutput' className='editorOutput'></div>
                    <button onClick={this.submitBlog.bind(this)} id='submit' className='saveButton'>Submit</button>
                    <button onClick={this.submitBlog.bind(this)} id='submit' className='saveButton'>Cancel</button>
                </div>
			</div>
		)
	}
}

export default Edit