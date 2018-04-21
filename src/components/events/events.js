var EventEmitter = {
  _events: {},
  dispatch: (event, data)=>{
    if(!EventEmitter._events[event]){return}
    for(var i = 0; i < EventEmitter._events[event].length; i++){
      EventEmitter._events[event][i](data);
    }
  },
  subscribe: (event, callback)=>{
    if(!EventEmitter._events[event]){EventEmitter._events[event] = []};
    EventEmitter._events[event].push(callback);
  }
}

export default EventEmitter;