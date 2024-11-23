import { useState, useEffect } from 'react';
import './hero.css';

const Hero = () => {
  const images = [
    "./assets/c4.png",
    "./assets/c3.png",
    "./assets/c8.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const image = images[currentImage];

  return (
    <section className="flex flex-col z-10 m-auto px-4 md:flex-row justify-center bg-pink-50 items-center h-auto md:h-96 p-4 md:p-0">
      <div className="text-center md:w-1/2">
      <p className="mt-4 text-xl font-semibold md:text-xl mb-5 font-serif text-pink-900 ">50% off super sale </p>
       
        <h1 className=" text-3xl flex md:text-5xl font-bold font-serif text-black">
          Elevate Your Shopping Experience Today!
        </h1>
        
        <button id="explore-btn" className="border-2 relative border-white md:text-md text-sm mt-4 px-4 py-2 font-serif text-black bg-white hover:bg-black hover:text-white transition duration-300">
          Explore Now
        </button>
        
       
      </div>
      <div className="md:w-1/2 ">
       
        <img src={image} alt="Hero" className="mt-4 md:mt-0 mr-4 h-48 md:h-96 w-full object-cover" />
      </div>
    </section>
  );
};

export default Hero;
