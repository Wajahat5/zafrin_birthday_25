import React, { useRef, useState } from 'react';
import { motion, time, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import Cake from './components/Candle/Cake';
import kindness from './assets/kindness.jpeg';
import last_visit_0 from './assets/last_visit_0.jpeg';
import last_visit from './assets/last_visit.jpeg';
import presence from './assets/presence.jpeg';
import she_visits from './assets/she_visits.jpeg';
import smile_2 from './assets/smile_2.jpeg';
import smile from './assets/smile.jpeg';
import us from './assets/us.jpeg';
import baby from './assets/baby.jpeg';
import firstDate from './assets/firstDate.jpeg';
import relationship from './assets/relationship.jpeg';
// Audio placeholders (put your audio files in /public/assets)
import musicFile from './assets/music.mp3';

const specialImages = [smile, kindness, presence, us];
const timelineData = [
  {
    date: '26 Nov 1999',
    text: 'The world got someone special 🎉',
    image: baby,
  },
  {
    date: '27 Dec 2024',
    text: 'Our first date 💕',
    image: firstDate,
  },
  {
    date: '13 Jan 2025',
    text: 'We came into a relationship ❤️',
    image: relationship,
  },
  {
    date: '23–29 Aug 2025',
    text: 'You visited Pune for my birthday 🎂',
    image: she_visits,
  },
  {
    date: '2025 (random visits)',
    text: 'Last time I went home and we met ✨',
    image: last_visit_0,
  },
];
const specialData = [
  {
    image: smile,
    title: 'Your Smile',
    description:
      'Your smile is my favorite thing in the world. No matter how stressed or tired I am, it instantly brings me peace and happiness.',
  },
  {
    image: kindness,
    title: 'Your Kindness',
    description:
      'You are effortlessly thoughtful, caring, and gentle. The way you treat any living being makes you one of the kindest souls I’ve ever known.',
  },
  {
    image: presence,
    title: 'Your Presence',
    description:
      'Even from miles away, your presence feels comforting. You make me feel understood, supported, and cared for in a way nobody else ever has.',
  },
  {
    image: us,
    title: 'Us Together',
    description:
      'You and I together feel like home. Every moment, every call, every memory strengthens what we have, and I wouldn’t trade it for anything.',
  },
];

// Audio placeholders (put your audio files in /public/assets)
const CHIME = '/assets/chime.mp3';
const POP = '/assets/pop.mp3';
const WHOOSH = '/assets/whoosh.mp3';
const PIANO_LOOP = '/assets/piano_loop.mp3';

function useSound(src) {
  const soundRef = useRef(null);
  return {
    play: () => {
      if (!soundRef.current) {
        soundRef.current = new Howl({ src: [src], html5: true });
      }
      soundRef.current.play();
    },
    stop: () => {
      if (soundRef.current) soundRef.current.stop();
    },
  };
}

export default function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showHug, setShowHug] = useState(false);
  const [popped, setPopped] = useState({}); // track popped balloons
  const chime = useSound(CHIME);
  const pop = useSound(POP);
  const whoosh = useSound(WHOOSH);
  const piano = useRef(null);
  const scrollRef = useRef(null);
  let touchStartX = 0;
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = left, +1 = right

  const goLeft = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goRight = () => {
    if (currentIndex < timelineData.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Detect swipe direction
  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // right swipe → goLeft
    if (offset > 100 || velocity > 300) {
      goLeft();
    }
    // left swipe → goRight
    else if (offset < -100 || velocity < -300) {
      goRight();
    }
  };

  const toggleMusic = () => {
    if (!piano.current) {
      piano.current = new Howl({
        src: [musicFile], // use the imported file
        loop: true,
        html5: true,
        volume: 0.5,
      });
    }

    if (musicPlaying) {
      piano.current.pause();
      setMusicPlaying(false);
    } else {
      piano.current.play();
      setMusicPlaying(true);
    }
  };

  const handleOpen = () => {
    chime.play();
    // scroll to flip cards
    document.getElementById('flip').scrollIntoView({ behavior: 'smooth' });
  };

  const popBalloon = (i) => {
    pop.play();
    setPopped((prev) => ({ ...prev, [i]: true }));
  };

  const [finalMsg, setFinalMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  const blowCandles = () => {
    whoosh.play(); // sound effect

    // Show first message
    setFinalMsg('✨ Make a wish, my love. I hope every dream of yours comes true. ✨');
    setShowMsg(true);

    // Scroll to message
    setTimeout(() => {
      document.getElementById('final-message').scrollIntoView({ behavior: 'smooth' });

      // After 3s, fade out first message
      setShowMsg(false);

      // After fade out, show second message smoothly
      setTimeout(() => {
        setFinalMsg(
          '💖 Always and forever, I’ll love you with all my heart ❤️ You are my everything my cute lilly 🌸',
        );
        setShowMsg(true);

        // After 5s, hide the message smoothly
        setTimeout(() => {
          setShowMsg(false);
        }, 5000);
      }, 800); // match duration of motion.div fade-out
    }, 3000);
  };

  const showVirtualHug = () => {
    setShowHug(true);
    setTimeout(() => setShowHug(false), 2000); // hide after 2s
  };

  const [verticalDirection, setVerticalDirection] = useState(0);

  // FLIP STATE FOR SPECIAL ITEMS
  const [specialIndex, setSpecialIndex] = useState(0);
  const [specialFlipped, setSpecialFlipped] = useState(false);
  const [specialDirection, setSpecialDirection] = useState(0);

  const goSpecialLeft = () => {
    if (specialIndex > 0) {
      setSpecialDirection(-1);
      setSpecialIndex(specialIndex - 1);
      setSpecialFlipped(false);
    }
  };

  const goSpecialRight = () => {
    if (specialIndex < specialData.length - 1) {
      setSpecialDirection(1);
      setSpecialIndex(specialIndex + 1);
      setSpecialFlipped(false);
    }
  };

  const handleSpecialSwipe = (startX, endX) => {
    const diff = endX - startX;
    if (diff > 50) goSpecialLeft();
    if (diff < -50) goSpecialRight();
  };

  const flipSpecialCard = () => setSpecialFlipped(!specialFlipped);

  return (
    <div className='min-h-screen font-sans bg-gradient-to-b from-pink-100 to-rose-200 text-gray-800'>
      <header className='fixed top-4 right-4 z-50'>
        <button
          onClick={toggleMusic}
          className='bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow-lg'
        >
          {musicPlaying ? 'Pause music' : 'Play music'}
        </button>
      </header>
      <div className='h-screen w-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory overscroll-contain touch-pan-y font-sans bg-gradient-to-b from-pink-100 to-rose-200 text-gray-800'>
        {/* Landing / Door */}
        <section className='snap-start h-screen flex items-center justify-center'>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className='bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md'
          >
            <h1 className='text-3xl font-bold mb-2'>Happy Birthday, Zafrin 🎁</h1>
            <p className='mb-4'>The day you were born the world got a little brighter.</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className='bg-pink-500 text-white px-6 py-2 rounded-full shadow'
            >
              Tap to open your surprise
            </motion.button>
          </motion.div>
        </section>

        {/* Flip cards */}
        <section id='flip' className='snap-start min-h-screen p-8'>
          <h2 className='text-2xl font-semibold text-center mb-6'>Why You’re Special</h2>

          <div
            className='special-carousel-container'
            onTouchStart={(e) => (touchStartX = e.touches[0].clientY)}
            onTouchEnd={(e) => handleSpecialSwipe(touchStartX, e.changedTouches[0].clientY)}
          >
            {specialData.map((item, i) => {
              let pos = i - specialIndex; // relative position

              // determine card transform
              let scale = pos === 0 ? 1 : 0.85;
              let x = pos * 120; // spacing
              let opacity = pos === 0 ? 1 : 0.3;
              let zIndex = pos === 0 ? 10 : 0;

              return (
                <div
                  key={i}
                  className='special-card'
                  style={{
                    transform: `translateX(${x}px) scale(${scale})`,
                    zIndex,
                  }}
                  onClick={() => pos === 0 && flipSpecialCard()} // only active card flips
                >
                  <AnimatePresence mode='wait'>
                    {/* FRONT: Always show for inactive cards, or active if not flipped */}
                    {(!specialFlipped || pos !== 0) && (
                      <motion.div
                        key='front'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='flex flex-col justify-center items-center h-full w-full'
                      >
                        <h3 className='text-xl font-semibold'>{item.title}</h3>
                        {pos === 0 && <p className='text-sm text-gray-500 mt-2'>Tap to see</p>}
                      </motion.div>
                    )}

                    {/* BACK: Only show for active card when flipped */}
                    {specialFlipped && pos === 0 && (
                      <motion.div
                        key='back'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='flex flex-col justify-center items-center h-full w-full'
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className='w-48 h-48 rounded-lg mb-2 object-cover'
                        />
                        <p className='text-gray-700 text-center'>{item.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className='flex justify-center gap-6 mt-6'>
            <button
              onClick={goSpecialLeft}
              disabled={specialIndex === 0}
              className={`px-4 py-2 rounded-lg text-white font-semibold shadow-md transition ${
                specialIndex === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-pink-500 active:scale-90'
              }`}
            >
              ◀ Previous
            </button>

            <button
              onClick={goSpecialRight}
              disabled={specialIndex === specialData.length - 1}
              className={`px-4 py-2 rounded-lg text-white font-semibold shadow-md transition ${
                specialIndex === specialData.length - 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-pink-500 active:scale-90'
              }`}
            >
              Next ▶
            </button>
          </div>
        </section>

        <section className='snap-start min-h-screen flex flex-col justify-center p-8 bg-white/70 relative'>
          <h2 className='text-2xl font-semibold text-center mb-6'>Our Timeline</h2>

          <div className='relative flex justify-center items-center h-[420px] overflow-hidden'>
            {/* INACTIVE LEFT */}
            {currentIndex > 0 && (
              <motion.div
                key={'left-' + currentIndex}
                initial={{ opacity: 0.2, scale: 0.8, x: -120 }}
                animate={{
                  opacity: 0.3,
                  scale: 0.85,
                  x: -120 + direction * -40, // <- moves with the slide
                }}
                transition={{ duration: 0.45 }}
                className='absolute w-60 h-80 rounded-xl overflow-hidden shadow-md z-0'
              >
                <img
                  src={timelineData[currentIndex - 1].image}
                  alt='inactive-left'
                  className='w-full h-full object-cover'
                />
              </motion.div>
            )}

            {/* ACTIVE SLIDE WITH SWIPE + ANIMATION */}
            <AnimatePresence mode='wait' initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                drag='x'
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                variants={{
                  enter: (dir) => ({
                    x: dir === 1 ? 100 : -100,
                    opacity: 0,
                    scale: 0.9,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                  },
                  exit: (dir) => ({
                    x: dir === 1 ? -100 : 100,
                    opacity: 0,
                    scale: 0.9,
                  }),
                }}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{ duration: 0.45 }}
                className='w-72 h-96 rounded-xl overflow-hidden shadow-lg bg-white z-10'
              >
                <img
                  src={timelineData[currentIndex].image}
                  alt='active'
                  className='w-full h-72 object-cover'
                />

                <div className='text-center mt-3 p-2'>
                  <p className='font-medium text-gray-700'>{timelineData[currentIndex].text}</p>
                  <p className='text-sm text-gray-500'>{timelineData[currentIndex].date}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* INACTIVE RIGHT */}
            {currentIndex < timelineData.length - 1 && (
              <motion.div
                key={'right-' + currentIndex}
                initial={{ opacity: 0.2, scale: 0.8, x: 120 }}
                animate={{
                  opacity: 0.3,
                  scale: 0.85,
                  x: 120 + direction * 40, // <- moves with the slide
                }}
                transition={{ duration: 0.45 }}
                className='absolute w-60 h-80 rounded-xl overflow-hidden shadow-md z-0'
              >
                <img
                  src={timelineData[currentIndex + 1].image}
                  alt='inactive-right'
                  className='w-full h-full object-cover'
                />
              </motion.div>
            )}
          </div>

          {/* Buttons */}
          <div className='flex justify-center gap-6 mt-6'>
            <button
              onClick={goLeft}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded-lg text-white font-semibold shadow-md transition ${
                currentIndex === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-pink-500 active:scale-90'
              }`}
            >
              ◀ Previous
            </button>

            <button
              onClick={goRight}
              disabled={currentIndex === timelineData.length - 1}
              className={`px-4 py-2 rounded-lg text-white font-semibold shadow-md transition ${
                currentIndex === timelineData.length - 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-pink-500 active:scale-90'
              }`}
            >
              Next ▶
            </button>
          </div>
        </section>

        {/* Balloons */}
        <section className='snap-start min-h-screen p-8'>
          <h2 className='text-2xl font-semibold text-center mb-6'>Pop a Balloon 🎈</h2>
          <div className='grid grid-cols-2 grid-rows-3 gap-6 justify-items-center items-center h-[calc(100vh-4rem)]'>
            {[
              'You light up my world 🌟',
              'Your smile makes everything better 😊',
              'I love you endlessly ❤️',
              'You are my sunshine ☀️',
            ].map((msg, i) => (
              <div key={i} className='w-40 h-56 flex flex-col items-center'>
                <motion.div
                  animate={popped[i] ? { scale: 0, opacity: 0 } : { y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
                  className='w-28 h-36 rounded-full bg-pink-300 flex items-center justify-center text-lg font-bold cursor-pointer shadow-lg'
                  onClick={() => popBalloon(i)}
                >
                  {popped[i] ? '🎉' : '🎈'}
                </motion.div>

                {popped[i] && (
                  <div className='mt-2 p-3 bg-white rounded-lg shadow max-w-xs text-center text-sm'>
                    {msg}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Letter */}
        <section className='snap-start min-h-screen p-8 bg-pink-50'>
          <h2 className='text-2xl font-semibold text-center mb-6'>A Letter For You</h2>
          <div className='max-w-3xl mx-auto bg-white p-6 rounded-xl shadow text-lg leading-relaxed'>
            <p>My Zafrin,</p>
            <p>
              Today isn’t just your birthday. It’s the day I celebrate my favourite human. You’re
              warmth, kindness, chaos, softness and strength, all in one. I adore you, and I’m
              grateful for every bit of you.
            </p>
            <p className='mt-4 font-semibold'>Happy Birthday, baby.</p>
            <div className='mt-6 text-center'>
              <button
                onClick={showVirtualHug}
                className='bg-rose-500 text-white px-4 py-2 rounded-full shadow'
              >
                Tap for a virtual hug
              </button>
            </div>
          </div>
          {showHug && (
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-40'>
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='w-60 h-60 bg-white rounded-full flex items-center justify-center text-4xl font-bold'
              >
                🤗
              </motion.div>
            </div>
          )}
        </section>

        {/* Final cake */}
        <section className='snap-start h-screen flex flex-col items-center justify-center p-8'>
          <h2 className='text-2xl font-semibold mb-4'>Blow the Candles 🎂 </h2>
          <small>(Tap the candle to blow)</small>

          <Cake onBlow={blowCandles} />

          <div
            id='final-message'
            className='mt-6 text-lg font-medium text-center transition-all duration-700'
          >
            <div id='final-message' className='mt-6 text-lg font-medium text-center'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={showMsg ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
                className='bg-white/80 p-6 rounded-xl shadow max-w-md mx-auto'
              >
                {finalMsg}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// FlipCard component
function FlipCard({ title, image }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className='relative w-full h-56 perspective cursor-pointer'
    >
      <motion.div
        className='absolute inset-0 rounded-xl shadow-lg'
        animate={flipped ? { rotateY: 180 } : { rotateY: 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div
          className='absolute inset-0 bg-white rounded-xl p-6 flex items-center justify-center'
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className='text-center'>
            <h3 className='text-xl font-semibold mb-2'>{title}</h3>
            <p className='text-sm text-gray-500'>Tap to see</p>
          </div>
        </div>

        {/* Back Side */}
        <div
          className='absolute inset-0 bg-white rounded-xl p-4 flex flex-col items-center justify-center'
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <div className='w-48 h-48 rounded-lg overflow-hidden flex items-center justify-center mb-2'>
            <img src={image} alt={title} className='w-full h-full object-cover' />
          </div>
          {/* <p className='text-sm text-center'>A short caption or memory goes here.</p> */}
        </div>
      </motion.div>
    </div>
  );
}

// TimelineItem
function TimelineItem({ date, text }) {
  return (
    <div className='flex items-start gap-4'>
      <div className='w-8 h-8 rounded-full bg-white shadow flex items-center justify-center'>
        📍
      </div>
      <div>
        <div className='text-sm text-gray-500'>{date}</div>
        <div className='font-medium'>{text}</div>
      </div>
    </div>
  );
}
