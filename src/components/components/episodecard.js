import React from 'react';
import { Link } from 'react-router-dom';
import EventEmitter from '../events/events.js';

const EpisodeCard = (props)=>{
    let play = ()=>{
        EventEmitter.dispatch('playerChange', {episode: props.episode});
    }
    return(
        <div className='episodeCard' id={props.title}>
            <div className='epiCardImage'>
                <img className='image' src={props.episode.image} />
            </div>
            <div className='epiCardInfo'>
                <h2 className='epiCardText epiCardTitle'>Episode {props.episode.number}: {props.title}</h2>
                <p className='epiCardText epiCardDescription'>{props.episode.summary}</p>
                <div className='epiButtonDiv'>
                    <button onClick={play} className='epiButton play'>Play Episode</button><button className='epiButton info'>More Info</button>
                </div>
            </div>
        </div>
    )
}

export default EpisodeCard