import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Mail from './Mail';
import EmailList from './EmailList';
import SendMail from './SendMail';  
import ReplyMail from './ReplyMail'; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectSendMessageIsOpen, selectReplyMessageIsOpen } from './features/mailSlice';
import { login, selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const ReplyMessageIsOpen = useSelector(selectReplyMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      //the user is logged in 
      dispatch(login({
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL
      }))
    });
  },[])

  return (
    <Router>
      {!user ? (
        <Login />
      ): (
      <div className="app">
        <Header />
        <div className="app__body">
          <Sidebar />
          <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/">
                <EmailList />
              </Route>
          </Switch>
        </div>
        {ReplyMessageIsOpen && <ReplyMail />} 
        {sendMessageIsOpen && <SendMail />}
      </div>
      )}

      
    </Router>
  );
}

export default App;
