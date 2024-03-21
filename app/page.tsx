'use client';
import { useRef, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleLoading = () => {
    setIsLoading(!isLoading);
    cardRef.current?.classList.toggle('*:animate-pulse');
  };

  return (
    <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5 flex-col gap-4">
      <div
        ref={cardRef}
        className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-3"
      >
        {['Elian', 'Me', 'You', 'Yourself', ''].map((person, idx) => (
          <div key={idx} className="flex items-center gap-5 group">
            <div className="size-10 bg-blue-400 rounded-full" />
            {isLoading ? (
              <>
                <div className="bg-gray-100 h-5 w-1/2 rounded-full" />
                <div className="bg-gray-100 h-5 w-1/3 rounded-full" />
              </>
            ) : (
              <>
                <span className="text-lg font-medium empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-gray-300 group-hover:text-red-500">
                  {person}
                </span>
                <div className="size-6 bg-red-500 text-white flex items-center justify-center rounded-full relative">
                  <span className="z-10">{idx}</span>
                  <div className="size-6 bg-red-500 text-white flex items-center justify-center rounded-full absolute animate-ping " />
                </div>
                <div className="size-6 animate-bounce flex items-center justify-center rounded-full">
                  <span>🎉</span>
                </div>
                <div className="size-6 animate-spin text-white flex items-center justify-center rounded-full">
                  <span>⌛️</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <button
        className="bg-teal-500 text-white px-3 py-2 rounded-xl"
        onClick={toggleLoading}
      >
        {isLoading ? 'Loading' : 'has loaded'}
      </button>
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-3">
        <a href="https://www.google.com/" target="_blank">
          link to Google
        </a>
        <div className="group flex flex-col gap-2">
          <input
            className="bg-gray-100 w-full outline-none p-2 rounded-md"
            placeholder="Write your email"
            type="email"
          />
          <span className="group-focus-within:block hidden text-red-500">
            Make sure it is a valid email...
          </span>
          <button className="btn">Submit</button>
        </div>
      </div>
    </main>
  );
}
