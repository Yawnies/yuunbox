class Chatroom {
    constructor(username, room) {
        this.username = username;
        this.room = room;
        this.chatlog = database.collection('chatlog');
        this.unsub;
    }
    async addNewMessage(message) {
        const now = new Date();
        const dataObject = {
            username: this.username,
            room: this.room,
            message: message,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        await this.chatlog.add(dataObject)
            .then(function(data) {
                console.log("Message added successfully at 'chatlog' database.");
                console.log(data);
            }).catch(function(error) {
                console.log(`ERROR DETECTED: ${error}`);
            });
    }
    updateChats(domUpdate) { // callback function. not sure why do it like this but whatever..
        this.unsub = this.chatlog
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(function(updatedData) {
            updatedData.docChanges().forEach(function(changedData) {
                if(changedData.type === 'added') {
                    domUpdate(changedData.doc.data());
                }
            })
        })
    }
    updateUsername(username) {
        this.username = username;
        localStorage.setItem('username', username);
    }
    updateRoom(room) {
        this.room = room;
        if(this.unsub) { // if that property has a value..
            this.unsub();
        }
    }
}

