import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
// import { MagicCard } from "@/components/magicui/magic-card";
import { AuroraText } from "@/components/magicui/aurora-text";
// import { LineShadowText } from "@/components/magicui/line-shadow-text";



const Solvinger = () => {
  return (
    <div className=''>


      <div className="flex  items-center justify-center">
        <div
          className={
            'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in  hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
          }
        >
          {/* <MagicCard> */}
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Introducing Solvinger OG </span>
            {/* <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" /> */}
          </AnimatedShinyText>
          {/* </MagicCard> */}
        </div>
      </div>

      <div className='flex justify-center content-center mt-9 '>
        <div className='' >
          <h3 className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-5xl"> What on <AuroraText className="font-black">your mind</AuroraText>
          </h3>
          <div><span className='font-medium text-lg lg:text-xl float-right'>Now Solvinger can do for you 😊</span></div>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-4 items-end mt-10">
        <div className="">


          <div className="flex h-full flex-col space-y-2.5 md:space-y-4 mt-5 col-span-1">
            <h2 className="font-heading line-clamp-2 text-balance text-lg font-bold md:text-xl">Automate tasks by setting a schedule</h2>
            <div className="flex-col space-y-2 overflow-x-auto rounded-xl sm:flex sm:bg-card sm:border sm:p-2">
              <button className="focus-visible:ring-ring inline-flex justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm dark:hover:bg-[#404040] hover:bg-[#e6e6e6] aspect-auto h-fit w-full min-w-full flex-row items-center gap-2 whitespace-normal rounded-lg border p-2.5 text-left">
                <h3 className="tracking-tight flex-1 text-base font-medium sm:text-sm">Daily email summaries and priorities</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="text-primary size-7 shrink-0 self-end sm:size-5 sm:self-auto" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,109.66-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,173.66,133.66Z"></path></svg></button>
              <button className="focus-visible:ring-ring inline-flex justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm dark:hover:bg-[#404040] hover:bg-[#e6e6e6] aspect-auto h-fit w-full min-w-full flex-row items-center gap-2 whitespace-normal rounded-lg border p-2.5 text-left">
                <h3 className="tracking-tight flex-1 text-base font-medium sm:text-sm">Personal daily news digest of the AI industry</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="text-primary size-7 shrink-0 self-end sm:size-5 sm:self-auto" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,109.66-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,173.66,133.66Z"></path></svg></button>
              <button className="focus-visible:ring-ring inline-flex justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm dark:hover:bg-[#404040] hover:bg-[#e6e6e6] aspect-auto h-fit w-full min-w-full flex-row items-center gap-2 whitespace-normal rounded-lg border p-2.5 text-left">
                <h3 className="tracking-tight flex-1 text-base font-medium sm:text-sm ">Weekly Business Newsletter</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="text-primary size-7 shrink-0 self-end sm:size-5 sm:self-auto" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,109.66-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,173.66,133.66Z"></path></svg></button></div></div>
        </div>

        <div>
          <div className="flex h-full flex-col space-y-2.5 md:space-y-4 col-span-1"><h2 className="font-heading line-clamp-2 text-balance text-lg font-bold md:text-xl">Conduct in-depth research on topics you may be interested in</h2><div className="flex-col space-y-2 overflow-x-auto rounded-xl sm:flex sm:bg-card sm:border sm:p-2"><button className="focus-visible:ring-ring inline-flex justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm dark:hover:bg-[#404040] hover:bg-[#e6e6e6] aspect-auto h-fit w-full min-w-full flex-row items-center gap-2 whitespace-normal rounded-lg border p-2.5 text-left"><h3 className="tracking-tight flex-1 text-base font-medium sm:text-sm">Top Electric Vehicles in North America</h3><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="text-primary size-7 shrink-0 self-end sm:size-5 sm:self-auto" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,109.66-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,173.66,133.66Z"></path></svg></button><button className="focus-visible:ring-ring inline-flex justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm dark:hover:bg-[#404040] hover:bg-[#e6e6e6] aspect-auto h-fit w-full min-w-full flex-row items-center gap-2 whitespace-normal rounded-lg border p-2.5 text-left"><h3 className="tracking-tight flex-1 text-base font-medium sm:text-sm">10-day Itinerary for Tokyo and Nearby Cities</h3><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="text-primary size-7 shrink-0 self-end sm:size-5 sm:self-auto" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,109.66-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,173.66,133.66Z"></path></svg></button><button className="focus-visible:ring-ring inline-flex justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm dark:hover:bg-[#404040] hover:bg-[#e6e6e6] aspect-auto h-fit w-full min-w-full flex-row items-center gap-2 whitespace-normal rounded-lg border p-2.5 text-left"><h3 className="tracking-tight flex-1 text-base font-medium sm:text-sm">Business Model Canvas for Nike</h3><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="text-primary size-7 shrink-0 self-end sm:size-5 sm:self-auto" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,109.66-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,173.66,133.66Z"></path></svg></button></div></div>
        </div>


      </div>

      {/* <div className='mb-0'>
  <marquee>
    <div className='flex'>

    <div  className='bg-gray-600 px-4 py-2 m-4 rounded-lg'>
      Hello
    </div>
    <div className='bg-gray-600 px-4 py-2 m-4 rounded-lg'>
      Hello
    </div>
    </div>
  </marquee>
</div> */}
    </div>
  )
}

export default Solvinger