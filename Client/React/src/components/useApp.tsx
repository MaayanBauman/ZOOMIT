import User from "models/User/User";
import io from "socket.io-client";

const serverUrl = process.env.REACT_APP_SERVER_URL || '';

export let socket: SocketIOClient.Socket
export const conectToSocket = (user: User) => { socket = io.connect(serverUrl, { query: `user-type=${user.user_type}`}) };