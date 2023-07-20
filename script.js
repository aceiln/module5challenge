$(document).ready(function () {
  $(function () {

    function convertTo12Hour(hour) {
      if (hour === 0) {
          return '12am';
      } else if (hour === 12) {
          return '12pm';
      } else if (hour < 12) {
          return `${hour}am`;
      } else {
          return `${hour - 12}pm`;
      }
    }
    
    function getRelativeTime(hour) {
      const currentHour = (new Date()).getHours();
      if (hour < currentHour) {
          return `past`
      } else if (hour > currentHour) {
          return `future`
      } else if (hour === currentHour) {
          return `present`
      }
    }
    
    function getLocalStorageData() {
      let localStorageEvents = window.localStorage.getItem('events')
      if (localStorageEvents === null) {
        localStorageEvents = JSON.stringify(new Array(24).fill(''))
        window.localStorage.setItem('events', localStorageEvents)
      }
    
      return JSON.parse(localStorageEvents)
    }
    
    function loadTimeBlocks() {
      for (let i = 0; i <= 23; i++) {
        const timeIn12Hour = convertTo12Hour(i) // 12am, 12pm, 3am, 5pm, etc
        const relativeTime = getRelativeTime(i) // past, present, future
        const eventsForTime = getLocalStorageData()[i]
    
        $('#schedule_list').append(`<div id="${i}" class="row time-block ${relativeTime}">
        <div class="col-2 col-md-1 hour text-center py-3">${timeIn12Hour}</div>
        <textarea class="col-8 col-md-10 description" rows="3">${eventsForTime}</textarea>
        <button id="${i}" class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>`)
      }
    }
    
    function saveEvent(timeslot, eventData) {
      console.log(eventData)
      let localStorageData = getLocalStorageData()
      localStorageData[timeslot] = eventData
    
      window.localStorage.setItem('events', JSON.stringify(localStorageData))
    }

    // Load page, setup event handler

    $("#header_date").text(new Date().toLocaleDateString())

    loadTimeBlocks()
    
    $(".saveBtn").click(function(event){
      saveEvent($(event.target).attr('id'), $(event.target).closest('.row').find('.description').val())
    });
    
  });
});