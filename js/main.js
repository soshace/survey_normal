$(function() {

  /**
   * Function positions modal window (.js-modal)
   *
   * @function
   * @name modalPositioning
   * @returns {undefined}
   */
  function modalPositioning() {
    var $this = $(this),
        $modalWindow = $('.js-modal'),
        modalWindowHeight,
        windowHeight;

    if ($modalWindow.length) {
      modalWindowHeight = $modalWindow.height();
      windowHeight = $this.height();

      if (windowHeight > modalWindowHeight) {
        $modalWindow.css('top', windowHeight / 2 - modalWindowHeight / 2);
        return;
      }

      $modalWindow.css('top', 0);
    }
  }

  // Set active frame of loading bar
  var set_active_frame = function(frame) {
    var y_offset = frame * -31;
    $("#loading-bar-line").css("background-position", "0 " + y_offset + "px");
  };

  // Run loading bar animation, firing callback when finished
  var run_animation = function(end_callback) {
    var frame = 0;
    var last_frame = 20;
    var text_activation_frames = {13: 1, 20: 2};
    var next = function() {
      set_active_frame(frame);

      if (text_activation_frames[frame]) {
        var index = text_activation_frames[frame];
        $('#loading-bar > ul > li').eq(index).addClass('enabled');
      }

      frame++;
      if (frame > last_frame) {
        clearInterval(interval);
        end_callback();
      }
    };

    var interval = setInterval(next, 100);
  };

  // Start animation sequence if 'loading-bar' exists on page
  if ($('#loading-bar').length) {
    run_animation(function(){
      location.href = "presents_page.html";
    });
  }

  $('.js-player').jPlayer({
    ready: function () {
      $(this).jPlayer('setMedia', {
          mp3: 'audio/uk.mp3'
      }).jPlayer('play');
    },
    swfPath: 'js/vendors/jplayer',
    supplied: 'mp3',
    cssSelectorAncestor: '',
    cssSelector: {
      play: '.js-play',
      pause: '.js-pause',
      playBar: '.js-play-bar',
      noSolution: '.js-no-solution'
    }
  });

  var questions = [
    {
      text: 'Where are you viewing Lloyds Bank from?',
      answers: [
        'At home',
        'At work',
        'Other'
      ]
    },
    {
      text: 'How often do you visit Lloyds Bank?',
      answers: [
        'Once a week or more',
        'Less than once a week',
        'This is my first visit'
      ]
    },
    {
      text: 'How many hours do you spend online each day?',
      answers: [
        'Less than 4 hours',
        '5 - 10 Hours',
        'More than 10 hours'
      ]
    },
    {
      text: 'What is your gender?',
      answers: [
        'Male',
        'Female'
      ]
    }
  ];

  var currentQuestionIndex = 0;

  var nextQuestion = function() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
      location.href="submitting_page.html";
    } else {
      loadCurrentQuestion();
    }
  }

  var loadCurrentQuestion = function() {
    loadQuestion(questions[currentQuestionIndex],
      currentQuestionIndex+1, questions.length);
  }

  var loadQuestion = function(question, num, count) {
    $('#question').attr('class', 'variants-'+question.answers.length)
    $('#question > h2 > .num').text(num);
    $('#question > h2 > .count').text(count);
    $('#question > .text').text(question.text);
    var ul = $('#question > ul');
    ul.empty();

    $.each(question.answers, function(index, value) {
      var li = $('<li><a class="button" href="#"></a></li>');
      var a = li.find('a');
      a.click(nextQuestion);
      a.text(value);
      li.appendTo(ul);
    })
  }

  loadCurrentQuestion();

  modalPositioning.call(window);
});
