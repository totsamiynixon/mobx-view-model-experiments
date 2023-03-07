import Auth from "./auth";
import Users from "./users";
import Chat from "./chat";

export const auth = new Auth();
export const users = new Users();
export const chat = new Chat(auth);
