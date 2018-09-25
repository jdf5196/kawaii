import React from 'react';
import EventEmitter from '../events/events.js';
import Toastr from 'toastr';
import Auth from '../events/auth';
import {apiGetEpisode, apiUpdateEpisode, createQuill} from '../helpers/utils.js';

class EpisodeEditor extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        episode: {title: "", number: "", length: "", resources:[{title: "", description: "", link: ""}, {title: "", description: "", link: ""}]},
        class: "closed",
        type: "new",
        editor: "",
        eventIndex: ""
      }
      this.close = this.close.bind(this);
      this.changeInput = this.changeInput.bind(this);
      this.save = this.save.bind(this);
    }
    componentDidMount(){
      let i = EventEmitter.subscribe("openEpisodeEditor", (data)=>{
        if(data.type === "edit"){
          this.getEpisode(data.url).then((response)=>{
            response.keywords = response.keywords.join(", ");
            this.state.editor.root.innerHTML = response.description;
            console.log(response);
            this.setState({
              episode:response,
              class: "open",
              type: "edit"
            })
          })
        }else{
          this.setState({
            episode: {title: "", number: "", length: "", date: "", rawsoundcloud: "", url: "", summary: "", keywords: "", resources:[{title: "", description: "", link: ""}, {title: "", description: "", link: ""}]},
            class: "open",
            type: data.type
          });
          this.state.editor.root.innerHTML = "";
        }
      });
      this.setState({
        eventIndex: i
      });
      let editor = createQuill("descriptionQuill");
      this.setState({
        editor: editor
      })
    }
    componentWillUnmount(){
      EventEmitter.destroy("openEpisodeEditor", this.state.eventIndex);
    }
    async getEpisode(url){
      const episode = await apiGetEpisode(url);
      return episode;
    }
    async updateEpisode(data){
      const episode = await apiUpdateEpisode(data);
      return episode;
    }
    close(){
      this.setState({
        class:"closed"
      })
    }
    changeInput(e, type){
      this.setState({
        episode: {
          ...this.state.episode,
          [type]: e.target.value
        }
      })
    }
    save(){
      let data = this.state.episode;
      let link = this.state.episode.rawsoundcloud;
      let nlink = link.split('src="')[1].slice(0, link.split('src="')[1].length - 11);
      data.resources = JSON.stringify(this.state.episode.resources);
      let keywords = data.keywords.split(",");
      for(let i in keywords){
        let str = keywords[i];
        if(str.charAt(0) === " "){
            str = str.substr(1);
        }
        str.toLowerCase();
        keywords[i] = str;
      };
      data.id = this.state.episode._id;
      data.keywords = JSON.stringify(keywords);
      data.soundcloud = nlink;
      data.rawsoundcloud = link;
      data.description = this.state.editor.root.innerHTML;
      this.updateEpisode(data).then((response)=>{
        response.keywords = response.keywords.join(", ");
        this.setState({
          episode:response
        })
      })
    }
    render(){
      if(Auth.isLoggedIn()){
        let resources = this.state.episode.resources.map((r, i)=>{
          return(
            <div className='resource'>
              <h2>Resource {i}</h2>
              <div className='inputDiv'>
                <input className='episodeInput' type='text' value={r.title} placeholder=" " />
                <p className='epiInputLabel' id='epiTitleLabel'>Resource Title</p>
              </div>
              <div className='inputDiv'>
                <input className='episodeInput' type='text' value={r.description} placeholder=" " />
                <p className='epiInputLabel' id='epiTitleLabel'>Resource Description</p>
              </div>
              <div className='inputDiv'>
                <input className='episodeInput' type='text' value={r.link} placeholder=" " />
                <p className='epiInputLabel' id='epiTitleLabel'>Resource Link</p>
              </div>
            </div>
          )
        })
        return(
          <div className={`episodeEditor ${this.state.class}`}>
            <p onClick={this.close.bind(this)} className='editorClose'>Close</p>
            <h2>Episode Editor</h2>
            <div className='editorInputContainer'>
              <div className='inputDiv'>
                <input onChange={(e)=>{this.changeInput(e, 'title')}} className='episodeInput' type='text' value={this.state.episode.title} id='episodeTitle' placeholder=" " />
                <p className='epiInputLabel' id='epiTitleLabel'>Episode Title</p>
              </div>
              <div className='inputDiv'>
                <input onChange={(e)=>{this.changeInput(e, "number")}} className='episodeInput' type='text' value={this.state.episode.number} id='episodeNumber' placeholder=" " />
                <p className='epiInputLabel' id='epiNumberLabel'>Episode Number</p>
              </div>
              <div className='inputDiv'>
                <input onChange={(e)=>{this.changeInput(e, 'length')}} className='episodeInput' type='text' value={this.state.episode.length} id='episodeLength' placeholder=" " />
                <p className='epiInputLabel' id='epiLengthLabel'>Episode Length</p>
              </div>
              <div className='inputDiv'>
                <input onChange={(e)=>{this.changeInput(e, 'date')}} className='episodeInput' type='text' value={this.state.episode.date} id='episodeDate' placeholder=" " />
                <p className='epiInputLabel' id='epiLengthLabel'>Episode Date</p>
              </div>
              <div className='inputDiv'>
                <input onChange={(e)=>{this.changeInput(e, 'rawsoundcloud')}} className='episodeInput' type='text' value={this.state.episode.rawsoundcloud} id='episodeSoundcloud' placeholder=" " />
                <p className='epiInputLabel' id='epiSoundcloudLabel'>SoundCloud Link</p>
              </div>
              <div className='inputDiv'>
                <input onChange={(e)=>{this.changeInput(e, 'url')}} type='text' className='episodeInput' value={this.state.episode.url} id='episodeUrl' placeholder=" " />
                <p className='epiInputLabel' id='epiUrlLabel'>Episode URL</p>
              </div>
              <div className='inputDiv'>
                <textarea onChange={(e)=>{this.changeInput(e, 'summary')}} className='episodeInput epiText' value={this.state.episode.summary} id='episodeSummary' placeholder=" "></textarea>
                <p className='epiInputLabel epiTextLabel' id='epiSummaryLabel'>Episode Summary</p>
              </div>
              <div className='inputDiv'>
                <textarea onChange={(e)=>{this.changeInput(e, 'keywords')}} className='episodeInput epiText' value={this.state.episode.keywords} id='episodeSummary' placeholder=" "></textarea>
                <p className='epiInputLabel epiTextLabel' id='epiSummaryLabel'>Episode Keywords (Seperated by comma)</p>
              </div>
              <div id='descriptionQuill'></div>
              {resources}
            </div>
            <div onClick={()=>{this.save()}} className='saveButton'>Save</div>
          </div>
        )
      }else{
        return(
          <div className={`episodeEditor ${this.state.class}`}>
            <p>You Must Login to Edit</p>
          </div>
        )
      }
    }
}

export default EpisodeEditor