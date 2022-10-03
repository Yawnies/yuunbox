class ChatUI {
    constructor(chatbox) {
        this.chatbox = chatbox;
    }
    clear() {
        this.chatbox.innerHTML = '';
    }
    render(returnedDocData) {
        const date = new Date(returnedDocData.created_at.toDate());
        const month = new Intl.DateTimeFormat('en-us', { month: 'long' }).format(date);
        this.chatbox.innerHTML += `
                    <div class="message-display">
                        <div class="message-content">
                            <p class="username-00">${returnedDocData.username}:</p>
                            <p class="message-01">${returnedDocData.message}</p>
                        </div>
                        <div class="message-timestamp">
                            <p class="tstamp-02">${month} ${date.getDate()}, ${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}</p>
                        </div>
                    </div>
                `;
    }
}
