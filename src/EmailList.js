import React, { useEffect, useState } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RedoIcon from '@material-ui/icons/Redo';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyBoardHideIcon from '@material-ui/icons/KeyboardHide';
import SettingsIcon from '@material-ui/icons/Settings';
import InboxIcon from '@material-ui/icons/Inbox';
import PeopleIcon from '@material-ui/icons/People';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Section from './Section';
import './EmailList.css';
import EmailRow from './EmailRow';
import { db } from './firebase';
import moment from 'moment';
import {isToday} from 'date-fns';

const EmailList = () => {
    const [emails, setEmails] = useState([]);
    var currentDisplay = 10;
    let totalDisplay = 99;
   
    db.collection('emails').get().then( (snapshot) =>  totalDisplay= snapshot.docs.length );
    console.log("DB Size ",totalDisplay);

    const checkDate = (timestamp) => {
        if (isToday(new Date(timestamp?.seconds * 1000))){
            return (moment(new Date(timestamp?.seconds * 1000)).format('LT'));
        }else{
            return (moment(new Date(timestamp?.seconds * 1000)).format('MMM D'));
        }
    }

    const nextPageData = () =>{ 
        
    }

    const previousPageData = () => {}

    useEffect(()=>{
        db.collection('emails').orderBy('timestamp','desc').onSnapshot
        (snapshot => setEmails(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
        }) )));
    },[]);

    return (
        <div className="emailList">
            <div className="emailList__settings">
                <div className="emailList__settingsLeft">
                    <Checkbox />
                    <IconButton>
                        <ArrowDropDownIcon />
                    </IconButton>
                    <IconButton>
                        <RedoIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
                <div className="emailList__settingsRight">
                    {currentDisplay} of {totalDisplay}
                    <IconButton>
                        <ChevronLeftIcon onClick={previousPageData} />
                    </IconButton>
                    <IconButton>
                        <ChevronRightIcon onClick={nextPageData} />
                    </IconButton>
                    <IconButton>
                        <KeyBoardHideIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                </div>
            </div>

            <div className="emailList__sections">
                <Section Icon={InboxIcon} title='Primary' color='red' selected />
                <Section Icon={PeopleIcon} title="Social" color="#1A73E8" />
                <Section Icon={LocalOfferIcon} title="Promotions" color="green" />
            </div>

            <div className="emailList__list">
                {emails.map(({id, data: { to, subject, message, timestamp, isReplyCount, isRead }}) => (
                    <EmailRow
                        id={id}
                        key={id}
                        title={to}
                        subject={subject}
                        description={message}
                        //time={new Date(timestamp?.seconds * 1000).toUTCString()}
                        //time = {moment(new Date(timestamp?.seconds * 1000)).fromNow()}
                        //time = {moment(new Date(timestamp?.seconds * 1000)).format('MMM D')}
                        time = {checkDate(timestamp)}
                        isReplyCount = {isReplyCount}
                        isRead = {isRead}
                    />
                ))}
                <EmailRow 
                    title="Twitch"
                    subject="test sub"
                    description="test des"
                    time="2AM"
                />
            </div>
        </div>
    );
};

export default EmailList;