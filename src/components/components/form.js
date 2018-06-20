import React from 'react';
import EventEmitter from '../events/events.js';

const Form = (props) =>{
    let image = ()=>{
        if(props.episode.image !== ""){
            return(<div><img className='newEpisodeImage' src={props.episode.image} />
                    <button onClick={props.deleteImage.bind(this, event, index)} className='deleteImage'>Delete</button></div>
            )
        }else{
            return(<input id={"e-"+props.episode._id+"-image"} className='newEpisodeInput' type='file' name="Episode Image" />)
        }
    }
    return(
        <div className='newEpisodeWrapper'>
            <form id={props.episode.title+'-form'} key={props.episode.title} className='newEpisodeForm'>
                <input id={"e-"+props.episode._id+"-titleInput"} className='newEpisodeInput' type='text' defaultValue={props.episode.title} placeholder='Title' />
                <input id={"e-"+props.episode._id+"-numberInput"}  className='newEpisodeInput' type='text' defaultValue={props.episode.number} placeholder='Episode Number' />
                <input id={"e-"+props.episode._id+"-lengthInput"} className='newEpisodeInput' type='text' defaultValue={props.episode.length} placeholder='Episode Length' />
                <input id={"e-"+props.episode._id+"-dateInput"} className='newEpisodeInput' type='text' defaultValue={props.episode.date} placeholder="Upload Date" />
                <input id={"e-"+props.episode._id+"-soundcloudInput"} className='newEpisodeInput' type='text' defaultValue={props.episode.rawsoundcloud} placeholder='SoundCloud Link' />
                <input id={"e-"+props.episode._id+"-urlInput"} className='newEpisodeInput' type='text' defaultValue={props.episode.url} placeholder='URL Text' />
                {image()}
                <textarea id={"e-"+props.episode._id+"-summaryInput"} className='newEpisodeSummary' type='text' defaultValue={props.episode.summary} placeholder='Short Summary'></textarea>
                <div id={"e-"+props.episode._id + "-description"} className='newEpisodeText' type='text' placeholder='Description'></div>
            </form>
            <button onClick={props.updateEpisode.bind(this, event, index, epi._id)} className='newEpisodeInput'>Save</button>
            <button onClick={props.deleteEpisode.bind(this, epi._id, index)} className='newEpisodeInput'>Delete</button>
        </div>
    )
}