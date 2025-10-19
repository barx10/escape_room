class Room {
    constructor(id, title, content, checkFunction, hint = '') {
        this.id = id;
        this.title = title;
        this.content = content;
        this.checkFunction = checkFunction;
        this.hint = hint;
    }

    render() {
        return `
            <div class="room" id="room${this.id}">
                <h2>${this.title}</h2>
                <div class="puzzle">
                    ${this.content}
                </div>
                <div id="message${this.id}"></div>
            </div>
        `;
    }
}

export default Room;