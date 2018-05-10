import React from 'react';
import { Link } from 'react-router-dom';
import EventEmitter from '../events/events.js';

const Logo = (props)=>{
    return(
        <div className='logo'>
            <div className='logoLeft'>
                <div className='leftTop'>
                </div>
                <div className='leftBtm'>
                    <p className='logoText logoTextLeft'>Kawaii</p>
                </div>
            </div>
            <div className='logoRight'>
                <div className='rightTop'></div>
                <div className='rightBtm'>
                    <p className='logoText logoTextRight'>Trash</p>
                </div>
            </div>
        </div>
    )
}

export default Logo