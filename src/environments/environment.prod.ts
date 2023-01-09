
const origin = "chatikservice.azurewebsites.net/";
const api = origin + "api";

export const environment = {
  production: true,
  userChats: api + "/Chats/chats/",
  randomUser: api + "/Chats/randomUser",
  firstMessages:api +  "/Chats/messages/",
  sendMessage:api +  "/Messages/send",
  editMessage :api +  "/Messages/edit",
  delete: api + "/Messages/delete/",
  createPrivateChat:api +  "/Chats/privateChat/create",
  login: api + "/Accounts/login",
  signalR: origin + "chat",
};
