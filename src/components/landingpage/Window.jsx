import { User, House, Newspaper, AppWindow } from 'lucide-react'
import { features } from '../../arrays/features'

function Window() {
  return (
    <div className="bg-[#3f7992]/85 w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw] max-w-5xl mx-auto relative border-4 sm:border-6 md:border-8 border-b-0 rounded-2xl sm:rounded-3xl rounded-b-none border-white/40 flex flex-col overflow-hidden gap-y-2 px-2 sm:px-3 pt-2 sm:pt-3 z-10">

      {/* Traffic lights */}
      <div className='flex gap-1 sm:gap-1.5'>
        <div className='w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full'></div>
        <div className='w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-yellow-500 rounded-full'></div>
        <div className='w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full'></div>
      </div>

      <div className='flex gap-2 sm:gap-4 md:gap-5 lg:gap-7 flex-1 min-h-0 overflow-hidden px-1 sm:px-2 pt-1'>

        {/* Features Grid */}
        <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-5 bg-[#B5DCED]/37 border-2 border-black/40 border-b-0 rounded-lg rounded-b-none p-2 sm:p-3 md:p-4 lg:p-6 overflow-auto'>
          {features.map(({ id, icon: Icon, iconProps, title, description }) => (
            <div key={id} className="flex items-center gap-x-2 sm:gap-x-3 p-2 sm:p-3 md:p-4 lg:px-5 bg-[#B5DCED]/37 rounded-lg">
              <div className='shrink-0'>
                <Icon
                  {...iconProps}
                  size={iconProps?.size ? Math.min(iconProps.size, 24) : 20}
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                />
              </div>
              <div className='min-w-0'>
                <div className='hind-600 text-sm sm:text-base md:text-lg lg:text-xl text-[#344F51] truncate'>{title}</div>
                <div className='hind-400 text-xs sm:text-sm md:text-base text-white/90 line-clamp-2'>{description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Icons - Hidden on mobile */}
        <div className='hidden sm:flex flex-col items-center justify-between gap-y-2 bg-[#B5DCED]/37 border-2 border-black/40 border-b-0 rounded-lg rounded-b-none p-3 sm:p-4 md:p-5 lg:p-6'>
          <div>
            <User className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" color='#344F51' />
          </div>
          <div>
            <House className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" color='#344F51' />
          </div>
          <div>
            <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" color='#344F51' />
          </div>
          <div>
            <AppWindow className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" color='#344F51' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Window
