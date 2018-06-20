import React from 'react';
import { Link, Switch } from 'react-router-dom';
import EventEmitter from '../events/events.js';
import Auth from '../events/auth.js';
import Quill from 'quill';
import Toastr from 'toastr';

class Edit extends React.Component{
	constructor(props){
        super(props);
        this.state = {
            editors: {new:"", old:[]},
            episodes: [],
            updated:false,
            newResources: [{description: "", link: "", title: ""}, {description: "", link:"", title: ""}]
        }
        this.loginForm = this.loginForm.bind(this);
        this.login = this.login.bind(this);
        this.newEpisodeForm = this.newEpisodeForm.bind(this);
        this.saveBlog = this.saveBlog.bind(this);
        this.submitBlog = this.submitBlog.bind(this);
        this.submitNewEpisode = this.submitNewEpisode.bind(this);
        this.register = this.register.bind(this);
        this.getAllEpisodes = this.getAllEpisodes.bind(this);
        this.showAllEpisodes = this.showAllEpisodes.bind(this);
        this.createEditor = this.createEditor.bind(this);
        this.logout = this.logout.bind(this);
        this.showQuills = this.showQuills.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.expandEpisode = this.expandEpisode.bind(this);
        this.deleteInput = this.deleteInput.bind(this);
        this.addInput = this.addInput.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }
    componentWillMount(){
        if(Auth.isLoggedIn()){
            this.getAllEpisodes();
        }
    }
	componentDidMount(){
        EventEmitter.dispatch('scrolled', {data:"scrolled"})
        if(Auth.isLoggedIn()){
            this.createEditor("description", "new", null);
            setTimeout(()=>{
                this.showQuills();
            }, 0)
        }
    }
    loginForm(){
        if(Auth.isLoggedIn()){
            return (
                <div className='logout logDiv'>
                    <button onClick={this.logout.bind(this, event)} className='logoutBtn'>Log Out</button>
                    <form autoComplete="off" id='changePw'>
                        <p>Change Password</p>
                        <input autoComplete="off" id='currentPw' type='password' required placeholder='Current Password' />
                        <input autoComplete="off" id='newPw' type='password' required placeholder='New Password' />
                        <button className='changeBtn' type='submit' onClick={this.changePassword.bind(this)}>Change Password</button>                    
                    </form>
                </div>
            )
        }else{
            return (
                <div className='login logDiv'>
                    <form id='register'>
                        <p>Register</p>
                        <input id='name' type='text' required placeholder='Username' />
                        <input id='email' type='text' required placeholder='Email' />
                        <input onClick={this.register.bind(this)} type='submit' value='Submit' />
                    </form>
                    <form id='loginForm'>
                        <p>Login</p>
                        <input id='username' type='text' required placeholder='Username' />
                        <input id='pw' type='password' required placeholder='Password' />
                        <input type='submit' onClick={this.login.bind(this)} value='Submit' />
                    </form>
                </div>
            )
        }
    }
    newEpisodeForm(){
        if(Auth.isLoggedIn()){
            return (
                <div className='newEpisodeWrapper'>
                    <button onClick={(e)=>{this.expandEpisode(e)}} className='collapsible'>Add new episode</button>
                    <form id='newEpisodeForm' className='newEpisodeForm hid'>
                        <input id="title" className='newEpisodeInput' type='text' placeholder='Title' />
                        <input id='number' className='newEpisodeInput' type='text' placeholder="Episode Number" />
                        <input id='length' className='newEpisodeInput' type='text' placeholder='Episode Length' />
                        <label htmlFor="image" className='selectLabel'>Select Image</label>
                        <input id='image' className='newEpisodeInput' type='file' name="Episode Image" />
                        <input id='soundcloud' className='newEpisodeInput' type='text' placeholder='SoundCloud Link' />
                        <textarea id='summary' className='newEpisodeSummary' type='text' placeholder='Short Summary'></textarea>
                        <div id='description' className='newEpisodeText' type='text' placeholder='Description'></div>
                        {this.state.newResources.map((r, i)=>{
                            return(
                                <div className='resource' key={i}>
                                    <p>Resource {i+1}</p>
                                    <input onChange={(e)=>{this.changeInput(e, i, 'title')}} value={r.title} className='newEpisodeInput' type='text' placeholder='Resource Title' />
                                    <input onChange={(e)=>{this.changeInput(e, i, 'description')}} value={r.description} className='newEpisodeInput' type='text' placeholder='Resource Description' />
                                    <input onChange={(e)=>{this.changeInput(e, i, 'link')}} className='newEpisodeInput' value={r.link} type='text' placeholder='Resource Link' />
                                    <div className='resourceBtn delete' onClick={()=>{this.deleteInput(i)}}>Delete</div>
                                </div>
                            )
                        })}
                        <div className='resourceBtn add' onClick={()=>{this.addInput()}}>Add +</div>
                        <input onClick={this.submitNewEpisode} name='image' className='newEpisodeInput' type='submit' value='submit' />
                    </form>
                </div>
            )
        }else{
            return
        }
    }
    changeInput(e, i, type){
        let resources = this.state.newResources;
        resources[i][type] = e.target.value;
        this.setState({
            newResources: resources
        })
    }
    deleteInput(i){
        let arr = [...this.state.newResources.slice(0, i), ...this.state.newResources.slice(i +1, this.state.newResources.length)];
        this.setState({
            newResources: arr
        })
    }
    addInput(){
        let arr = [...this.state.newResources, {description: "", link: ""}];
        this.setState({
            newResources: arr
        })
    }
    createEditor(id, type, desc){
        let toolbarOptions = [
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
        let editor = new Quill(`#${id}`, {
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: "Type Full Description Here...",
            theme: 'snow'
        });
        var imgHandler = ()=>{
            console.log('a')
        }
        editor.getModule("toolbar").addHandler("image", imgHandler);
        if(type === "new"){
            let edits = this.state.editors;
            edits.new = editor;
            this.setState({
                editors:edits
            });
        }else{
            editor.root.innerHTML = desc;
            let edits = this.state.editors;
            edits.old.push(editor);
            this.setState({
                editors: edits
            })
        }
    }
    getAllEpisodes(){
        $.ajax({
            type:"PUT",
            url:'/getallepisodes',
            success: (data)=>{
                if(data.length > 0){
                    this.setState({
                        episodes: data
                    });
                }else{
                    return
                }
            }
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
            },
			beforeSend: (xhr, settings)=>{
				xhr.setRequestHeader('Authorization', 'Bearer ' + Auth.getToken())
			}
        })
    }
    submitNewEpisode(e){
        e.preventDefault();
        let form = new FormData();
        let resources = [];
        let link = document.getElementById("soundcloud").value;
        let nlink = link.split('src="')[1].slice(0, link.split('src="')[1].length - 11);
        form.append("image", document.getElementById("image").files[0]);
        form.append("number", document.getElementById("number").value);
        form.append("title", document.getElementById("title").value);
        form.append("description", this.state.editors.new.root.innerHTML);
        form.append("summary", document.getElementById("summary").value);
        form.append("soundcloud", nlink);
        form.append("rawsoundcloud", link);
        form.append("length", document.getElementById("length").value);
        form.append("resources", resources);
        form.append("userid", Auth.currentUserID());
        console.log(form);
        $.ajax({
            type:"POST",
            url:'/postnewepisode',
            data: form,
            contentType: false,
            processData: false,
            success: (data)=>{
                let episodes = this.state.episodes;
                episodes.push(data);
                this.setState({
                    episodes:episodes
                });
                document.getElementById("image").value = "";
                document.getElementById("number").value = "";
                document.getElementById("title").value = "";
                document.getElementById("summary").value = "";
                document.getElementById("length").value = "";
                this.state.editors.new.setContents([{ insert: '\n' }]);
                document.getElementById("soundcloud").value = "";
                setTimeout(()=>{
                    this.createEditor("e-"+data._id + "-description", "old", data.description);
                }, 0)
            },
			beforeSend: (xhr, settings)=>{
				xhr.setRequestHeader('Authorization', 'Bearer ' + Auth.getToken())
			}
        })
    }
    register(e){
        e.preventDefault();
        let data = {
            name: document.getElementById("name").value,
            email: document.getElementById('email').value
        }
        $.ajax({
            type: "POST",
            url: '/register',
            data: data,
            success: (d)=>{
                Toastr.options.positionClass = 'toast-top-center';
                Toastr.success('You have been registered. Login details have been sent to the administrator.')
            }
        })
    }
    login(e){
        e.preventDefault();
        let data = {
            username: document.getElementById("username").value,
            password: document.getElementById("pw").value
        }
        $.ajax({
            type: "POST",
            url: '/login',
            data: data,
            success: (data)=>{
                Auth.saveToken(data.token);
                this.setState(this.state);
                Toastr.options.positionClass = 'toast-top-center';
                Toastr.success("You Are Logged In");
                this.createEditor("description", "new", null);
                document.getElementById("username").value = "";
                document.getElementById("pw").value = "";
                this.showQuills();
            },
            error: (data)=>{
				Toastr.options.positionClass = 'toast-top-center';
				Toastr.error("Incorrect Username or Password");
			}
        })
    }
    changePassword(e){
        e.preventDefault();
        let data = {
            id: Auth.currentUserID,
            username: Auth.currentName,
            password: document.getElementById('currentPw').value,
            newPw: document.getElementById('newPw').value 
        }
        $.ajax({
            type: 'PUT',
            url: `/changepassword/`,
            data: data,
            success: (data)=>{
                Toastr.options.positionClass = 'toast-top-center';
                Toastr.success("Password has been changed");
                document.getElementById('currentPw').value = "";
                document.getElementById('newPw').value = "";
            },
            error: (data)=>{
                Toastr.options.positionClass = 'toast-top-center';
				Toastr.error("Error. Password not changed");
            },
            beforeSend: (xhr, settings)=>{
				xhr.setRequestHeader('Authorization', 'Bearer ' + Auth.getToken())
			}
        })
    }
    logout(e){
        e.preventDefault();
        Auth.logout();
        this.setState(this.state);
        Toastr.options.positionClass = 'toast-top-center';
		Toastr.error("You Have Logged Out");
    }
    confirmDelete(id, index){
        let c = confirm("Are you sure you want to delete this episode?");
        if(c){
            this.deleteEpisode(id, index);
        }else{return}
    }
    showAllEpisodes(){
        console.log(Auth.isLoggedIn());
        if(Auth.isLoggedIn() && this.state.episodes.length > 0){
            let episodes = this.state.episodes.map((epi, index)=>{
                let image = ()=>{
                    if(epi.image !== ""){
                        return(<div><img className='newEpisodeImage' src={epi.image} />
                                <button onClick={this.deleteImage.bind(this, event, index)} className='deleteImage'>Delete Image</button></div>
                        )
                    }else{
                        return(<input id={"e-"+epi._id+"-image"} className='newEpisodeInput' type='file' name="Episode Image" />)
                    }
                }
                let resources = epi.resources.map((r, i)=>{
                    return(
                        <div>
                            <p>Resource {i+1}</p>
                            <input onChange={(e)=>{this.changeInput(e, i, 'title')}} value={r.title} className='newEpisodeInput' type='text' placeholder='Resource Title' />
                            <input onChange={(e)=>{this.changeInput(e, i, 'description')}} value={r.description} className='newEpisodeInput' type='text' placeholder='Resource Description' />
                            <input onChange={(e)=>{this.changeInput(e, i, 'link')}} className='newEpisodeInput' value={r.link} type='text' placeholder='Resource Link' />
                            <div className='resourceBtn delete' onClick={()=>{this.deleteInput(i)}}>x</div>
                        </div>
                    )
                })
                return (<div className='newEpisodeWrapper'>
                            <button onClick={(e)=>{this.expandEpisode(e)}} className='collapsible'>{epi.title}</button>
                            <form id={epi.title+'-form'} key={epi.title} className='newEpisodeForm hid'>
                                <input id={"e-"+epi._id+"-titleInput"} className='newEpisodeInput' type='text' defaultValue={epi.title} placeholder='Title' />
                                <input id={"e-"+epi._id+"-numberInput"}  className='newEpisodeInput' type='text' defaultValue={epi.number} placeholder='Episode Number' />
                                <input id={"e-"+epi._id+"-lengthInput"} className='newEpisodeInput' type='text' defaultValue={epi.length} placeholder='Episode Length' />
                                <input id={"e-"+epi._id+"-dateInput"} className='newEpisodeInput' type='text' defaultValue={epi.date} placeholder="Upload Date" />
                                <input id={"e-"+epi._id+"-soundcloudInput"} className='newEpisodeInput' type='text' defaultValue={epi.rawsoundcloud} placeholder='SoundCloud Link' />
                                <input id={"e-"+epi._id+"-urlInput"} className='newEpisodeInput' type='text' defaultValue={epi.url} placeholder='URL Text' />
                                {image()}
                                {resources}
                                <textarea id={"e-"+epi._id+"-summaryInput"} className='newEpisodeSummary' type='text' defaultValue={epi.summary} placeholder='Short Summary'></textarea>
                                <div id={"e-"+epi._id + "-description"} className='newEpisodeText' type='text' placeholder='Description'></div>
                                <button onClick={this.updateEpisode.bind(this, event, index, epi._id)} className='newEpisodeInput'>Save</button>
                                <button onClick={this.confirmDelete.bind(this, epi._id, index)} className='newEpisodeInput'>Delete</button>
                            </form>
                        </div>
                    )
            });
            return <div className='allEpisodes'>{episodes}</div>
        }else{
            return
        }
    }
    expandEpisode(e){
        e.persist();
        console.log(e.target.nextElementSibling);
        e.target.nextElementSibling.classList.toggle('hid')
    }
    deleteImage(e, i){
        e.preventDefault();
        let episodes = this.state.episodes;
        let ep = this.state.episodes[i];
        ep.image = "";
        episodes[i] = ep;
        this.setState({episodes: episodes});
    
    }
    showQuills(){
        if(this.state.episodes.length > 0){
            for(let i in this.state.episodes){
                console.log(this.state.episodes[i].descriptionContent);
                this.createEditor("e-"+this.state.episodes[i]._id + "-description", "old", this.state.episodes[i].description);
            }
        }
    }
    updateEpisode(e, i, id){
        e.stopImmediatePropagation()
        e.preventDefault();
        let form = new FormData();
        let data;
        let resources = [];
        let link = document.getElementById("e-"+id+"-soundcloudInput").value;
        let nlink = link.split('src="')[1].slice(0, link.split('src="')[1].length - 11);
        let url;
        if(this.state.episodes[i].image === ""){
            form.append("image", document.getElementById("e-"+id+"-image").files[0]);
            form.append("id", id);
            form.append("number", document.getElementById("e-"+id+"-numberInput").value);
            form.append("title", document.getElementById("e-"+id+"-titleInput").value);
            form.append("description", this.state.editors.old[i].root.innerHTML);
            form.append("summary", document.getElementById("e-"+id+"-summaryInput").value);
            form.append("date", document.getElementById("e-"+id+"-dateInput").value)
            form.append("url", document.getElementById("e-"+id+"-urlInput").value)
            form.append("soundcloud", nlink);
            form.append("rawsoundcloud", link);
            form.append("length", document.getElementById("e-"+id+"-lengthInput").value);
            form.append("resources", resources);
            url = "/updateepisodeimage";
            data = form;
            $.ajax({
                type:"POST",
                url:url,
                data:data,
                contentType: false,
                processData: false,
                success: (data)=>{
                    let episodes = this.state.episodes;
                    episodes[i] = data;
                    Toastr.options.positionClass = 'toast-top-center';
                    Toastr.success(`Episode ${data.title} has been updated.`);
                    this.setState({episodes:episodes});
                },
                error: (d)=>{
                    Toastr.options.positionClass = 'toast-top-center';
                    Toastr.error(`Error. Episode not updated.`);
                },
                beforeSend: (xhr, settings)=>{
                    xhr.setRequestHeader('Authorization', 'Bearer ' + Auth.getToken())
                }
            });
        }else{
            url = "/updateepisode"
            data = {
                id: id,
                number: document.getElementById("e-"+id+"-numberInput").value,
                title: document.getElementById("e-"+id+"-titleInput").value,
                url: document.getElementById("e-"+id+"-urlInput").value,
                description: this.state.editors.old[i].root.innerHTML,
                summary: document.getElementById("e-"+id+"-summaryInput").value,
                date: document.getElementById("e-"+id+"-dateInput").value,
                soundcloud: nlink,
                rawsoundcloud: link,
                length: document.getElementById("e-"+id+"-lengthInput").value,
                resources: resources
            };
            $.ajax({
                type:"POST",
                url:url,
                data:data,
                success: (data)=>{
                    let episodes = this.state.episodes;
                    episodes[i] = data;
                    Toastr.options.positionClass = 'toast-top-center';
                    Toastr.success(`Episode ${data.title} has been updated.`);
                    this.setState({episodes:episodes});
                },
                error: (d)=>{
                    Toastr.options.positionClass = 'toast-top-center';
                    Toastr.error(`Error. Episode not updated.`);
                },
                beforeSend: (xhr, settings)=>{
                    xhr.setRequestHeader('Authorization', 'Bearer ' + Auth.getToken())
                }
            });
        }
    }
    deleteEpisode(id, index){
        $.ajax({
            type: "DELETE",
            url: "/deleteepisode",
            data: {
                id: id
            },
            success: (data)=>{
                let episodes = this.state.episodes;
                episodes.splice(index, 1);
                Toastr.options.positionClass = 'toast-top-center';
                Toastr.success("Episode has been deleted");
                this.setState({
                    episodes: episodes
                })
            },
            error: (d)=>{
                Toastr.options.positionClass = 'toast-top-center';
                Toastr.error(`Error. Episode not deleted.`);
            },
            beforeSend: (xhr, settings)=>{
                xhr.setRequestHeader('Authorization', 'Bearer ' + Auth.getToken())
            }
        })
    }
	render(){
		return(
			<div className='wrapper'>
                <h1 className='editTitle'>Edit</h1>
                {this.loginForm()}
                {this.newEpisodeForm()}
                <h2>List of all episodes</h2>
                {this.showAllEpisodes()}
			</div>
		)
	}
}

export default Edit