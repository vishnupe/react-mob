import io from 'socket.io-client';
let socket;
export function connectSocket() {
  socket = io('http://localhost:3000');
	// socket = io('http://error-lazyfolkz.rhcloud.com:80');
}
export function emitEvent(evt,data){
  socket.emit(evt,data)
}
export function listenEvent(evt,callback){
  socket.on(evt,function(data){
    console.log(evt,' received')
    callback(data);
  });
}
