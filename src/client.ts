import net from "net";
import { IClient } from "./client.interface";

export class Client implements IClient {
    private readonly SERVER_IP: string;
    private readonly SERVER_PORT: number;
    private readonly socket: net.Socket;

    public constructor() {
        this.SERVER_IP = "172.16.14.18";
        this.SERVER_PORT = 4000;
        this.socket = new net.Socket();
        this.listen();
        this.connect();
    }

    private connect(): void {
        this.socket.connect(this.SERVER_PORT, this.SERVER_IP, () => {
            console.log("Client connected");
        });
        this.socket.on("error", (err: Error) => {
            console.error("Socket error:", err);
        });
    }

    public send(msg: string | Buffer): void {
        this.socket.write(msg.toString(), (err: Error | undefined) => {
            if (err) throw err;
            console.log("Message sent!");
        });
    }

    public listen() {
        this.socket.on("data", (data: Buffer) => {
            console.log("Message received: " + data.toString());
        });
    }
}
