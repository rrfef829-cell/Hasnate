import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { prophetStories } from '../data/prophetStories';
import ReactPlayer from 'react-player';
import { getVideosForProphet, ProphetVideo } from '../services/prophetVideosApi';

const StoryRenderer: React.FC<{ content: string }> = ({ content }) => {
  // Split the content by the markdown-like bold syntax, keeping the delimiters
  const parts = content.split(/(\*\*.*?\*\*)/g).filter(Boolean);
  return (
    <p className="whitespace-pre-line leading-relaxed md:leading-loose">
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          // Render bold part inside a <strong> tag
          return <strong key={index}>{part.substring(2, part.length - 2)}</strong>;
        }
        // Render normal text part
        return part;
      })}
    </p>
  );
};

const ProphetStoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const story = prophetStories.find(p => p.id === Number(id));
  const [prophetVideos, setProphetVideos] = useState<ProphetVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<ProphetVideo | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'videos'>('story');

  useEffect(() => {
    if (story) {
      const videos = getVideosForProphet(story.id);
      setProphetVideos(videos);
    }
  }, [story]);

  if (!story) {
    // If story not found, redirect to the main prophets page
    return <Navigate to="/prophets" replace />;
  }

  const handleVideoSelect = (video: ProphetVideo) => {
    setSelectedVideo(video);
    setShowVideoPlayer(true);
  };

  const VideoCard: React.FC<{ video: ProphetVideo }> = ({ video }) => (
    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
         onClick={() => handleVideoSelect(video)}>
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <i className="ph-fill ph-play text-white text-2xl ml-1"></i>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{video.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-2 py-1 rounded">
            {video.channel}
          </span>
          <span className={`px-2 py-1 rounded ${
            video.quality === 'HD' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}>
            {video.quality}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 animate-fade-in">
        <div className="mb-6">
            <Link to="/prophets" className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200 transition-colors group">
                 <i className="ph-fill ph-arrow-right text-xl ml-2 transition-transform group-hover:-translate-x-1"></i>
                <span>العودة إلى قائمة الأنبياء</span>
            </Link>
        </div>
        
        <article>
            <header className="text-center mb-8 border-b border-gray-200 dark:border-gray-700 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-teal-800 dark:text-teal-300 font-arabic">{story.name}</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">{story.description}</p>
                
                {/* Tabs */}
                <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
                  <button
                    onClick={() => setActiveTab('story')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === 'story'
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <i className="ph ph-book-open ml-2"></i>
                    القصة
                  </button>
                  <button
                    onClick={() => setActiveTab('videos')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === 'videos'
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <i className="ph ph-video ml-2"></i>
                    الفيديوهات ({prophetVideos.length})
                  </button>
                </div>
            </header>

            {/* Story Content */}
            {activeTab === 'story' && (
              <>
                <div className="prose prose-lg dark:prose-invert max-w-none text-right">
                    <StoryRenderer content={story.story} />
                </div>

                {story.gallery && story.gallery.length > 0 && (
                    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-3xl font-bold text-center mb-8 text-teal-800 dark:text-teal-300">من مشاهد القصة</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {story.gallery.map((item, index) => (
                                <figure key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden shadow-md group">
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.caption} 
                                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <figcaption className="p-4 text-center text-gray-700 dark:text-gray-300">
                                        {item.caption}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </section>
                )}
              </>
            )}

            {/* Videos Content */}
            {activeTab === 'videos' && (
              <section className="mt-8">
                {prophetVideos.length > 0 ? (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-teal-800 dark:text-teal-300 mb-2">فيديوهات القصة</h2>
                      <p className="text-gray-600 dark:text-gray-400">شاهد قصة {story.name} بالصوت والصورة</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {prophetVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <i className="ph ph-video text-6xl text-gray-400 dark:text-gray-600 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">لا توجد فيديوهات متاحة</h3>
                    <p className="text-gray-500 dark:text-gray-500">سيتم إضافة فيديوهات لهذه القصة قريباً</p>
                  </div>
                )}
              </section>
            )}
        </article>

        {/* Video Player Modal */}
        {showVideoPlayer && selectedVideo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowVideoPlayer(false)}>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{selectedVideo.title}</h3>
                <button
                  onClick={() => setShowVideoPlayer(false)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <i className="ph ph-x text-xl text-gray-600 dark:text-gray-400"></i>
                </button>
              </div>
              
              <div className="aspect-video">
                <ReactPlayer
                  url={selectedVideo.youtubeUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: 1,
                        rel: 0
                      }
                    }
                  }}
                />
              </div>
              
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedVideo.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                  <span>القناة: {selectedVideo.channel}</span>
                  <span>المدة: {selectedVideo.duration}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        

        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
                animation: fade-in 0.5s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default ProphetStoryPage;