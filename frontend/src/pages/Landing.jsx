import Window from '../components/landingpage/Window';
import '../styles/fonts.css';

function Landing() {
    return (
        <div className='h-screen w-full flex'>
            <div className="flex-3 flex flex-col justify-center items-center relative">
                <div className='flex flex-col gap-y-5 -mt-50'>
                    <div className='kant-700 text-6xl text-white flex flex-col'>
                        <div className=''>Get</div>
                        <div><span className='kant-700 text-6xl text-[#344F51] drop-shadow-lg drop-shadow-[#a3ca2e]'>10x</span> Output</div>
                    </div>
                    <div className='hind-500 text-xl text-white w-xl flex flex-col gap-y-2'>
                        <div>Write prompts to LLM in the right way to get precise outputs.
                        </div>
                        <div>We handle the prompt engineering, simply describe what you want in plain language, and we transform it into a structured, high-quality prompt.</div>
                        <div>Everything handled <span className='text-[#08373B] hind-600'>automatically, accurately, reliably</span>.</div>
                    </div>
                    <div>
                        <button
                            className='border-3 border-[#FFFFFF]/40 rounded-xl py-2 px-2.5 kant-400 tracking-wide text-white text-md bg-linear-350 from-[#31746c] via-[#4fa59b] via-60% via-[#31746c] to-[#FFFFFF]/30 to-90% bg-clip-padding'>
                            Start Prompting</button>
                    </div>
                </div>

                <div className='bg-[#00EEFF] absolute left-1/2 -translate-x-1/2 top-[63%] h-[90vh] w-[90vh] rounded-full blur-[120px] pointer-events-none'></div>
                <Window />

            </div>
            <div className='flex-2 bg-white'>

            </div>
        </div>
    )
}

export default Landing