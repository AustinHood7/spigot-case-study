import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { TailSpin } from 'react-loader-spinner';

interface Video {
  name: string;
  description: string;
  webSearchUrl: string;
  thumbnailUrl: string;
}

interface RelatedSearch {
  text: string;
  webSearchUrl: string;
}

interface WebPage {
  name: string;
  url: string;
  snippet: string;
}

interface Image {
    name: string; 
    thumbnailUrl: string; 
    webSearchUrl: string;
  }
  
  interface BingSearchResponse {
    queryContext: {
      originalQuery: string;
    };
    webPages: {
      value: WebPage[];
    };
    relatedSearches: {
      value: RelatedSearch[];
    };
    videos: {
      value: Video[];
    };
    images: {
      value: Image[];
    };
  }

  const Tab = {
    WebPages: 'Web Pages',
    RelatedSearches: 'Related Searches',
    Videos: 'Videos',
    Images: 'Images', 
  };

const SearchResults: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<BingSearchResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>(Tab.WebPages);
  const [offset, setOffset] = useState<number>(0); 
  const count = 10; 
  const [loading, setLoading] = useState<boolean>(false);

  const fetchResults = async (newOffset: number = 0) => {
    setLoading(true);
    if (!query) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&count=${count}&offset=${newOffset}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data: BingSearchResponse = await response.json();

      const normalizedData = {
        ...data,
        webPages: { value: data.webPages?.value ?? [] },
        relatedSearches: { value: data.relatedSearches?.value ?? [] },
        videos: { value: data.videos?.value ?? [] },
        images: { value: data.images?.value ?? [] },
      };
      

      setResults(normalizedData);
      setError('');
      setOffset(newOffset);
    } catch (err) {
      setError('Failed to load results');
      setResults(null);
    } finally {
      setLoading(false);
    }
};


  const handlePrevPage = () => {
    const newOffset = Math.max(0, offset - count);
    fetchResults(newOffset);
  };

  const handleNextPage = () => {
    const newOffset = offset + count;
    fetchResults(newOffset);
  };

  const handleSearchClick = () => {
    setLoading(true);
    fetchResults(0).finally(() => setLoading(false));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    handleSearchClick(); 
  };

  const renderTabs = () => {
    return Object.entries(Tab).map(([key, value]) => {
      let dataExists = false;
      switch (key) {
        case 'WebPages':
          dataExists = (results?.webPages?.value?.length ?? 0) > 0;
          break;
        case 'Videos':
          dataExists = (results?.videos?.value?.length ?? 0) > 0;
          break;
        case 'Images':
          dataExists = (results?.images?.value?.length ?? 0) > 0;
          break;
      }      
  
      if (dataExists) {
        return (
          <button
            key={key}
            onClick={() => setActiveTab(value)}
            className={`${activeTab === value ? 'text-cyan-300' : 'text-dark-text'} px-4 py-2`}
          >
            {value}
          </button>
        );
      }
      return null;
    }).filter(Boolean);
  };
  

  const renderContent = () => {
    if (loading) {
      return <TailSpin color="#00BFFF" height={80} width={80} />;
    }
    switch (activeTab) {
      case Tab.WebPages:
        const webPageElements: React.JSX.Element[] = results?.webPages?.value.map((page, index) => (
          <div key={`webpage-${index}`} className='flex flex-col gap-2 md:w-[806px]'>
            <a href={page.url} className='text-cyan-300'><strong>{page.name}</strong></a>
            <p>{page.snippet}</p>
          </div>
        )) || []; 
    
        if (results?.relatedSearches?.value.length && webPageElements.length > 2) {
          const relatedSearchElements = results.relatedSearches.value.map((search, index) => (
            <div key={`related-${index}`} className="flex flex-col gap-2 md:w-[806px]">
              <a href={search.webSearchUrl} className='text-cyan-300 hover:bg-cyan-900 w-[40%] rounded-xl transition-all duration-200 px-4 py-1'>{search.text}</a>
            </div>
          ));
    
          webPageElements.splice(2, 0, 
            <div key="related-searches-section" className="related-searches-block">
              <div className='border-t-[1px] border-dark-border w-full'/>
              <div className='py-4'>
                <h3 className="text-xl font-bold mb-2">People also search for:</h3>
                <div>
                  {relatedSearchElements}
                </div>
              </div>
              <div className='border-t-[1px] border-dark-border w-full'/>
            </div>
          );
        }
    
        return webPageElements;

      case Tab.Videos:
          return results?.videos?.value.map((video, index) => (
            <div key={`video-${index}`} className="flex flex-col items-center gap-2 max-w-[80%]">
              <a href={video.webSearchUrl} target="_blank" rel="noopener noreferrer">
                <div className='font-bold max-w-[70%] text-cyan-300'>{video.name}</div>
                <div className='lg:flex gap-3 py-4 justify-center items-center'>
                  <img src={video.thumbnailUrl} alt={`Thumbnail for ${video.name}`} className="md:w-[400px] h-[225px] object-cover rounded aspect-video" />
                  <p className='p-4 overflow-hidden max-w-[500px] h-[281px]'>{video.description}</p>
                </div>
              </a>
            </div>
          ));
      case Tab.Images: 
        return results?.images?.value.map((image, index) => (
            <div key={`image-${index}`} className='md:flex flex-col gap-2 max-w-[70%]'>
              <a href={image.webSearchUrl} target="_blank" rel="noopener noreferrer">
                  <img src={image.thumbnailUrl} alt={image.name} className="md:w-[400px] h-[225px] object-cover rounded aspect-video" />
                  <p>{image.name}</p>
              </a>
            </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className='bg-dark px-[20%] font-dmsans w-full h-full flex flex-col items-center gap-8 pt-[15%] pb-10 text-dark-text'>
      <div className='absolute top-0 left-0 pl-4 pt-4'>Powered by <span className='font-bold'>Microsoft Bing</span></div>
      <h1 className='text-6xl font-bold mb-4 text-dark-text'>Spigot Search</h1>
      <div className="relative bg-dark rounded-full border-[1px] border-dark-border md:w-[50%]">
      <form className="flex items-center w-full h-[50px] rounded-full px-4 gap-2" onSubmit={handleSubmit}>
        <button className="text-zinc-600 hover:text-zinc-900" type="submit">
          <FaSearch className="dark:fill-dark-text2 fill-light-text2"/>
        </button>
        <input
            onChange={(e) => setQuery(e.target.value)}
          className="appearance-none bg-transparent border-none w-full text-light-text dark:text-dark-text mr-3 px-2 leading-tight focus:outline-none rounded-full"
          placeholder="Search..."
          type="text"
          value={query}
        />
        
      </form>
        </div>
      <button onClick={handleSearchClick} className='bg-accent text-dark-text px-8 py-3 rounded-lg'>
        Search
      </button>
      {error && <p>{error}</p>}
      <div className="tabs flex flex-col md:flex-row">
        {renderTabs()}
      </div>
      <div className="content flex flex-col gap-8 mt-10 items-center">
        {renderContent()}
      </div>
      {results && (
      <div className="flex justify-center w-full mt-4 items-center">
        <button
          onClick={handlePrevPage}
          disabled={offset === 0}
          className='text-dark-text px-4 py-2 rounded-lg flex items-center justify-center'
        >
          <MdOutlineKeyboardArrowLeft className="mr-2" size={30}/>
        </button>
        <div className='text-dark-text'>{`Page ${Math.floor(offset / count) + 1}`}</div>
        <button
          onClick={handleNextPage}
          className='text-dark-text px-4 py-2 rounded-lg flex items-center justify-center'
        >
          <MdOutlineKeyboardArrowRight className="ml-2" size={30}/>
        </button>
      </div>
    )}
    </div>
  );
};

export default SearchResults;
