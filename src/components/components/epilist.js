import React from 'react';
import Auth from '../events/auth.js';
import EventEmitter from '../events/events.js';
import EpisodeCard from './episodecard.js';

const EpisodeList = (props)=>{
    const Episodes = props.episodes.map((episode)=>{
        return <li className='episode' key={episode.title}>
                <EpisodeCard episode={episode} title={episode.title} />
               </li>
    })
    const openEditor = ()=>{
        EventEmitter.dispatch('openEpisodeEditor', {type: "new"});
    }
    const add = ()=>{
        if(Auth.isLoggedIn()){
            return(
                <p className='addBtn' onClick={()=>{openEditor()}}>Add Episode +</p>
            )
        }
    }
    return(
        <div className='epiContainer'>
            {add()}
            <ul className='epiList'>
                {Episodes}
            </ul>
        </div>
    )
}

export default EpisodeList