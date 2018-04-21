import React from 'react';
import { Link } from 'react-router-dom';
import EpisodeCard from './episodecard.js';

const EpisodeList = (props)=>{
    const Episodes = props.episodes.map((episode)=>{
        return <li className='episode' key={episode.title}>
                <EpisodeCard episode={episode} title={episode.title} />
               </li>
    })
    return(
        <div className='epiContainer'>
            <ul className='epiList'>
                {Episodes}
            </ul>
        </div>
    )
}

export default EpisodeList