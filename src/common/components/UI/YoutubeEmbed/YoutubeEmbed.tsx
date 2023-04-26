import React from 'react';
import './YoutubeEmbed.scss';

interface Props {
  videoId: string;
}

const YoutubeEmbed: React.FC<Props> = ({ videoId }) =>
  ({ videoId } && (
    <div className='youtube-embed'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded youtube'
      />
    </div>
  ));

export default YoutubeEmbed;
