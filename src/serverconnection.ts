interface ServerMessage {
    type: string;
    data: string;
}

class ServerConnection {

    private socket: WebSocket | null = null;
    private listeners: Set<[string, (data: string) => any]> = new Set();

    public constructor(url: string) {
        this.socket = new WebSocket("ws://" + url);
        this.socket.addEventListener("message", (event) => {
            let message: ServerMessage = JSON.parse(event.data.toString());
            this.notifyListeners(message);
        })
    }

    private notifyListeners(message: ServerMessage) {
        console.log("Message Recieved: " + message.data);
        this.listeners.forEach( (pair) => {
            const type: string = pair[0];
            const x: (data: string) => any = pair[1];
            if (type === message.type) {
                x(message.data);
            }
        })
    }

    public addMessageListener(type: string, listener: (data: string) => any) {
        this.listeners.add([type, listener]);
    }

}

export default ServerConnection;