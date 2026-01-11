import Header from '../components/common/Header';
import '../styles/fonts.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, MessageSquare, ChevronDown, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { features } from '../arrays/features';

function Landing() {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

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

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const toggleFullscreen = () => {
        if (!videoRef.current) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoRef.current.requestFullscreen().catch(err => {
                console.error('Fullscreen error:', err);
            });
        }
    };

    const scrollToFeatures = () => {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='min-h-screen min-h-dvh w-full flex flex-col relative overflow-x-hidden'>
            <Header />

            {/* Hero Section */}
            <section className="min-h-screen min-h-dvh flex flex-col items-center justify-center relative px-4 sm:px-6 md:px-8 pt-16 sm:pt-20">
                {/* Background Glow */}
                <div className='absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-[60%] bg-[#BDE8DC]/20 blur-[120px] rounded-full pointer-events-none' />

                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 sm:gap-10 lg:gap-16 max-w-7xl mx-auto w-full relative z-10">
                    {/* Hero Text */}
                    <div className='flex flex-col gap-y-5 sm:gap-y-6 md:gap-y-8 max-w-xl text-center lg:text-left'>
                        {/* Badge */}
                        <div className='flex justify-center lg:justify-start'>
                            <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-[#317F84]/30 border border-[#317F84]/40 rounded-full'>
                                <Sparkles className='w-4 h-4 text-[#BDE8DC]' />
                                <span className='hind-500 text-xs sm:text-sm text-[#BDE8DC]'>AI-Powered Prompt Engineering</span>
                            </div>
                        </div>

                        {/* Main Headline */}
                        <h1 className='kant-700 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight'>
                            Get <span className='text-[#BDE8DC] drop-shadow-[0_0_30px_rgba(189,232,220,0.5)]'>10x</span> Better
                            <br />
                            <span className='text-white/90'>LLM Outputs</span>
                        </h1>

                        {/* Subheadline */}
                        <p className='hind-400 text-base sm:text-lg md:text-xl text-white/70 max-w-lg mx-auto lg:mx-0'>
                            Transform simple descriptions into powerful, structured prompts. Write less, achieve more with every AI interaction.
                        </p>

                        {/* CTA Buttons */}
                        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start'>
                            <button
                                onClick={() => navigate('/enhance')}
                                className='group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#317F84] to-[#305A6C] hover:from-[#3a9490] hover:to-[#317F84] rounded-xl kant-500 text-white text-base sm:text-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-[#317F84]/30 border border-[#BDE8DC]/20'
                            >
                                Start Enhancing
                                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                            </button>
                            <button
                                onClick={scrollToFeatures}
                                className='flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#305A6C]/30 hover:bg-[#305A6C]/50 border border-[#317F84]/30 hover:border-[#317F84]/50 rounded-xl kant-400 text-white text-base sm:text-lg transition-all duration-200'
                            >
                                Learn More
                            </button>
                        </div>

                        {/* Stats */}
                        <div className='flex justify-center lg:justify-start gap-8 sm:gap-12 pt-4'>
                            <div className='text-center'>
                                <div className='kant-700 text-2xl sm:text-3xl text-white'>10x</div>
                                <div className='hind-400 text-xs sm:text-sm text-white/50'>Better Output</div>
                            </div>
                            <div className='text-center'>
                                <div className='kant-700 text-2xl sm:text-3xl text-white'>50%</div>
                                <div className='hind-400 text-xs sm:text-sm text-white/50'>Less Effort</div>
                            </div>
                            <div className='text-center'>
                                <div className='kant-700 text-2xl sm:text-3xl text-white'>Free</div>
                                <div className='hind-400 text-xs sm:text-sm text-white/50'>To Use</div>
                            </div>
                        </div>
                    </div>

                    {/* Video Demo */}
                    <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'>
                        <div className='relative group'>
                            <div className='absolute -inset-4 bg-[#BDE8DC]/15 blur-2xl rounded-3xl' />
                            <video
                                ref={videoRef}
                                className='relative rounded-xl sm:rounded-2xl w-full border-2 border-[#317F84]/40 shadow-2xl shadow-[#317F84]/20'
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload='metadata'
                            >
                                <source src='/videos/eleva.mp4' type="video/mp4" />
                            </video>

                            {/* Video Controls */}
                            <div className='absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-200'>
                                {/* Mute/Unmute Button */}
                                <button
                                    onClick={toggleMute}
                                    className='p-2 sm:p-2.5 rounded-xl bg-[#1a3a3a]/80 backdrop-blur-sm border border-[#317F84]/30 text-white/70 hover:text-white hover:bg-[#1a3a3a] transition-all duration-200'
                                    title={isMuted ? 'Unmute' : 'Mute'}
                                >
                                    {isMuted ? (
                                        <VolumeX className='w-4 h-4 sm:w-5 sm:h-5' />
                                    ) : (
                                        <Volume2 className='w-4 h-4 sm:w-5 sm:h-5' />
                                    )}
                                </button>

                                {/* Fullscreen Button */}
                                <button
                                    onClick={toggleFullscreen}
                                    className='p-2 sm:p-2.5 rounded-xl bg-[#1a3a3a]/80 backdrop-blur-sm border border-[#317F84]/30 text-white/70 hover:text-white hover:bg-[#1a3a3a] transition-all duration-200'
                                    title='Fullscreen'
                                >
                                    <Maximize className='w-4 h-4 sm:w-5 sm:h-5' />
                                </button>
                            </div>

                            {/* Sound hint - shows briefly */}
                            {isMuted && (
                                <div className='absolute bottom-14 sm:bottom-16 right-3 sm:right-4 px-2 py-1 rounded-lg bg-[#1a3a3a]/90 text-white/60 text-xs hind-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                                    Click for sound
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <button
                    onClick={scrollToFeatures}
                    className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hover:text-white/80 transition-colors'
                >
                    <ChevronDown className='w-8 h-8' />
                </button>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative">
                <div className='max-w-6xl mx-auto'>
                    {/* Section Header */}
                    <div className='text-center mb-12 sm:mb-16'>
                        <h2 className='kant-700 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4'>
                            Why Choose <span className='text-[#BDE8DC]'>Eleva</span>?
                        </h2>
                        <p className='hind-400 text-base sm:text-lg text-white/60 max-w-2xl mx-auto'>
                            Everything you need to create perfect prompts, powered by advanced AI and proven patterns.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
                        {features.map(({ id, icon: Icon, title, description }) => (
                            <div
                                key={id}
                                className='group p-5 sm:p-6 bg-[#305A6C]/30 backdrop-blur-sm border border-[#317F84]/20 rounded-xl sm:rounded-2xl hover:bg-[#305A6C]/50 hover:border-[#317F84]/40 transition-all duration-300'
                            >
                                <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#317F84]/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#317F84]/50 transition-all'>
                                    <Icon className='w-6 h-6 sm:w-7 sm:h-7 text-[#BDE8DC]' />
                                </div>
                                <h3 className='kant-600 text-base sm:text-lg text-white mb-2'>{title}</h3>
                                <p className='hind-400 text-sm sm:text-base text-white/60'>{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-[#305A6C]/20 border-y border-[#317F84]/10">
                <div className='max-w-5xl mx-auto'>
                    {/* Section Header */}
                    <div className='text-center mb-12 sm:mb-16'>
                        <h2 className='kant-700 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4'>
                            How It <span className='text-[#BDE8DC]'>Works</span>
                        </h2>
                        <p className='hind-400 text-base sm:text-lg text-white/60'>
                            Three simple steps to better prompts
                        </p>
                    </div>

                    {/* Steps */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'>
                        {[
                            {
                                step: '01',
                                icon: MessageSquare,
                                title: 'Describe Your Goal',
                                description: 'Simply type what you want to achieve in plain, everyday language.',
                            },
                            {
                                step: '02',
                                icon: Zap,
                                title: 'AI Enhancement',
                                description: 'Our AI analyzes and transforms your input into a structured, detailed prompt.',
                            },
                            {
                                step: '03',
                                icon: Shield,
                                title: 'Get Results',
                                description: 'Use your enhanced prompt to get precise, high-quality outputs from any LLM.',
                            },
                        ].map(({ step, icon: Icon, title, description }) => (
                            <div key={step} className='relative text-center'>
                                {/* Step Number */}
                                <div className='kant-700 text-6xl sm:text-7xl md:text-8xl text-[#BDE8DC]/10 absolute -top-4 left-1/2 -translate-x-1/2'>
                                    {step}
                                </div>

                                {/* Content */}
                                <div className='relative pt-8 sm:pt-10'>
                                    <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#317F84]/30 border border-[#BDE8DC]/20 flex items-center justify-center mx-auto mb-4'>
                                        <Icon className='w-6 h-6 sm:w-7 sm:h-7 text-[#BDE8DC]' />
                                    </div>
                                    <h3 className='kant-600 text-lg sm:text-xl text-white mb-2'>{title}</h3>
                                    <p className='hind-400 text-sm sm:text-base text-white/60 max-w-xs mx-auto'>{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative">
                {/* Background Glow */}
                <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[80%] bg-[#BDE8DC]/10 blur-[100px] rounded-full pointer-events-none' />

                <div className='max-w-3xl mx-auto text-center relative z-10'>
                    <h2 className='kant-700 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6'>
                        Ready to Transform Your Prompts?
                    </h2>
                    <p className='hind-400 text-base sm:text-lg text-white/60 mb-8 sm:mb-10 max-w-xl mx-auto'>
                        Join thousands of users who are getting better AI outputs with perfectly crafted prompts.
                    </p>
                    <button
                        onClick={() => navigate('/enhance')}
                        className='group inline-flex items-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#317F84] to-[#305A6C] hover:from-[#3a9490] hover:to-[#317F84] rounded-xl sm:rounded-2xl kant-500 text-white text-lg sm:text-xl transition-all duration-200 hover:scale-105 shadow-xl shadow-[#317F84]/30 border border-[#BDE8DC]/20'
                    >
                        Get Started Free
                        <ArrowRight className='w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform' />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 sm:py-10 px-4 sm:px-6 md:px-8 border-t border-[#317F84]/20">
                <div className='max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
                    <div className='kant-700 text-xl sm:text-2xl text-white'>Eleva</div>
                    <p className='hind-400 text-sm text-white/40'>
                        Built with AI for better AI interactions
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Landing;
