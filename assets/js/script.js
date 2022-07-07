// waits for jquery to be ready and then runs the code
$(document).ready(function(){
  // defining variables
  const $currentDayEl = $(`#currentDay`);
  const DateTime = luxon.DateTime;
  let stringTime = DateTime.local();

  // sets the currentDay to the current day and time
  $currentDayEl.text(`${stringTime.toLocaleString(DateTime.DATETIME_MED)}`);

  //save data func
  function saveData() {
    // grabs the userinput from the clicked hour
    let userInput = $(this).siblings(`.description`).val();
    // grabs the time from the clicked hour
    let time = $(this).parent().attr(`id`);
    // saves the time and userInput to the localstorage
    localStorage.setItem(time, userInput);
  }

  // click listener to save data to local storage
  $(".saveBtn").on("click", saveData);

  // i love for loops
  // this bad boy iterates through the saved times and updates the descriptions
  for (let i = 8; i < 19; i++) {
    $(`#t${i} .description`).val(localStorage.getItem(`t${i}`));
  }

  // main function to run it all
  function timeMain() {
    // grabs just the current hour
    let currentHour = stringTime.toFormat(`H`);
    
    // runs a function on each time-block element
    $(`.time-block`).each(function() {
      // declares the time of the current time-block element
      let calTime = parseInt($(this).attr(`id`).split(`t`)[1]);
  
      // checks and sets if past elements
      if (calTime < currentHour) {
        $(this).addClass("past");
        $(this).removeClass("present");
        $(this).removeClass("future");
      // checks and sets current element
      } else if (calTime === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
        $(this).removeClass("future");
      // sets future elements
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    })
  }

  timeMain();

}); 


