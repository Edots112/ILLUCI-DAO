import React from 'react';
import NewsCard from '../components/NewsCard';
import aheadNews from '../assets/image/aheadNews.png';
import milestone from '../assets/image/milestone.png';

const ReadNews = () => {
  const newsItems = [
    {
      title: 'Big Update Coming to ILLUCI',
      imageUrl: aheadNews,
      content: `
      We're excited to announce a major update to the ILLUCI platform, bringing a suite of new features and improvements that will enhance user experience and engagement. 
      The update will be rolled out in the coming weeks and will be available to all users. Soon you will be able to chat with other users, create threads, and more. 
      Staking will be improved and users will have a better experience.
      
      Stay tuned for more updates!

      
    `,
      date: 'Januari 11, 2024',
    },
    {
      title: 'ILLUCI Reaches New Milestone',
      imageUrl: milestone,
      content:
        " We're excited to announce that ILLUCI has reached a new milestone. Both Minting and Staking are now live. We're excited to see the community grow and we're looking forward to the future. ",
      date: 'Januari 5, 2024',
    },
  ];

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-pink-400 py-6">
      {newsItems.map((news, index) => (
        <NewsCard
          key={index}
          title={news.title}
          imageUrl={news.imageUrl}
          content={news.content}
          date={news.date}
        />
      ))}
    </div>
  );
};

export default ReadNews;
