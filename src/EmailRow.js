import { IconButton } from '@material-ui/core';
import { LabelImportantOutlined, StarBorderOutlined } from '@material-ui/icons';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import LabelImportantOutlinedIcon from '@material-ui/icons/LabelImportantOutlined';
import './EmailRow.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectMail } from './features/mailSlice';
import { db } from './firebase';


const EmailRow = ({ id, title, subject, description, time, isReplyCount, isRead }) => {
    const history = useHistory();
    const dispatch = useDispatch();


    const checkRepl = (isReplyCount) => {
        if(isReplyCount) {return "Re: ";}
        else {return "";}
    }

    const checkReplfordot = (isReplyCount) => {
        if(isReplyCount) {return "... ";}
        else {return "";}
    }

    const openMail = () => {
        db.collection('emails').doc(id).update({
            isRead: true
        });
        dispatch(selectMail({
            id, title, subject, description, time, isReplyCount
        }));
        history.push('/mail');
    };

    return (
        <div  className={`emailRow ${isRead && 'emailRow_notSeen'}`}>
            <div className="emailRow__options">
                <Checkbox />
                <IconButton>
                    <StarBorderOutlinedIcon />
                </IconButton>
                <IconButton>
                    <LabelImportantOutlinedIcon />
                </IconButton>
            </div>

            <h3 onClick={openMail} className="emailRow__title">
                {title} {checkReplfordot(isReplyCount)}{isReplyCount}
            </h3>

            <div onClick={openMail} className="emailRow__message">
                <h4>
                    {checkRepl(isReplyCount)}{subject}{"  "}
                    <span className="emailRow__description">-{description}</span>
                </h4>
            </div>

            <div onClick={openMail} className="emailRow__time">
                {time}
            </div>
        </div>
    );
};

export default EmailRow;