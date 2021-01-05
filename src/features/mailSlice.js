import { createSlice } from '@reduxjs/toolkit';

export const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    selectedMail: null,
    sendMessageIsOpen: false,
    ReplyMessageIsOpen: false
  },
  reducers: {
    selectMail: (state, action) => {
      state.selectedMail = action.payload;
    },
    openSendMessage: state => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: state => {
      state.sendMessageIsOpen = false;
    },

    openReplyMessage: state => {
      state.ReplyMessageIsOpen = true;
    },
    closeReplyMessage: state => {
      state.ReplyMessageIsOpen = false;
    },




  },
});

export const { selectMail, openSendMessage, closeSendMessage, openReplyMessage, closeReplyMessage } = mailSlice.actions;
export const selectOpenMail = (state) => state.mail.selectedMail;
export const selectSendMessageIsOpen = state => state.mail.sendMessageIsOpen;
export const selectReplyMessageIsOpen = state => state.mail.ReplyMessageIsOpen;

export default mailSlice.reducer;
