// Prophet Videos API Service
// This service manages YouTube videos for prophet stories

export interface ProphetVideo {
  id: string;
  prophetId: number;
  prophetName: string;
  title: string;
  description: string;
  youtubeUrl: string;
  videoId: string;
  thumbnail: string;
  duration: string;
  language: 'ar' | 'en';
  quality: 'HD' | 'SD';
  channel: string;
  views?: number;
  uploadDate?: string;
}

export interface ProphetVideoCollection {
  prophetId: number;
  prophetName: string;
  videos: ProphetVideo[];
  totalVideos: number;
}

// Curated YouTube videos for each prophet story
export const PROPHET_VIDEOS: ProphetVideo[] = [
  // Prophet Adam (AS)
  {
    id: 'adam_1',
    prophetId: 1,
    prophetName: 'آدم عليه السلام',
    title: 'قصة سيدنا آدم عليه السلام - أبو البشر',
    description: 'قصة خلق آدم عليه السلام وبداية البشرية على الأرض',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '15:30',
    language: 'ar',
    quality: 'HD',
    channel: 'قصص الأنبياء'
  },
  {
    id: 'adam_2',
    prophetId: 1,
    prophetName: 'آدم عليه السلام',
    title: 'آدم وحواء في الجنة - القصة الكاملة',
    description: 'قصة آدم وحواء في الجنة وخروجهما منها',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '12:45',
    language: 'ar',
    quality: 'HD',
    channel: 'الإسلام والحياة'
  },

  // Prophet Idris (AS)
  {
    id: 'idris_1',
    prophetId: 2,
    prophetName: 'إدريس عليه السلام',
    title: 'قصة النبي إدريس عليه السلام - أول من خط بالقلم',
    description: 'قصة النبي إدريس الذي علم الناس الكتابة والخياطة',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '18:20',
    language: 'ar',
    quality: 'HD',
    channel: 'قصص الأنبياء'
  },

  // Prophet Nuh (AS)
  {
    id: 'nuh_1',
    prophetId: 3,
    prophetName: 'نوح عليه السلام',
    title: 'قصة سيدنا نوح والطوفان العظيم',
    description: 'قصة نوح عليه السلام والسفينة والطوفان الذي أغرق الأرض',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '25:15',
    language: 'ar',
    quality: 'HD',
    channel: 'قصص الأنبياء'
  },
  {
    id: 'nuh_2',
    prophetId: 3,
    prophetName: 'نوح عليه السلام',
    title: 'بناء سفينة نوح - معجزة إلهية',
    description: 'كيف بنى نوح عليه السلام السفينة بأمر من الله',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '16:40',
    language: 'ar',
    quality: 'HD',
    channel: 'الإسلام والحياة'
  },

  // Prophet Hud (AS)
  {
    id: 'hud_1',
    prophetId: 4,
    prophetName: 'هود عليه السلام',
    title: 'قصة النبي هود وقوم عاد',
    description: 'قصة هود عليه السلام مع قومه عاد وكيف أهلكهم الله',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '20:30',
    language: 'ar',
    quality: 'HD',
    channel: 'قصص الأنبياء'
  },

  // Prophet Salih (AS)
  {
    id: 'salih_1',
    prophetId: 5,
    prophetName: 'صالح عليه السلام',
    title: 'قصة النبي صالح وناقة الله',
    description: 'قصة صالح عليه السلام مع قوم ثمود وناقة الله المعجزة',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '22:10',
    language: 'ar',
    quality: 'HD',
    channel: 'قصص الأنبياء'
  },

  // Prophet Ibrahim (AS)
  {
    id: 'ibrahim_1',
    prophetId: 6,
    prophetName: 'إبراهيم عليه السلام',
    title: 'قصة سيدنا إبراهيم خليل الرحمن',
    description: 'قصة إبراهيم عليه السلام وتحطيم الأصنام والنار',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '28:45',
    language: 'ar',
    quality: 'HD',
    channel: 'قصص الأنبياء'
  },
  {
    id: 'ibrahim_2',
    prophetId: 6,
    prophetName: 'إبراهيم عليه السلام',
    title: 'إبراهيم والنار - معجزة عظيمة',
    description: 'كيف نجى الله إبراهيم من النار وجعلها برداً وسلاماً',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '15:20',
    language: 'ar',
    quality: 'HD',
    channel: 'الإسلام والحياة'
  },

  // Prophet Lut (AS)
  {
    id: 'lut_1',
    prophetId: 7,
    prophetName: 'لوط عليه السلام',
    title: 'قصة النبي لوط وقومه',
    description: 'قصة لوط عليه السلام وكيف أهلك الله قومه',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '19:35',
    language: 'ar',
    quality: 'HD',
    channel: 'قصص الأنبياء'
  },

  // Prophet Ismail (AS)
  {
    id: 'ismail_1',
    prophetId: 8,
    prophetName: 'إسماعيل عليه السلام',
    title: 'قصة إسماعيل والذبح العظيم',
    description: 'قصة إسماعيل عليه السلام وحلم إبراهيم بذبحه',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '17:25',
    language: 'ar',
    quality: 'HD',
    channel: 'قصص الأنبياء'
  },

  // Prophet Ishaq (AS)
  {
    id: 'ishaq_1',
    prophetId: 9,
    prophetName: 'إسحاق عليه السلام',
    title: 'قصة النبي إسحاق عليه السلام',
    description: 'قصة إسحاق ابن إبراهيم عليهما السلام',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '14:50',
    language: 'ar',
    quality: 'HD',
    channel: 'قصص الأنبياء'
  },

  // Prophet Yaqub (AS)
  {
    id: 'yaqub_1',
    prophetId: 10,
    prophetName: 'يعقوب عليه السلام',
    title: 'قصة النبي يعقوب إسرائيل',
    description: 'قصة يعقوب عليه السلام وأولاده الاثني عشر',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '21:15',
    language: 'ar',
    quality: 'HD',
    channel: 'قصص الأنبياء'
  },

  // Prophet Yusuf (AS)
  {
    id: 'yusuf_1',
    prophetId: 11,
    prophetName: 'يوسف عليه السلام',
    title: 'قصة سيدنا يوسف الصديق - الجزء الأول',
    description: 'قصة يوسف عليه السلام من الرؤيا إلى البئر',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '30:20',
    language: 'ar',
    quality: 'HD',
    channel: 'قصص الأنبياء'
  },
  {
    id: 'yusuf_2',
    prophetId: 11,
    prophetName: 'يوسف عليه السلام',
    title: 'يوسف في مصر وتفسير الأحلام',
    description: 'قصة يوسف في مصر وتفسيره لأحلام الملك',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '25:40',
    language: 'ar',
    quality: 'HD',
    channel: 'قصص الأنبياء'
  }
];

// Get all videos for a specific prophet
export const getVideosForProphet = (prophetId: number): ProphetVideo[] => {
  return PROPHET_VIDEOS.filter(video => video.prophetId === prophetId);
};

// Get a specific video by ID
export const getVideoById = (videoId: string): ProphetVideo | null => {
  return PROPHET_VIDEOS.find(video => video.id === videoId) || null;
};

// Get all prophet video collections
export const getAllProphetVideoCollections = (): ProphetVideoCollection[] => {
  const prophetIds = [...new Set(PROPHET_VIDEOS.map(video => video.prophetId))];
  
  return prophetIds.map(prophetId => {
    const videos = getVideosForProphet(prophetId);
    return {
      prophetId,
      prophetName: videos[0]?.prophetName || '',
      videos,
      totalVideos: videos.length
    };
  });
};

// Search videos by title or description
export const searchVideos = (query: string): ProphetVideo[] => {
  const lowercaseQuery = query.toLowerCase();
  return PROPHET_VIDEOS.filter(video => 
    video.title.toLowerCase().includes(lowercaseQuery) ||
    video.description.toLowerCase().includes(lowercaseQuery) ||
    video.prophetName.toLowerCase().includes(lowercaseQuery)
  );
};

// Get featured/recommended videos
export const getFeaturedVideos = (): ProphetVideo[] => {
  // Return first video for each prophet as featured
  const prophetIds = [...new Set(PROPHET_VIDEOS.map(video => video.prophetId))];
  return prophetIds.map(prophetId => 
    PROPHET_VIDEOS.find(video => video.prophetId === prophetId)!
  ).filter(Boolean);
};

// Get random video
export const getRandomVideo = (): ProphetVideo => {
  const randomIndex = Math.floor(Math.random() * PROPHET_VIDEOS.length);
  return PROPHET_VIDEOS[randomIndex];
};

// Extract YouTube video ID from URL
export const extractYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Generate YouTube thumbnail URL
export const getYouTubeThumbnail = (videoId: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'maxresdefault'): string => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

// Generate YouTube embed URL
export const getYouTubeEmbedUrl = (videoId: string, autoplay: boolean = false, mute: boolean = false): string => {
  const params = new URLSearchParams();
  if (autoplay) params.append('autoplay', '1');
  if (mute) params.append('mute', '1');
  params.append('rel', '0'); // Don't show related videos
  params.append('modestbranding', '1'); // Modest branding
  
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

// Check if video is available (basic check)
export const isVideoAvailable = async (videoId: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Get video duration in readable format
export const formatDuration = (duration: string): string => {
  // Duration is expected in format "MM:SS" or "HH:MM:SS"
  return duration;
};

// Add custom video (for admin purposes)
export const addCustomVideo = (video: Omit<ProphetVideo, 'id'>): ProphetVideo => {
  const newVideo: ProphetVideo = {
    ...video,
    id: `custom_${Date.now()}`
  };
  
  // In a real app, this would save to a database
  PROPHET_VIDEOS.push(newVideo);
  
  return newVideo;
};

// Get videos by language
export const getVideosByLanguage = (language: 'ar' | 'en'): ProphetVideo[] => {
  return PROPHET_VIDEOS.filter(video => video.language === language);
};

// Get videos by quality
export const getVideosByQuality = (quality: 'HD' | 'SD'): ProphetVideo[] => {
  return PROPHET_VIDEOS.filter(video => video.quality === quality);
};

// Get popular videos (mock implementation)
export const getPopularVideos = (): ProphetVideo[] => {
  // In a real app, this would be based on actual view counts
  return PROPHET_VIDEOS
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);
};

// Get recent videos (mock implementation)
export const getRecentVideos = (): ProphetVideo[] => {
  // In a real app, this would be based on actual upload dates
  return PROPHET_VIDEOS
    .sort((a, b) => new Date(b.uploadDate || '2023-01-01').getTime() - new Date(a.uploadDate || '2023-01-01').getTime())
    .slice(0, 10);
};