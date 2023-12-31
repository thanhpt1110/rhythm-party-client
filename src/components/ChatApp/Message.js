import React from 'react';
import { useAuth } from '../../utils/AuthContext';

const Message = ({ message }) => {
    const {authUser} = useAuth();
    const isSender = message.userId._id === authUser._id;
    return (
        <div>
            <div className='chat chat-start'>
                <div className='chat-image avatar'>
                    <div className='w-10 rounded-full'>
                        <img
                            alt='UserAvatarImg'
                            src={message.userId.avatar}
                        />
                    </div>
                </div>
                <div className='chat-header'>
                  {message.userId.displayName}
                </div>
                <div className='chat-bubble'>{message.message}</div>
            </div>

        </div>
    );
};

export default Message;
