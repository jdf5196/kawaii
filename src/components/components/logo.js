import React from 'react';
import { Link } from 'react-router-dom';
import EventEmitter from '../events/events.js';

class Logo extends React.Component{
    constructor(props){
		super(props);
    }
    componentDidMount(){
        const arr = [].slice.call(document.getElementsByClassName("logoLine"));
		const txt = [].slice.call(document.getElementsByClassName("logoLetter"));
		let z = 0;
		let len = arr.length - 1;
		let c = "#fca1fd";
		let letIndex = 0;
		const changeColor = ()=>{
			setTimeout(()=>{
				if(len < z){
					if(c === "#fca1fd"){
						c = "#58fb58";
					}else{
						c = "#fca1fd"
					}
					len = arr.length - 1;
					z = 0;
				}
				if(z % 5 === 0){
					txt[z / 5].style.color = c;
				}
				if(len % 5 === 0){
					txt[len / 5].style.color = c;
				}
				arr[len].style.background = c;
				arr[z].style.background = c;
				len--;
				z++;
				changeColor();
			}, 300)
		}
		changeColor();
    }

    render(){
        return(
        <div className='mainLogo'>
            <div className='logoLeft'>
                <div className='leftTop'>
                    <div className='topGroup'>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thin'></div>
                    </div>
                    <div className='topGroup'>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thin'></div>
                    </div>
                    <div className='topGroup'>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thick'></div>
                    </div>
                    <div className='topGroup'>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thin'></div>
                    </div>
                    <div className='topGroup'>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                    </div>
                    <div className='topGroup'>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                    </div>
                    <div className='topGroup'>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                    </div>
                </div>
                <div className='leftBtm'>
                    <p className='logoLetter'>K</p>
                    <p className='logoLetter'>a</p>
                    <p className='logoLetter'>w</p>
                    <p className='logoLetter'>a</p>
                    <p className='logoLetter'>i</p>
                    <p className='logoLetter'>i</p>
                </div>
            </div>
            <div className='logoRight'>
                <div className='rightTop'>
                    <div className='topGroup'>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thick'></div>
                    </div>
                    <div className='topGroup'>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thick'></div>
                    </div>
                    <div className='topGroup'>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thin'></div>
                    </div>
                    <div className='topGroup'>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thick'></div>
                    </div>
                    <div className='topGroup'>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                        <div className='logoLine thin'></div>
                    </div>
                    <div className='topGroup'>
                        <div className='logoLine thick'></div>
                        <div className='logoLine thin'></div>
                    </div>
                </div>
                <div className='rightBtm'>
                <p className='logoLetter'>T</p>
                <p className='logoLetter'>r</p>
                <p className='logoLetter'>a</p>
                <p className='logoLetter'>s</p>
                <p className='logoLetter'>h</p>
                </div>
            </div>
        </div>
    )}
}

export default Logo