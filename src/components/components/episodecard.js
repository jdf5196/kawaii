import React from 'react';
import { Link } from 'react-router-dom';
import EventEmitter from '../events/events.js';
import Auth from '../events/auth.js';

const EpisodeCard = (props)=>{
    let play = ()=>{
        EventEmitter.dispatch('playerChange', {episode: props.episode});
    }
    let openEditor = ()=>{
        EventEmitter.dispatch('openEpisodeEditor', {url: props.episode.url, type: "edit"});
    }
    let edit = ()=>{
        if(Auth.isLoggedIn()){
            return(
                <p className='editBtn' onClick={openEditor}>Edit</p>
            )
        }
    }
    return(
        <div className='episodeCard' id={props.title}>
            <div className='epiCardImage'>
                <img className='image' src={props.episode.image} />
            </div>
            <div className='epiCardInfo'>
                <h2 className='epiCardText epiCardTitle'>Episode {props.episode.number}: {props.title}</h2>
                {edit()}
                <p className='epiCardText epiCardDate'>{props.episode.date} | {props.episode.length}</p>
                <p className='epiCardText epiCardDescription'>{props.episode.summary}</p>
                <div className='epiButtonDiv'>
                    <button onClick={play} className='epiButton play'>Play</button><Link to={`/episodes/${props.episode.url}`} name='episode' className='epiButton info'>More Info</Link>
                </div>
            </div>
        </div>
    )
}

export default EpisodeCard