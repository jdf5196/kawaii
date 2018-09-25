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
    return EventEmitter._events[event].length - 1;
  },
  destroy: (event, index)=>{
    if(!EventEmitter._events[event]){return};
    EventEmitter._events[event].splice(index, 1);
  }
}

export default EventEmitter;