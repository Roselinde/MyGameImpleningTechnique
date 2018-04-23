
var io = require('socket.io')(process.env.PORT || 3000);

var playerCount = 0;

console.log('server started');

io.on('connection',function(socket){

        console.log('client connected');

        /*
        socket.on('move',function(data){
                console.log('client moved'); 
        });
        */

       socket.on('checkin',function(data){
         console.log('check in '+ data.name); 
        });


        socket.broadcast.emit('spawn');
        playerCount++;

        for(i=0;i<playerCount;i++){
                socket.emit('spawn');
                console.log('sending spawned to new player'); 
        }

        socket.on('disconnect',function(){
                console.log('client disconnected'); 
                playerCount--;
        });

});