import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow p-4 bg-gray-200 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <span className="text-gray-800">User:</span> {msg}
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-white flex">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-l-md p-2"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value)
            console.log(e.target.value)
          }}
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md">Send</button>
        <Button variant="outline">Button</Button>
      </form>
    </div>
  );
};

export default ChatPage;
