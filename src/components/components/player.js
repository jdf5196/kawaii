import React from 'react';
import { Link } from 'react-router-dom';
import EventEmitter from '../events/events.js';

var SC = SC||{};SC.Widget=function(n){function t(r){if(e[r])return e[r].exports;var o=e[r]={exports:{},id:r,loaded:!1};return n[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var e={};return t.m=n,t.c=e,t.p="",t(0)}([function(n,t,e){function r(n){return!!(""===n||n&&n.charCodeAt&&n.substr)}function o(n){return!!(n&&n.constructor&&n.call&&n.apply)}function i(n){return!(!n||1!==n.nodeType||"IFRAME"!==n.nodeName.toUpperCase())}function a(n){var t,e=!1;for(t in b)if(b.hasOwnProperty(t)&&b[t]===n){e=!0;break}return e}function s(n){var t,e,r;for(t=0,e=I.length;t<e&&(r=n(I[t]),r!==!1);t++);}function u(n){var t,e,r,o="";for("//"===n.substr(0,2)&&(n=window.location.protocol+n),r=n.split("/"),t=0,e=r.length;t<e&&t<3;t++)o+=r[t],t<2&&(o+="/");return o}function c(n){return n.contentWindow?n.contentWindow:n.contentDocument&&"parentWindow"in n.contentDocument?n.contentDocument.parentWindow:null}function l(n){var t,e=[];for(t in n)n.hasOwnProperty(t)&&e.push(n[t]);return e}function d(n,t,e){e.callbacks[n]=e.callbacks[n]||[],e.callbacks[n].push(t)}function E(n,t){var e,r=!0;return t.callbacks[n]=[],s(function(t){if(e=t.callbacks[n]||[],e.length)return r=!1,!1}),r}function f(n,t,e){var r,o,i=c(e);return!!i.postMessage&&(r=e.getAttribute("src").split("?")[0],o=JSON.stringify({method:n,value:t}),"//"===r.substr(0,2)&&(r=window.location.protocol+r),r=r.replace(/http:\/\/(w|wt).soundcloud.com/,"https://$1.soundcloud.com"),void i.postMessage(o,r))}function p(n){var t;return s(function(e){if(e.instance===n)return t=e,!1}),t}function h(n){var t;return s(function(e){if(c(e.element)===n)return t=e,!1}),t}function v(n,t){return function(e){var r=o(e),i=p(this),a=!r&&t?e:null,s=r&&!t?e:null;return s&&d(n,s,i),f(n,a,i.element),this}}function S(n,t,e){var r,o,i;for(r=0,o=t.length;r<o;r++)i=t[r],n[i]=v(i,e)}function R(n,t,e){return n+"?url="+t+"&"+g(e)}function g(n){var t,e,r=[];for(t in n)n.hasOwnProperty(t)&&(e=n[t],r.push(t+"="+("start_track"===t?parseInt(e,10):e?"true":"false")));return r.join("&")}function m(n,t,e){var r,o,i=n.callbacks[t]||[];for(r=0,o=i.length;r<o;r++)i[r].apply(n.instance,e);(a(t)||t===L.READY)&&(n.callbacks[t]=[])}function w(n){var t,e,r,o,i;try{e=JSON.parse(n.data)}catch(a){return!1}return t=h(n.source),r=e.method,o=e.value,(!t||A(n.origin)===A(t.domain))&&(t?(r===L.READY&&(t.isReady=!0,m(t,C),E(C,t)),r!==L.PLAY||t.playEventFired||(t.playEventFired=!0),r!==L.PLAY_PROGRESS||t.playEventFired||(t.playEventFired=!0,m(t,L.PLAY,[o])),i=[],void 0!==o&&i.push(o),void m(t,r,i)):(r===L.READY&&T.push(n.source),!1))}function A(n){return n.replace(Y,"")}var _,y,O,D=e(1),b=e(2),P=e(3),L=D.api,N=D.bridge,T=[],I=[],C="__LATE_BINDING__",k="http://wt.soundcloud.test:9200/",Y=/^http(?:s?)/;window.addEventListener?window.addEventListener("message",w,!1):window.attachEvent("onmessage",w),n.exports=O=function(n,t,e){if(r(n)&&(n=document.getElementById(n)),!i(n))throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");t&&(e=e||{},n.src=R(k,t,e));var o,a,s=h(c(n));return s&&s.instance?s.instance:(o=T.indexOf(c(n))>-1,a=new _(n),I.push(new y(a,n,o)),a)},O.Events=L,window.SC=window.SC||{},window.SC.Widget=O,y=function(n,t,e){this.instance=n,this.element=t,this.domain=u(t.getAttribute("src")),this.isReady=!!e,this.callbacks={}},_=function(){},_.prototype={constructor:_,load:function(n,t){if(n){t=t||{};var e=this,r=p(this),o=r.element,i=o.src,a=i.substr(0,i.indexOf("?"));r.isReady=!1,r.playEventFired=!1,o.onload=function(){e.bind(L.READY,function(){var n,e=r.callbacks;for(n in e)e.hasOwnProperty(n)&&n!==L.READY&&f(N.ADD_LISTENER,n,r.element);t.callback&&t.callback()})},o.src=R(a,n,t)}},bind:function(n,t){var e=this,r=p(this);return r&&r.element&&(n===L.READY&&r.isReady?setTimeout(t,1):r.isReady?(d(n,t,r),f(N.ADD_LISTENER,n,r.element)):d(C,function(){e.bind(n,t)},r)),this},unbind:function(n){var t,e=p(this);e&&e.element&&(t=E(n,e),n!==L.READY&&t&&f(N.REMOVE_LISTENER,n,e.element))}},S(_.prototype,l(b)),S(_.prototype,l(P),!0)},function(n,t){t.api={LOAD_PROGRESS:"loadProgress",PLAY_PROGRESS:"playProgress",PLAY:"play",PAUSE:"pause",FINISH:"finish",SEEK:"seek",READY:"ready",OPEN_SHARE_PANEL:"sharePanelOpened",CLICK_DOWNLOAD:"downloadClicked",CLICK_BUY:"buyClicked",ERROR:"error"},t.bridge={REMOVE_LISTENER:"removeEventListener",ADD_LISTENER:"addEventListener"}},function(n,t){n.exports={GET_VOLUME:"getVolume",GET_DURATION:"getDuration",GET_POSITION:"getPosition",GET_SOUNDS:"getSounds",GET_CURRENT_SOUND:"getCurrentSound",GET_CURRENT_SOUND_INDEX:"getCurrentSoundIndex",IS_PAUSED:"isPaused"}},function(n,t){n.exports={PLAY:"play",PAUSE:"pause",TOGGLE:"toggle",SEEK_TO:"seekTo",SET_VOLUME:"setVolume",NEXT:"next",PREV:"prev",SKIP:"skip"}}]);

var widget1;

class Player extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            player: {},
            play:false,
            progress: 0,
            duration: '',
            percent: 0,
            totalTime: '0:00', 
            durationLeft: '',
            timeLeft: '0:00',
            tracker: '0:00',
            trackerValue: 0,
            trackerHid: true, 
            mousedown: false,
            volumeOpen: false,
            volumeClicked: false,
            overVolume: false,
            volume:0,
            muted:false,
            previousNum: 0,
            playingSame: false
        }
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.getTime = this.getTime.bind(this);
        this.playerHover = this.playerHover.bind(this);
        this.trackerShow = this.trackerShow.bind(this);
        this.clickInput = this.clickInput.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.clicked = this.clicked.bind(this);
        this.openVolume = this.openVolume.bind(this);
        this.clickedVolume = this.clickedVolume.bind(this);
    }

    componentDidMount(){
        const fill = document.querySelector(".filledProgressBar");
        const handle = document.querySelector(".progressHandle");
        const background = document.querySelector(".progressBackground");
        const vBlock = document.querySelector(".volumeBlock");
        const block = document.querySelector(".block");
        block.addEventListener('mousedown', (event)=>{
            this.clicked(event);
        })
        block.addEventListener('mousemove', (event)=>{
            if(this.state.mousedown){
                this.clickInput(event);
            }
            this.playerHover(event);
        });
        block.addEventListener('mouseup', (event)=>{
            this.clicked(event)
        });
        vBlock.addEventListener('mousedown', (event)=>{
            this.clickedVolume(event);
        })
        vBlock.addEventListener('mousemove', (event)=>{
            event.preventDefault();
            if(this.state.volumeClicked){
                this.changeVolume(event, null)
            }
        });
        vBlock.addEventListener('mouseup', (event)=>{
            this.clickedVolume(event)
        })
        block.addEventListener("touchstart", (e)=>{
            e.preventDefault();
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            block.dispatchEvent(mouseEvent);
        });
        block.addEventListener("touchend", (e)=>{
            let mouseEvent = new MouseEvent("mouseup", {});
            block.dispatchEvent(mouseEvent);
        });
        block.addEventListener("touchmove", (e)=>{
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent('mousemove', {
              clientX: touch.clientX,
              clientY: touch.clientY
            });
            block.dispatchEvent(mouseEvent);
        }, false)
        vBlock.addEventListener("touchstart", (e)=>{
            e.preventDefault();
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            vBlock.dispatchEvent(mouseEvent);
        });
        vBlock.addEventListener("touchend", (e)=>{
            let mouseEvent = new MouseEvent("mouseup", {});
            vBlock.dispatchEvent(mouseEvent);
        });
        vBlock.addEventListener("touchmove", (e)=>{
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent('mousemove', {
              clientX: touch.clientX,
              clientY: touch.clientY
            });
            vBlock.dispatchEvent(mouseEvent);
        }, false)
        window.addEventListener('mouseup', (event)=>{
            if(this.state.volumeClicked){
                this.setState({
                    volumeClicked:false
                })
                if(!this.state.overVolume){
                    this.openVolume(event);
                }
            }
        });
        window.addEventListener('mousemove', (event)=>{
            if(this.state.volumeClicked){
                this.changeVolume(event, null)
            }
        });
        window.addEventListener('touchmove', (event)=>{
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent('mousemove', {
              clientX: touch.clientX,
              clientY: touch.clientY
            });
            window.dispatchEvent(mouseEvent);
        }, false);
        window.addEventListener("touchend", (e)=>{
            let mouseEvent = new MouseEvent("mouseup", {});
            window.dispatchEvent(mouseEvent);
        });
        var iframeElement = document.querySelector(`[name="${this.props.instance}-iframe"]`);
        widget1 = SC.Widget(iframeElement);
        this.state.player = widget1;
        let volume;
        if(localStorage.getItem('playerVolume')){
            let v = localStorage.getItem('playerVolume');
            volume = v;
        }else{
            volume = 50;
            localStorage.setItem("playerVolume", 50);
        }
        this.changeVolume(null, volume);
        this.setState({
            volume:volume
        })
        let main = this;
        let eventKey, eventName;
        for (eventKey in SC.Widget.Events) {
            (function(eventName, eventKey) {
              eventName = SC.Widget.Events[eventKey];
              main.state.player.bind(eventName, function(eventData) {
                  if(main.state.duration === ''){
                      main.state.player.getDuration((d)=>{
                          main.setState({
                              duration: d,
                              totalTime: main.getTime(d),
                              durationLeft: 0,
                              timeLeft: main.getTime(0)
                          })
                      })
                  }
                  if(eventKey === "PLAY_PROGRESS"){
                      main.state.progress = eventData.relativePosition * 100;
                      let t = eventData.relativePosition;
                      main.setState({
                          durationLeft: main.state.duration * t,
                          timeLeft: main.getTime(main.state.durationLeft),
                          percent: eventData.relativePosition
                      });
                      let pos = background.offsetWidth * eventData.relativePosition;
                      fill.style.width = `${pos}px`;
                      handle.style.left = `${pos}px`;
                  }
                  if(eventKey === "READY"){
                      if(main.props.auto){
                        main.play();
                    }
                  }
              });
            }(eventName, eventKey))
        }
    }
    play(){
        if(this.state.play){
            this.pause();
            this.setState({play:false})
        }else{
            this.state.player.setVolume(this.state.volume);
            this.state.player.play();
            this.setState({
                play: true
            })
            document.querySelector(`[name="${this.props.instance}-playbutton"]`).classList.add('hid');
            document.querySelector(`[name="${this.props.instance}-pausebutton"]`).classList.remove('hid');
        }
        
    }
    pause(){
        this.state.player.pause();
        this.setState({
            play: false
        })
        document.querySelector(`[name="${this.props.instance}-playbutton"]`).classList.remove('hid');
        document.querySelector(`[name="${this.props.instance}-pausebutton"]`).classList.add('hid');
    }
    getTime(duration){
        let mins;
        let secs;
        if(duration !== '' || duration !== 0){
           mins =  Math.floor((duration / 1000) / 60);
           secs = Math.floor((duration / 1000) % 60);
        }else{
            mins = 0;
            secs = 0;
        }
        if(secs < 10){
            secs = `0${secs}`
        }
        return `${mins}:${secs}`
    }
    playerHover(event){
        let track = document.querySelector(`[name="${this.props.instance}-tracker"]`);
        let miliseconds = Math.floor(((event.clientX - event.target.parentElement.offsetLeft) / (event.target.offsetWidth)) * this.state.duration);
        if(miliseconds <= 0){
            track.style.left = `${0 - (track.offsetWidth / 2)}px`;
            miliseconds = 0;
        }else if(miliseconds >= this.state.duration){
            miliseconds = this.state.duration
            track.style.left = `${event.target.offsetWidth - (track.offsetWidth / 2)}px`;
        }else{
            track.style.left = `${event.clientX - event.target.parentElement.offsetLeft - (track.offsetWidth / 2)}px`;
        }
        let time = this.getTime(miliseconds);
        this.setState({
            tracker: time,
            trackerValue: miliseconds
        })
    }
    trackerShow(){
        let track = track = document.querySelector(`[name="${this.props.instance}-tracker"]`);
        if(this.state.trackerHid){
            track.classList.remove('invis');
            this.setState({
                trackerHid:false
            })
        }else{
            track.classList.add('invis');
            this.setState({
                trackerHid:true,
                mousedown:false
            })
        }
    }
    clicked(event){
        if(this.state.mousedown){
            this.setState({
                mousedown: false
            })
        }else{
            this.clickInput(event);
            this.setState({
                mousedown: true
            })
        }
    }
    clickInput(event){
        const fill = document.querySelector(".filledProgressBar");
        const handle = document.querySelector(".progressHandle");
        const background = document.querySelector(".progressBackground");
        let value = (event.clientX - event.target.parentElement.offsetLeft) / event.target.offsetWidth;
        if(value < 0){
            value = 0;
        }else if(value > this.state.duration){
            value = this.state.duration
        }
        let width = value * background.offsetWidth;
        if(width > background.offsetWidth){
            width = background.offsetWidth;
        }
        fill.style.width = `${width}px`;
        handle.style.left = `${width}px`;
        this.setState({
            durationLeft: value * this.state.duration
        });
        this.state.player.seekTo(value * this.state.duration);
    }
    changeVolume(event, num){
            let elm = document.querySelector(".volume");
            let handle = document.querySelector(".volumeSliderHandle");
            let fill = document.querySelector(".volumeSliderProgress");
            let use = document.getElementById('volumeSVG');
            let height;
            if(event){
                if(window.innerHeight - event.clientY - 51 >= 92){
                    height = 92;
                    this.setState({
                        muted:false
                    })
                }else if(window.innerHeight - event.clientY - 51 <= 0){
                    height = 0;
                    this.setState({
                        muted:true
                    })
                }else{
                    height = window.innerHeight - event.clientY - 51;
                    this.setState({
                        muted:false
                    })
                }
            }
            if(num){
                if(num >=0){
                    height = (num / 100) * 92;
                    this.setState({
                        muted:false
                    })
                }else{
                    if(this.state.muted){
                        height = this.state.previousNum
                        this.setState({
                            muted:false
                        })
                    }else{
                        height = 0;
                        this.setState({
                            muted:true,
                            previousNum: fill.offsetHeight
                        })
                    }
                }
            }
            let vol = (height / 92) * 100;
            if(vol === 0){
                use.setAttribute("xlink:href", "/svg/sprites.svg#volume-mute");
            }else if(vol >= 66){
                use.setAttribute("xlink:href", "/svg/sprites.svg#volume-up");
            }else if(vol >= 33){
                use.setAttribute("xlink:href", "/svg/sprites.svg#volume-down");
            }else if(vol >= 1){
                use.setAttribute("xlink:href", "/svg/sprites.svg#volume-off");
            }
            handle.style.bottom = `${height}px`;
            fill.style.height = `${height}px`;
            this.state.player.setVolume(vol);
            localStorage.setItem('playerVolume', vol);
    }
    clickedVolume(event){
        event.preventDefault();
        if(this.state.volumeClicked){
            this.setState({
                volumeClicked:false
            });
        }else if(!this.state.volumeClicked){
            this.changeVolume(event, null);
            this.setState({
                volumeClicked:true
            });
        }
    }
    openVolume(event){
        let slider = document.querySelector(".volumeSlider");
        let volumeSymbol = document.getElementById('volume');
        let volumeWrapper = document.querySelector('.volume');
        if(this.state.volumeOpen && this.state.overVolume){
            this.setState({
                overVolume: false
            })
        }else{
            this.setState({
                volumeOpen:true,
                overVolume:true
            })
        }
        if(this.state.volumeOpen && this.state.volumeClicked === false){
            slider.classList.add('hid');
            volumeSymbol.classList.remove("volumeSymbolHover");
            volumeWrapper.classList.remove("volumeHover");
            this.setState({
                volumeOpen:false
            })
        }else{
            slider.classList.remove('hid');
            volumeSymbol.classList.add("volumeSymbolHover");
            volumeWrapper.classList.add("volumeHover");
        }
    }
    render(){
        return(
            <div name={`${this.props.instance}-latestPlayer`} className='latestPlayer'>
                <svg onClick={this.play.bind(this)} name={`${this.props.instance}-playbutton`} id='playButton' className='playButton playInput'>
                    <use fill='#ffffff' xlinkHref="/svg/sprites.svg#play" />
                </svg>
                <svg onClick={this.pause.bind(this)} name={`${this.props.instance}-pausebutton`} id='pauseButton' className='pauseButton hid playInput'>
                    <use fill='#ffffff' xlinkHref="/svg/sprites.svg#pause" />
                </svg>
                <div name={`${this.props.instance}-timeLeft`} className='timeLeft playInput'><p>{this.state.timeLeft}</p></div>
                <div className='progressWrapper'>
                    <div name={`${this.props.instance}-tracker`} id='tracker' className='tracker invis'>{this.state.tracker}</div>
                    <div onMouseEnter={this.trackerShow} onMouseLeave={this.trackerShow} className='block'></div>
                    <div className='progressBackground'></div>
                    <div className='filledProgressBar'></div>
                    <div className='progressHandle'></div>
                </div>
                <div name={`${this.props.instance}-totaltime`} className='totaltime playInput'><p>{this.state.totalTime}</p></div>
                <div className='volume' onMouseEnter={this.openVolume} onMouseLeave={this.openVolume} >
                    <div className='volumeSlider hid'>
                        <div className='volumeBlock'></div>
                        <div className='volumeSliderBackground'></div>
                        <div className='volumeSliderProgress'></div>
                        <div className='volumeSliderHandle'></div>
                    </div>
                    <svg onClick={this.changeVolume.bind(this, -1)} name={`${this.props.instance}-volume-down`} id='volume' className='pauseButton playInput'>
                        <use id='volumeSVG' fill='#ffffff' xlinkHref="/svg/sprites.svg#volume-down" />
                    </svg>
                </div>
                <iframe name={`${this.props.instance}-iframe`} width='1000' height="1000" title={this.props.title} className='playerFrame' scrolling="no" frameBorder="no" src={this.props.soundcloudlink}></iframe>								
            </div>
        )
    }
}

export default Player