// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require bootstrap-tagsinput
//= require_tree .


$( document ).on('turbolinks:load', function() {
  let currentYear = new Date().getFullYear();
  document.getElementsByClassName('currentYear')[0].innerText = currentYear;
  $( document ).ready(function() {
    $('#step1').val('');
  });

  $(document).on('click', '.goNextStep', function(){
    let currentStep = $(this).data('current-step');
    let nextStep = $(this).data('next-step');
    let prevStep = $(this).data('prev-step');
    if ( currentStep === 1 ) {
      let checkStep1Selection = $('#step1').val();
      if ( checkStep1Selection === '' ) {
        $('.step1').prepend(`
          <div class="alert alert-danger alert-dismissible">
            <button type="button" class="close" id="closeAlert">×</button>
            <strong>Opps!</strong> Please select one of below Category.
          </div>
        `);
      } else if ( checkStep1Selection !== '' ) {
        $('.step1').hide();
        $('.step2').show();
        $('.gobalPart h1').text('Place an advertisement');
        $('.gobalPart .stepList span').removeClass('active');
        $('.gobalPart .stepList span.s2').addClass('active');
      }
    } else if ( currentStep === 2 ) {
      $('.step1, .step2').hide();
      $('.step3').show();
      $('.gobalPart h1').text('Place an advertisement');
      $('.gobalPart .stepList span').removeClass('active');
      $('.gobalPart .stepList span.s3').addClass('active');
      // $('.step3').append(`
      //   <link rel="stylesheet" href="./assets/css/jquery-ui.min.css" />
      //   <script src="./assets/js/jquery-ui.min.js"></script>
      //   <script>
      //     $( function() {
      //       $( ".thumbnails" ).sortable({
      //         placeholder: 'placeHolder',
      //         cursor: 'move',
      //         axis: 'y'
      //       });
      //     });
      //   </script>
      // `);
    } else if ( currentStep === 3 ) {
      $('.step1, .step2, .step3').hide();
      $('.step4').show();
      $('.gobalPart h1').text('Place an advertisement');
      $('.gobalPart .stepList span').removeClass('active');
      $('.gobalPart .stepList span.s4').addClass('active');
    }
  });

  $(document).on('click', '.step1 .row .col', function(){
    $('.step1 .row .col').removeClass('active');
    $(this).addClass('active');
    let firstStepVal = $(this).data('value');
    $('#step1').val( firstStepVal );
  });

  $(document).on('click', '#closeAlert', function(){
    $(this).parent().remove();
  });

  $(document).on('keyup', '#shortDes', function(){
    let len = $(this).val().length;
    if ( len <= 120 ) {
      $(this).removeClass('bg-warning');
    } else {
      $(this).addClass('bg-warning');
    }
  });

  $(document).on('click', 'span.setDefault', function(){
    let getMainImgSrc = $('.mainImg img').attr('src');
    let currentImgSrc = $(this).next('img').attr('src');
    $('.mainImg img').attr('src', currentImgSrc);
    $(this).next('img').attr('src', getMainImgSrc);
  });

  $(document).on('click', '.getTime', function () {
  $('.getTime').removeClass('active');
  $(this).addClass('active');
  let currentTime = new Date().toLocaleTimeString();
  let breakTime = currentTime.split(':')
  let hours = breakTime[0];
  let minutes = breakTime[1];
  let am_pm = breakTime[2].split(' ')[1];
  let currentValue = $(this).val();
  $('.timeSetter').remove();
  if ( currentValue === '' ) {
    $(this).val(`${hours}:${minutes} ${am_pm}`);
    $(this).parent().append(`
      <div class="timeSetter">
        <div class="centerCenter">
          <table class="w-100">
            <tr>
              <td width="30%">
                <img src="./assets/images/arrow-up.svg" class="upHours">
              </td>
              <td width="30%">
                <img src="./assets/images/arrow-up.svg" class="upMinutes">
              </td>
              <td rowspan="3" class="AmPm" align="right">${am_pm}</td>
            </tr>
            <tr>
              <td class="hours" align="center">${hours}</td>
              <td class="minutes" align="center">${minutes}</td>
            </tr>
            <tr>
              <td>
                <img src="./assets/images/arrow-down.svg" class="downHours">
              </td>
              <td>
                <img src="./assets/images/arrow-down.svg" class="downMinutes">
              </td>
            </tr>
          </table>
        </div>
      </div>
    `);
  } else {
    let getPreviousTime = $(this).val();
    let previousBreakTime = getPreviousTime.split(':')
    let previousHours = previousBreakTime[0];
    let previousMinutes = previousBreakTime[1].split(' ');
    let previousAm_pm = previousMinutes[1];
    previousMinutes = previousMinutes[0];
    $(this).parent().append(`
      <div class="timeSetter">
        <div class="centerCenter">
          <table class="w-100">
            <tr>
              <td width="30%">
                <img src="./assets/images/arrow-up.svg" class="upHours">
              </td>
              <td width="30%">
                <img src="./assets/images/arrow-up.svg" class="upMinutes">
              </td>
              <td rowspan="3" class="AmPm" align="right">${previousAm_pm}</td>
            </tr>
            <tr>
              <td class="hours" align="center">${previousHours}</td>
              <td class="minutes" align="center">${previousMinutes}</td>
            </tr>
            <tr>
              <td>
                <img src="./assets/images/arrow-down.svg" class="downHours">
              </td>
              <td>
                <img src="./assets/images/arrow-down.svg" class="downMinutes">
              </td>
            </tr>
          </table>
        </div>
      </div>
    `);
  }
});

$(document).on('click', '.upHours', function () {
  let currentHourIs = $('.hours').text();
  let newHour;
  currentHourIs = parseInt(currentHourIs);
  if ( currentHourIs >= 1 && currentHourIs <= 11 ) {
    newHour = currentHourIs + 1;
    $('.hours').text( ( newHour === 0 || newHour <= 9 ? '0' + newHour : newHour ) );
  } else {
    newHour = 1;
    $('.hours').text( ( newHour === 0 || newHour <= 9 ? '0' + newHour : newHour ) );
  }
  setTimer( ( newHour === 0 || newHour <= 9 ? '0' + newHour : newHour ), '', '');
});

$(document).on('click', '.downHours', function () {
  let currentHourIs = $('.hours').text();
  let newHour;
  currentHourIs = parseInt(currentHourIs);
  if ( currentHourIs >= 2 && currentHourIs <= 12 ) {
    newHour = currentHourIs - 1;
    $('.hours').text( ( newHour === 0 || newHour <= 9 ? '0' + newHour : newHour ) );
  } else {
    newHour = 12;
    $('.hours').text( ( newHour === 0 || newHour <= 9 ? '0' + newHour : newHour ) );
  }
  setTimer(( newHour === 0 || newHour <= 9 ? '0' + newHour : newHour ), '', '');
});

$(document).on('click', '.upMinutes', function () {
  let currentHourIs = $('.minutes').text();
  let newMinutes;
  currentHourIs = parseInt(currentHourIs);
  if ( currentHourIs >= 0 && currentHourIs <= 58 ) {
    newMinutes = currentHourIs + 1;
    $('.minutes').text( ( newMinutes === 0 || newMinutes <= 9 ? '0' + newMinutes : newMinutes ) );
  } else {
    newMinutes = 00;
    $('.minutes').text( ( newMinutes === 0 || newMinutes <= 9 ? '0' + newMinutes : newMinutes ) );
  }
  setTimer('', ( newMinutes === 0 || newMinutes <= 9 ? '0' + newMinutes : newMinutes ), '');
});

$(document).on('click', '.downMinutes', function () {
  let currentHourIs = $('.minutes').text();
  let newMinutes;
  currentHourIs = parseInt(currentHourIs);
  if ( currentHourIs >= 1 && currentHourIs <= 59 ) {
    newMinutes = currentHourIs - 1;
    $('.minutes').text( ( newMinutes === 0 || newMinutes <= 9 ? '0' + newMinutes : newMinutes ) );
  } else {
    newMinutes = 59;
    $('.minutes').text( newMinutes );
  }
  setTimer('', ( newMinutes === 0 || newMinutes <= 9 ? '0' + newMinutes : newMinutes ), '');
});

$(document).on('click', '.AmPm', function(){
  let getAMPM = $(this).text();
  if ( getAMPM === 'PM' ) {
    $(this).text('AM');
  }else if ( getAMPM === 'AM' ) {
    $(this).text('PM');
  }
  getAMPM = $(this).text();
  setTimer('', '', getAMPM);
});

function setTimer(H='', M='', AMPM='') {
  let getCurrentTime = $('.getTime.active').val();
  let previousBreakTime = getCurrentTime.split(':')
  let previousHours = previousBreakTime[0];
  let previousMinutes = previousBreakTime[1].split(' ');
  let previousAm_pm = previousMinutes[1];
  previousMinutes = previousMinutes[0];
  if ( H !== '' && M === '' && AMPM === '' ) {
    $('.getTime.active').val(`${H}:${previousMinutes} ${previousAm_pm}`);
  } else if ( H === '' && M !== '' && AMPM === '' ) {
    $('.getTime.active').val(`${previousHours}:${M} ${previousAm_pm}`);
  } else if ( H === '' && M === '' && AMPM !== '' ) {
    $('.getTime.active').val(`${previousHours}:${previousMinutes} ${AMPM}`);
  }
}

$(document).mouseup(function(e) {
    var container = $(".timeSetter");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.remove();
    }
});

$(document).on('click', '#thisIsStep3', function () {
      let step1Value = $('#step1').val();
      let step2_offerTitle = $('#activity_offer_title').val();
      let step2_shortDes = $('#activity_short_description').val();
      let step2_longDes = $('#activity_long_description').val();
      let step2_radioInput = $('input[type="radio"][name="activity[search_type]"]:checked').val();
      let step2_tags = $('#activity_tags_attributes_0_tag_name').val();

  $('.gettingData').html(`
  <textarea name="step1Value">${step1Value}</textarea>
  <textarea name="step2_offerTitle">${step2_offerTitle}</textarea>
  <textarea name="step2_shortDes">${step2_shortDes}</textarea>
  <textarea name="step2_longDes">${step2_longDes}</textarea>
  <textarea name="step2_radioInput">${step2_radioInput}</textarea>
  <textarea name="step2_tags">${step2_tags}</textarea>
  `);
  $('.gettingData').hide();
  $('.fourthStepButton').show();
});

});
