export interface IClient {
    send(msg: string | Buffer): void;
}