import React from 'react';
import './SendMail.css';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeSendMessage } from './features/mailSlice';
import { db } from './firebase';
import firebase from 'firebase';
import { Editor } from "@tinymce/tinymce-react";

const SendMail = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const dispatch = useDispatch();
    var richMessage = "Enter your Message";
    const handleEditorChange = (e) => {
        richMessage = e.target.getContent();
        console.log('Rich Message was updated:', richMessage);
      }

    const onSubmit = (formData) => {
        console.log(formData, "check data");
        db.collection('emails').add({
            to: formData.to,
            subject: formData.subject,
            //message: formData.message,
            message: richMessage,
            isRead: false,
            isReplyCount:"",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        dispatch(closeSendMessage());
    };

    return (
        <div className="sendMail">
            <div className="sendMail__header">
                <h3>New Message</h3>
                <CloseIcon
                 onClick={() => dispatch(closeSendMessage()) }
                 className="sendMail__close" 
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="to" placeholder="To" type="email" ref={register({ required: true })} />
                {errors.to && <p className="sendMail__error">To is required</p>}

                <input name="subject" placeholder="Subject" type="text" ref={register({ required: true })} />
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