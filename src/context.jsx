import React, { createContext, useState } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [previewMessage, setPreviewMessage] = useState('');


    return (
        <ChatContext.Provider value={{ previewMessage, setPreviewMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatProvider };