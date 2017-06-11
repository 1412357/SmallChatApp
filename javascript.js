let sock;
let chatbox = document.getElementById('chatbox');
let myName = document.getElementById('myname');
let myFriend = document.getElementById('myfriend');
let content = document.getElementById('content');

const sendName = 100;
const sendMeg = 200;

let isConnection = false;
function connect() {
    if (!myFriend.value.length) {;
        return;
    }
    sock = new WebSocket("ws://localhost:5001");
    sock.onopen = function($event) {
        console.log("connection successfully");
        sock.send(JSON.stringify({
            code: sendName,
            name: myName.value
        }));
        isConnection  = true;
    }
    
    sock.onmessage = ($event) => {
    let jsonObj = JSON.parse($event.data);
    showMessage(jsonObj);
    };
}

function sendMessage() {
    let myname = myName.value;
    let myfriend = myFriend.value;
    let message = content.value;
    if (isConnection) {
        let data = {
            code: sendMessage,
            from: myname,
            to: myfriend,
            content: message
        };
        sock.send(JSON.stringify(data));
    }
    showMessage({
        from: "You",
        content: message
    });
}

function showMessage(data) {
    let { from, content } = data;
    chatbox.innerHTML += from + ": " + content + "\n";
}