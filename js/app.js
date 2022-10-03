const chatWindow = document.querySelector('.chat-window');
const chatUI = new ChatUI(chatWindow);
const chatSubmit = document.querySelector('.msg-input');
const updateNameSubmit = document.querySelector('.name-input');
const notificationChange = document.querySelector('.notification');
const channelButtons = document.querySelector('.channel-buttons');

//dom

chatSubmit.addEventListener('submit', function(event) {
    event.preventDefault();

    const msg = chatSubmit.message.value.trim();
    chatroom.addNewMessage(msg)
    chatSubmit.reset();
    //chatSubmit.message.value
});

updateNameSubmit.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = updateNameSubmit.name.value.trim();

    chatroom.updateUsername(name);
    notificationChange.classList.remove('display-none');
    setTimeout(function() {
        notificationChange.classList.add('display-none');
    }, 2000);
    updateNameSubmit.reset();
});

channelButtons.addEventListener('click', function(event) {
    const evt = event;

    if(event.target.classList.contains('chan-butt')) {
        chatUI.clear();
        console.log(evt.target.getAttribute('id'));
        chatroom.updateRoom(evt.target.getAttribute('id'));
        chatroom.updateChats(function(returnedDocData) {
            chatUI.render(returnedDocData);
        });
    }

    // switch (evt.target.id) {
    //     case 'general':
    //         console.log('general works!');
    //         chatUI.clear();
    //         chatroom.updateRoom('general');
    //         break;
    //     case 'gaming':
    //         console.log('gay works!');
    //         chatUI.clear();
    //         chatroom.updateRoom('gaming');
    //         break;
    //     case 'music':
    //         console.log('gxx');
    //         break;
    //     case 'ow2':
    //         console.log('gexx');
    //         break;
    
    //     default:
    //         console.log('wrong click');
    //         break;
    // }
});

//init

const usernameCheck = localStorage.username ? localStorage.username : 'anon'; // variable = check if localStorage.username has a value. IF (?) yes, define variable as this value. IF NOT (:) define it as the other value.
const chatroom = new Chatroom(usernameCheck, 'general');

chatroom.updateChats(function(returnedDocData) {
    chatUI.render(returnedDocData);
});