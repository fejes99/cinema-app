import React from 'react';
import './YoutubeEmbed.scss';

interface Props {
  videoId: string | undefined;
}

const YoutubeEmbed: React.FC<Props> = ({ videoId }) => (
  <div className='youtube-embed'>
    {!videoId ? (
      <img alt='' className='default-image' src='https://picsum.photos/850/475' />
    ) : (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded youtube'
      />
    )}
  </div>
);

export default YoutubeEmbed;
