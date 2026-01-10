import Header from '../components/common/Header';
import Window from '../components/landingpage/Window';
import '../styles/fonts.css';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'

function Landing() {
    const navigate = useNavigate();
    const videoRef = useRef(null);

    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        videoEl.muted = true;

        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.error('Video autoplay was prevented:', error);
            });
        }
    }, []);
    return (
        <div className='h-screen w-full flex flex-col relative overflow-hidden'>
            <Header />

            <div className="flex flex-row h-full w-full items-center justify-evenly">

                <div className='flex flex-col gap-y-7'>
                    <div className='kant-700 text-6xl text-white flex flex-col'>
                        <div className=''>Get</div>
                        <div><span className='kant-700 text-6xl text-[#344F51] drop-shadow-lg drop-shadow-[#a3ca2e]'>10x</span> Output</div>
                    </div>
                    <div className='hind-500 text-xl text-white max-w-xl flex flex-col gap-y-4'>
                        <div>Write prompts to LLM in the right way to get precise outputs.
                        </div>
                        <div>We handle the prompt engineering, simply describe what you want in plain language, and we transform it into a structured, high-quality prompt.</div>
                        <div>Everything handled <span className='text-[#08373B] hind-600'>automatically, accurately, reliably</span>.</div>
                    </div>
                    <div>
                        <button
                            className='border-3 border-[#FFFFFF]/40 rounded-xl py-2 px-2.5 kant-400 tracking-wide text-white text-md bg-linear-350 from-[#31746c] via-[#4fa59b] via-60% via-[#31746c] to-[#FFFFFF]/30 to-90% bg-clip-padding cursor-pointer transition-all hover:scale-[1.03]'
                            onClick={() => navigate('/enhance')}
                        >
                            Start Prompting</button>
                    </div>
                </div>

                <video
                    ref={videoRef}
                    className='rounded-xl w-180 border-3 border-white/80 shadow-2xl/50'
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload='metadata'
                >
                    <source src='/videos/eleva.mp4' type="video/mp4" />
                </video>

            </div>

            <div className='absolute left-1/2 -translate-x-1/2 bottom-0 p-4 flex items-center'>

                {/* <div className='bg-[#00EEFF]/60 top-[60%] h-[100vh] w-[100vh] rounded-full blur-[120px] pointer-events-none'></div> */}
                <div>
                    <Window />
                </div>
            </div>
        </div>
    )
}

export default Landing