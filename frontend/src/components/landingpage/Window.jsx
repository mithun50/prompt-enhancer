import { features } from '../../arrays/features'

function Window() {
  return (

    <div className="bg-[#3f7992]/40 absolute bottom-0 left-28 right-28 h-[32vh] border-8 border-b-0 rounded-2xl rounded-b-none border-[#FFFFFF]/40 flex flex-col overflow-hidden gap-y-2 px-3 pt-3 z-10">
 
      <div className='flex gap-1'>
        <div className='w-3 h-3 bg-red-500 rounded-full'></div>
        <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
        <div className='w-3 h-3 bg-green-500 rounded-full'></div>
      </div>

      <div className='flex gap-30 flex-1 min-h-0 overflow-hidden px-2 pt-1'>

        <div className='grid grid-cols-2 grid-rows-2 gap-5 bg-[#B5DCED]/37 border-2 border-black/40 border-b-0 rounded-lg rounded-b-none p-6 h-full overflow-auto'>

          {features.map(({ id, icon: Icon, iconProps, title, description }) => (
            <div key={id} className="flex items-center justify-center gap-x-2 px-5 bg-[#B5DCED]/37 rounded-lg">
              <div className=''>
                <Icon {...iconProps} />
              </div>
              <div>
                <div className='hind-600 text-xl text-[#344F51]'>{title}</div>
                <div className='hind-400 text-md text-[#ffffff]'>{description}</div>
              </div>
            </div>
          ))}

        </div>

        <div></div>
      </div>
    </div>
  )
}

export default Window