export const extractYoutubeVideoId = (url: string): string => {
  const videoIdRegex = /(?:\?v=|&v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(videoIdRegex);
  if (!match) {
    return '';
  }
  return match[1];
};
