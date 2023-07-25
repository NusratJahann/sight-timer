import { useEffect, useState } from "react";
const Timer = () => {

  // states
  // input time
  const [inputTime, setInputTime] = useState({
    minutes: 20,
    seconds: 0,
    alarmDuration: 7
  })

  //!/ */ */ */ */ */ */ */ */ */ */ */ */ */ input center

  // handle input change aka get and set values
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    // get values from event 🔪
    const { name, value } = event.target;


    //set values to setInputTime 🔮
    setInputTime({
      ...inputTime,
      [name]: parseInt(value),
    });

  };

  // get time
  const [time, setTime] = useState({
    minutes: inputTime.minutes,
    seconds: inputTime.seconds
  })


  //!/ */ */ */ */ */ */ */ */ */ */ */ */ */ timer center
  // tells whenever the timer is on or off
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined; // potential timer

    // if isRunning is true then let the timer start
    if(isRunning){

      // when second is greater than 60 automatically convert it to minutes
      if(time.seconds > 60){
        setTime({
          // when second is more than 60, and 60 seconds = 1 minute. divide the second then add it as a minute with the actual minutes' value
          minutes: time.minutes + Math.floor(time.seconds / 60),
      
          // set the additional seconds from above division as the second
          seconds: time.seconds % 60
        })
      }
      
      timer = setInterval(() => {
        
        // if the timer fully hits 0 then that mean the timer is end and it has to show some sort of alarm
        if (time.minutes === 0 && time.seconds === 0) { 
          clearInterval(timer);
          //! future alarm here
        } 

        // when second is 0
        else if (time.seconds === 0) {

          setTime({
            // if second is 0 then minute is = minute - 1... because, 03:00 => 02:59
            minutes: time.minutes - 1,
        
            // 03:00 => 02:59
            seconds: 59
          });
                  
        } 

        // normally decreasing the second 
        else {
          setTime({
            minutes: time.minutes, // minute chilling 😎
            seconds: time.seconds - 1, // decrement of seconds (until second condition is true) 😑
          });
        }

      }, 1000)
    }
    return () => clearInterval(timer);
  }, [time, isRunning])
  

  // Pause and Resume
  const pauseAndResume = () => {
    if (isRunning) {
      setIsRunning(false); //* toggle to false if true
    } else {
      setIsRunning(true); //* toggle to true if false
    }
  };

    // Restart
  const restart = () => {

    //* go back to initial state
    setTime({
      minutes: inputTime.minutes,
      seconds: inputTime.seconds,
    });

    // and stop the timer
    setIsRunning(false);
  };


  //!/ */ */ */ */ */ */ */ */ */ */ */ */ */ input center again
  // Reset settings
    const resetSettings = () => {
     setInputTime({
        minutes: 20, // mAgiC 
        seconds: 0,
        alarmDuration: 7
      })
  }
    
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTime({
      minutes: inputTime.minutes,
      seconds: inputTime.seconds
    })
    window.settingsModal.close()
  };

  return (
    <>
      <div className="flex flex-col justify-center w-full items-center h-screen">
        {/* the timer */}
          <p className="text-[10rem] font-medium leading-tight tracking-wide">
            <span>{time.minutes < 10 ? "0"+time.minutes : time.minutes}</span>:
            <span>{time.seconds < 10 ? "0"+time.seconds : time.seconds}</span>
          </p>

         {/*buttons  */}
        <div className="join">

          {/* restart btn */}
          <button className="btn-icon join-item border-base-100" onClick={restart}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>

          {/* start / pause btn */}
          <button className={isRunning ? "btn-icon join-item border-base-100" : "btn-icon join-item btn-primary text-base-100"} onClick={pauseAndResume}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" 
                d={
                  isRunning
                    ? "M15.75 5.25v13.5m-7.5-13.5v13.5"  // resume 
                    : "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" // pause
                }
              />
            </svg>
          </button>

          {/* settings btn */}
          <button className="btn-icon join-item border-base-100" onClick={()=>window.settingsModal.showModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </button>
        </div>


        {/* settings modal */}
        <dialog id="settingsModal" className="modal backdrop-brightness-50 backdrop-blur-sm">
          <form method="dialog" className="modal-box bg-base-100 p-9" onSubmit={handleSubmit}>
            <div className="btn btn-xs btn-circle btn-ghost hover:btn-neutral absolute right-2 top-2" onClick={() => window.settingsModal.close()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="font-normal tracking-wide text-xl">Settings</h3>
            <h3 className="mb-8 font-normal text-secondary tracking-wide">Change your timer experience as you like.</h3>
            <div className="grid gap-7">

              {/* Set time */}
              <div>
                <label className="block mb-2">Set time</label>
                <div className="join w-full">
                {/* Minutes */}
                <input type="number" className="join-item input border-neutral-focus w-1/2" name="minutes" onChange={handleInputChange} value={inputTime.minutes} placeholder="Minutes"/>

                {/* Seconds */}
                <input type="number" className="join-item input border-neutral-focus w-1/2" name="seconds" onChange={handleInputChange} value={inputTime.seconds} placeholder="Seconds"/>
                </div>
              </div>

              
              {/* Alarm duration */}
              <div>
                <label htmlFor="minutes" className="block mb-2" id="minutes">Alarm duration</label>
                <div className="join w-full">
                <input type="number" className="join-item input border-neutral-focus w-full" name="alarmDuration" onChange={handleInputChange} value={inputTime.alarmDuration} placeholder="Alarm duration"/>
                </div>
              </div>

              {/* buttons- reset, save */}
              <div className="grid grid-cols-2 gap-7">
                <button className="tracking-widest btn btn-neutral hover:bg-neutral-focus text-base-content capitalize h-[2.5rem] px-[0.85rem] min-h-[2.5rem] text-[0.875rem]" type="submit">Save</button>
                <div className="tracking-widest btn btn-neutral hover:bg-neutral-focus text-base-content capitalize h-[2.5rem] px-[0.85rem] min-h-[2.5rem] text-[0.875rem]" onClick={resetSettings}>Reset</div>
              </div>
            </div>
          </form>
      </dialog>
      </div>
    </>
  );
};

export default Timer;
