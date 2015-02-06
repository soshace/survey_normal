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
  var setActiveFrame = function(frame) {
    var yOffset = frame * -31;
    $("#loading-bar-line").css("background-position", "0 " + yOffset + "px");
  };

  // Run loading bar animation, firing callback when finished
  var runAnimation = function(endCallback) {
    var frame = 0;
    var last_frame = 20;
    var textActivationFrames = {13: 1, 20: 2};
    var next = function() {
      setActiveFrame(frame);

      if (textActivationFrames[frame]) {
        var index = textActivationFrames[frame];
        $('#loading-bar > ul > li').eq(index).addClass('enabled');
      }

      frame++;
      if (frame > last_frame) {
        clearInterval(interval);
        endCallback();
      }
    };

    var interval = setInterval(next, 100);
  };

  // Start animation sequence if 'loading-bar' exists on page
  if ($('#loading-bar').length) {
    runAnimation(function(){
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

    modalPositioning.call(window);
});
