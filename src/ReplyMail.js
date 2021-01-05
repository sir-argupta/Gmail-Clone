import React from 'react';
import './SendMail.css';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeReplyMessage } from './features/mailSlice';
import { db } from './firebase';
import firebase from 'firebase';
import { Editor } from "@tinymce/tinymce-react";
import { selectOpenMail } from './features/mailSlice';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const SendMail = () => {

    const selectedMail = useSelector(selectOpenMail);
    const history = useHistory();

    const { register, handleSubmit, watch, errors } = useForm();
    const dispatch = useDispatch();
    var richMessage = "Enter your Message";
    const newTime = moment().format('lll');

    const checkRepl = () => {
        if(selectedMail?.isReplyCount) {return parseInt(selectedMail?.isReplyCount);}
        else {return selectedMail?.isReplyCount;}
    }

    var replyCount = checkRepl()+1; 

    const handleEditorChange = (e) => {
        richMessage = e.target.getContent();
        console.log('Rich Message was updated:', replyCount);
      }

    const onSubmit = (formData) => {
        
        console.log(formData, "check data");
        db.collection('emails').doc(selectedMail?.id).update({
            //to: formData.to,
            //subject: formData.subject,
            //message: formData.message,
            //message: richMessage,
            isReplyCount: replyCount,
            //isRead: false,
            oldtime: selectedMail?.time,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        db.collection('emails').doc(selectedMail?.id).collection('replies').add({
            title: selectedMail?.title,
            sub: formData.subject,
            message: richMessage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        dispatch(closeReplyMessage());
        history.push("/");
    };

    return (
        <div className="sendMail">
            <div className="sendMail__header">
                <h3>{selectedMail?.title}</h3>
                <CloseIcon
                 onClick={() => dispatch(closeReplyMessage()) }
                 className="sendMail__close" 
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="to" placeholder="To" type="email" value={selectedMail?.title} ref={register({ required: true })} />
                {errors.to && <p className="sendMail__error">To is required</p>}

                <input name="subject" placeholder="Subject" value={""+selectedMail?.subject} type="text" ref={register({ required: true })} />
                {errors.subject && <p className="sendMail__error">Subject is required</p>}

                <Editor
                    apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                    className="sendMail__message"
                    name="message"
                    initialValue="<p>Enter Message</p>"
                    init={{
                        height: 225,
                        plugins: 'link image code',
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                       
                    }}
                    onChange={handleEditorChange}
                    ref={register({ required: true})}
                    />
                    {errors.message && <p className="sendMail__error">Message is required</p>} 

                <div className="sendMail__options">
                    <Button className="sendMail__send" variant="contained" color="primary" type="submit">Send</Button>
                </div>  
            </form>
        </div>
    );
};

export default SendMail;