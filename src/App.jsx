import React, { useRef, useState } from 'react';
import { motion, time } from 'framer-motion';
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
          '💖 Always and forever, I’ll love you with all my heart ❤️ You are my everything 🌸',
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
          <h2 className='text-2xl font-semibold text-center mb-6'>Why you’re special</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
            {['Your smile', 'Your kindness', 'Your presence in my life', 'Us'].map((t, i) => (
              <FlipCard key={i} title={t} index={i} image={specialImages[i]} />
            ))}
          </div>
        </section>

        {/* Timeline Carousel */}
        <section className='snap-start min-h-screen flex flex-col justify-center p-8 bg-white/70 relative'>
          <h2 className='text-2xl font-semibold text-center mb-6'>Our Timeline</h2>

          <div
            className='flex gap-6 px-4 py-2 overflow-x-auto snap-x snap-mandatory scrollbar-none'
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {timelineData.map((item, i) => (
              <motion.div
                key={i}
                className='flex-none w-72 rounded-xl shadow-lg bg-white snap-center p-4'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.3 }}
              >
                {/* Image container */}
                <div className='w-full h-72 rounded-lg overflow-hidden mb-4'>
                  <img src={item.image} alt={item.text} className='w-full h-full object-cover' />
                </div>

                {/* Text content */}
                <div className='text-center text-lg font-medium'>
                  <p className='text-gray-700'>{item.text}</p>
                  <p className='text-sm text-gray-500 mt-1'>{item.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Balloons */}
        {/* Balloons */}
        <section className='snap-start min-h-screen p-8'>
          <h2 className='text-2xl font-semibold text-center mb-6'>Pop a Balloon 🎈</h2>
          <div className='flex flex-wrap justify-center gap-6'>
            {[
              'You light up my world 🌟',
              'Your smile makes everything better 😊',
              'I love you endlessly ❤️',
              'You are my sunshine ☀️',
              'Forever grateful for you 🌸',
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
