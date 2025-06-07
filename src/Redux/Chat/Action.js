import api from "../../config/api";
import { FETCH_CHAT_BY_PROJECT_FAILURE, FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGES_FAILURE, FETCH_CHAT_MESSAGES_REQUEST, FETCH_CHAT_MESSAGES_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "./ActionTypes";


// REST + WebSocket send
export const sendMessage = ({ message, sendToServer }) => {
  return async (dispatch) => {
    dispatch({ type: SEND_MESSAGE_REQUEST });
    try {
      // 1) Persist via REST
      const response = await api.post("/api/messages/send", message);
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        message: response.data,
      });

      // 2) Broadcast via STOMP
      sendToServer(response.data);
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_FAILURE,
        error: error.message,
      });
    }
  };
};

export const messageRecived = (message) => {
  return (dispatch) => {
    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      message,
    });
  };
};

export const fetchChatByProject = (projectId) => {
  console.log("Project Id function :: ", projectId)
  return async (dispatch) => {
    dispatch({ type: FETCH_CHAT_BY_PROJECT_REQUEST });
    try {
      const response = await api.get(`/api/messages/chat/${projectId}`);
      dispatch({
        type: FETCH_CHAT_BY_PROJECT_SUCCESS,
        chat: response.data,
      });
      console.log("Chat response:: ", response.data)
    } catch (error) {
      dispatch({
        type: FETCH_CHAT_BY_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

export const fetchChatMessages = (chatId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CHAT_MESSAGES_REQUEST });
    try {
      const response = await api.get(`/api/messages/chat/${chatId}`);
      dispatch({
        type: FETCH_CHAT_MESSAGES_SUCCESS,
        chatId,
        messages: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_CHAT_MESSAGES_FAILURE,
        error: error.message,
      });
    }
  };
};
