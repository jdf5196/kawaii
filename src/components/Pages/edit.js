import React from 'react';
import { Link, Switch } from 'react-router-dom';
import EventEmitter from '../events/events.js';
import Quill from 'quill';

class Edit extends React.Component{
	constructor(props){
        super(props);
        this.state = {
            editor: {},
            epiSummary: {}
        }
        this.saveBlog = this.saveBlog.bind(this);
        this.submitBlog = this.submitBlog.bind(this);
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
        let newEpiSummary = new Quill('#newEpiSummary', {
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: "Type Episode Summary Here...",
            theme: 'snow'
        });
        this.setState({
            editor: editor,
            epiSummary: newEpiSummary
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
    submitNewEpisode(){

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
                        <input type='text' placeholder='Title' />
                        <input type='text' placeholder='Description' />
                        <input type='text' placeholder='SoundCloud Link' />
                        <input type='file' name="Episode Image" />
                        <div id='newEpiSummary'></div>
                        <input type='submit' value='submit' />
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