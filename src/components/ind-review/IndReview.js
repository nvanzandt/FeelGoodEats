
function Review({ name, body, overall, taste, options, comfort}) {

  const getColorClass = (value) => {
    if (value < 3) {
      return "red-300";
    } else if (value < 4) {
      return "yellow-300";
    } else {
      return "green-300";
    }
  };

  return (
    <div>
      <div class=" flex flex-row w-[700px] mt-6 px-3 py-2 bg-gray-100">
          <div class="flex flex-col align-middle">
            <h3 class="text-center">Overall</h3>
            <h3 className={`text-lg font-bold h-16 w-16 flex items-center justify-center bg-${getColorClass(overall)}`}>{overall.toFixed(1)}</h3>
          </div>
          <div class="ml-10">
            <h1 class="font-bold">{name}</h1>
            <h3 class="mt-1">{body}</h3>
            <div class="flex flex-row align-middle mt-2">

              <div class="flex flex-col items-center justify-center mr-6">
                <h3 class="text-center font-light">Taste</h3>
                <h3 className={`text-m font-bold h-10 w-10 flex items-center justify-center bg-${getColorClass(taste)}`}>{taste.toFixed(1)}</h3>
              </div>
              
              <div class="flex flex-col items-center justify-center mr-4">
                <h3 class="text-center font-light">Options</h3>
                <h3 className={`text-m font-bold h-10 w-10 flex items-center justify-center bg-${getColorClass(options)}`}>{options.toFixed(1)}</h3>
              </div>

              <div class="flex flex-col items-center justify-center">
                <h3 class="text-center font-light">Comfort</h3>
                <h3 className={`text-m font-bold h-10 w-10 flex items-center justify-center bg-${getColorClass(comfort)}`}>{comfort.toFixed(1)}</h3>
              </div>

            </div>
          </div> 
        </div>
    </div>
    
  );
}

export default Review;