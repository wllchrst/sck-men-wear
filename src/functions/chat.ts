import { IChat } from "../interfaces/chat-interface";
import { IResponse } from "../interfaces/response-interface";
import FirebaseHelper from "../services/firebase-helper";
import ResponseHelper from "../services/response-helper";
import { chatWithAdminCollection } from "../settings/firebase-config";

const helper = new FirebaseHelper();
function uploadChat(chat: IChat) {
  try {
    helper.create(chatWithAdminCollection, chat);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

function validateChat(chat : IChat) : IResponse {
  var message = '';
  var success = true;

  if(chat.email === '') {
    message = 'Email cannot be empty'
    success = false
  }
  else if(chat.message === '') {
    message = 'Message cannot be empty'
    success = false
  }

  return ResponseHelper.create(message, success)
}


export { uploadChat, validateChat };
