import React from 'react';

const Chat = () => {
  return (
    <div className="flex max-h-screen flex-col bg-gray-200 ">
      <h2 className="mb-4 text-center font-bolda text-5xl">Community Chat</h2>
      <div className="flex-grow rounded-lg bg-white p-4 shadow ">
        <p className="mb-4 text-center text-lg">
          Soon you will be able to chat with other citizens here! Stay tuned.
        </p>
        <div className="flex flex-col space-y-2 overflow-y-auto">
          <div className="self-end rounded bg-blue-200 px-2 py-1">Hi!</div>
          <div className="self-start rounded bg-gray-300 px-2 py-1">
            Hello! Any news on the chat feature?
          </div>
          <div className="self-end rounded bg-blue-200 px-2 py-1">
            It's coming soon! Stay tuned.
          </div>
          <div className="self-start rounded bg-gray-300 px-2 py-1">Great! Thanks!</div>
        </div>
      </div>
      <input
        className="my-4 rounded-lg border border-white px-2 py-1"
        placeholder="Type your message"
        disabled
      />
    </div>
  );
};
export default Chat;
