// src/Redux/Chat/Reducer.js

import { FETCH_CHAT_BY_PROJECT_FAILURE, FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGES_FAILURE, FETCH_CHAT_MESSAGES_REQUEST, FETCH_CHAT_MESSAGES_SUCCESS, FETCH_MESSAGE_FAILURE, FETCH_MESSAGE_REQUEST, FETCH_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "./ActionTypes";

const initialState = {
  messages: [],
  loading: false,
  error: null,
  chat: null,
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    // Request cases
    case FETCH_MESSAGE_REQUEST:
    case SEND_MESSAGE_REQUEST:
    case FETCH_CHAT_MESSAGES_REQUEST:
    case FETCH_CHAT_BY_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Success cases
    case FETCH_MESSAGE_SUCCESS:
    case FETCH_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.paylod,
      };

    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.message],
      };

    case FETCH_CHAT_BY_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        chat: action.chat,
      };

    // Fa
    case FETCH_MESSAGE_FAILURE:
    case SEND_MESSAGE_FAILURE:
    case FETCH_CHAT_MESSAGES_FAILURE:
    case FETCH_CHAT_BY_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default ChatReducer;
