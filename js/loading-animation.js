$(function() {
  var set_active_frame = function(frame) {
    var y_offset = frame * -31;
    $("#loading-bar-line").css("background-position", "0 " + y_offset + "px");
  }

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
    }

    var interval = setInterval(next, 100);
  }

  run_animation(function(){console.log("End")});
});
