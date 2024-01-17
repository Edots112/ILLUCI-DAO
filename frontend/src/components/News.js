import React from 'react';
import aheadNews from '../assets/image/aheadNews.png';
import milestone from '../assets/image/milestone.png';

const NewsComponent = () => {
  const newsItems = [
    {
      title: 'Big Update Coming to ILLUCI',
      summary: 'An exciting new update is on the horizon, bringing new features to our community.',
      imageUrl: aheadNews,
      readMoreUrl: 'big-update',
    },
    {
      title: 'ILLUCI Reaches New Milestone',
      summary: 'ILLUCI hits milestone with its growing user base.',
      imageUrl: milestone,
      readMoreUrl: 'milestone',
    },
  ];

  return (
    <div className="w-full ">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        {newsItems.map((news, index) => (
          <div key={index} className="rounded-lg bg-white p-2 shadow">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="mb-2 h-40 w-full rounded-lg object-cover"
            />
            <h3 className="mb-2 text-xl font-semibold">{news.title}</h3>
            <p className="mb-2 text-sm">{news.summary}</p>
            <a
              href={`/read-news/${news.readMoreUrl}`}
              className="text-blue-500 hover:text-blue-700"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsComponent;
