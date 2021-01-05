import { IconButton } from '@material-ui/core';
import React, { useEffect, useState }  from 'react';
import './Mail.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import ReplyIcon from '@material-ui/icons/Reply';
import { useHistory } from 'react-router-dom';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import PrintIcon from '@material-ui/icons/Print';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { selectOpenMail } from './features/mailSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { openReplyMessage } from './features/mailSlice';
import { db } from './firebase';
import moment from 'moment';
import {isToday} from 'date-fns';

const Mail = () => {
    const history = useHistory();
    const selectedMail = useSelector(selectOpenMail);
    const dispatch = useDispatch();

    const [emails, setEmails] = useState([]);
    useEffect(()=>{
        db.collection('emails').doc(selectedMail?.id).collection('replies').orderBy('timestamp','desc').onSnapshot
        (snapshot => setEmails(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
        }) )));
    },[]);

    const checkDate = (timestamp) => {
        if (isToday(new Date(timestamp?.seconds * 1000))){
            return (moment(new Date(timestamp?.seconds * 1000)).format('LT'));
        }else{
            return (moment(new Date(timestamp?.seconds * 1000)).format('MMM D'));
        }
    }


    const checkRepl = (isReplyCount) => {
        if(isReplyCount) {return "Re: ";}
        else {return "";}
    }

    return (
        <div className="mail">
            <div className="mail__tools">
                <div className="mail__toolsLeft">
                    <IconButton onClick={()=>history.push("/")} >
                        <ArrowBackIcon />
                    </IconButton>

                    <IconButton>
                        <MoveToInboxIcon />
                    </IconButton>

                    <IconButton>
                        <ErrorIcon />
                    </IconButton>

                    <IconButton>
                        <DeleteIcon />
                    </IconButton>

                    <IconButton>
                        <EmailIcon />
                    </IconButton>

                    <IconButton>
                        <WatchLaterIcon />
                    </IconButton>

                    <IconButton>
                        <CheckCircleIcon />
                    </IconButton>

                    <IconButton>
                        <LabelImportantIcon />
                    </IconButton>

                    <IconButton>
                        <ReplyIcon onClick={()=>dispatch(openReplyMessage())} />
                    </IconButton>
                </div>

                <div className="mail__toolsRight">
                    <IconButton>
                        <UnfoldMoreIcon />
                    </IconButton>

                    <IconButton>
                        <PrintIcon />
                    </IconButton>

                    <IconButton>
                        <ExitToAppIcon />
                    </IconButton>
                </div>
            </div>
            <div className="mail__body">
                <div className="mail__bodyHeader">
                    <h2>{checkRepl(selectedMail?.isReplyCount)}{selectedMail?.subject}</h2>
                    <LabelImportantIcon className="mail__important" />
                    <p>{selectedMail?.title}</p>
                    <p className="mail__time">{selectedMail?.time}</p>
                </div>

                <div className="mail__message">
                    <p>{selectedMail?.description}</p>
                </div>

            {emails.map(({id, data: { title, sub, message, timestamp }}) => (
            <div>
                <div className="mail__bodyHeader">
                    <h2>{checkRepl(selectedMail?.isReplyCount)}{sub}</h2>
                    <LabelImportantIcon className="mail__important" />
                    <p>{title}</p>
                    <p className="mail__time">{checkDate(timestamp)}</p>
                </div>
                <div className="mail__message">
                        <p>{message}</p>
                </div>
            </div>
             ))}



            </div>

        </div>
    );
};

export default Mail;