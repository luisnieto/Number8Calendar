$(function() {
    $('#generate').on('click', function() {
      var date = stringToDate($('#start-date').val());
      var days = parseInt($('#number-days').val());
      var country = $('#country-code').val();

      if (date === undefined || isNaN(days) || country === '') {
        alert('All fields are required.');
        return;
      }

      // Clear calendar
      $('#calendar').html('');

      // Get the holidays

      // Render the dates
      for (var i = 0; i < days; i++) {
        var renderDate = addDates(date, i);
        renderDay(renderDate);
      }
    });
});

var weekDaysNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
var monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function createMonth(month, year, startingDate) {
  var id = year + '-' + month;
  var element = $('<div>').attr('id', id).addClass('month');

  for (var i = 0; i < weekDaysNames.length; i++) {
    element.append($('<span>').addClass('day').text(weekDaysNames[i]));
  }

  element.append($('<span>').addClass('title').text(monthsNames[month - 1] + ' ' + year));

  if (startingDate != undefined) {
    for (var i = 1; i <= startingDate; i++) {
      element.append($('<span>').addClass('invalid'));
    }
  }

  $('#calendar').append(element);
}

function renderDay(date) {
  var month = date.getMonth() + 1;
  var year = date.getYear() + 1900;
  var day = date.getDay();
  var type = 'week';

  var id = '#' + year + '-' + month;

  if ($(id).length == 0) {
    createMonth(month, year, day);
  }

  if (day == 0 || day == 6) {
    type = 'weekend';
  }

  $(id).append($('<span>').addClass(type).text(date.getDate()));
}

function stringToDate(str){
  var date = str.split("/"),
    m = date[0],
    d = date[1],
    y = date[2],
    temp = [];
  temp.push(y,m,d);
  return (new Date(temp.join("-")));
}

function addDates(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}