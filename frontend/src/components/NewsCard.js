import React from 'react';

const NewsCard = ({ title, imageUrl, content, date }) => {
  return (
    <div className="mx-auto  overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
      <div>
        {imageUrl && <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />}
      </div>
      <div className="p-8">
        <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">{date}</div>
        <a
          href="#"
          className="mt-1 block text-lg font-medium leading-tight text-black hover:underline"
        >
          {title}
        </a>
        <p className="mt-2 text-gray-500">{content}</p>
      </div>
    </div>
  );
};

export default NewsCard;
