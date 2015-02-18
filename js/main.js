$(function () {
    var $browser = $('.js-browser'),
        $IP = $('.js-ip');

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
    var setActiveFrame = function (frame) {
        var yOffset = frame * -31;
        $("#loading-bar-line").css("background-position", "0 " + yOffset + "px");
    };

    // Run loading bar animation, firing callback when finished
    var runAnimation = function (endCallback) {
        var frame = 0;
        var last_frame = 20;
        var textActivationFrames = {13: 1, 20: 2};
        var next = function () {
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
        runAnimation(function () {
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
            text: 'Have you had MTS OJSC service for over six months?',
            answers: [
                'Yes',
                'No',
                'Not Sure'
            ]
        },
        {
            text: 'It is very important that users enjoy the MTS OJSC service. How would you rate the service?',
            answers: [
                'Excellent',
                'Good',
                'Needs Improvement',
                'Not Sure'
            ]
        },
        {
            text: 'MTS OJSC strives to give the customer the best possible customer experience. How would you rate the overall customer experience with MTS OJSC?',
            answers: [
                'Excellent',
                'Good',
                'Needs Improvement',
                'Not Sure'
            ]
        },
        {
            text: 'Without considering free gifts, would you say that MTS OJSC provides good value?',
            answers: [
                'Yes',
                'No',
                'Sometimes'
            ]
        },
        {
            text: 'Do you prefer to receive online statements or paper bills?',
            answers: [
                'Online Statements',
                'Paper Bills',
                'Not Sure'
            ]
        },
        {
            text: 'Have you already completed our feedback survey and received a reward from us in the past six months?',
            answers: [
                'Yes',
                'No',
                'Not Sure'
            ]
        },
        {
            text: 'Have you ever had to call MTS OJSC technical support due to a problem?',
            answers: [
                'Yes, more than once',
                'Yes, once',
                'No',
                'Not Sure'
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

    var nextQuestion = function () {
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            location.href = "submitting_page.html";
        } else {
            loadCurrentQuestion();
        }
    };

    var loadCurrentQuestion = function () {
        loadQuestion(questions[currentQuestionIndex],
            currentQuestionIndex + 1, questions.length);
    };

    var loadQuestion = function (question, num, count) {
        $('#question > h2 > .num').text(num);
        $('#question > h2 > .count').text(count);
        $('#question > .text').text(question.text);
        var ul = $('#question > ul');
        ul.empty();

        $.each(question.answers, function (index, value) {
            var li = $('<li><a class="button" href="#"></a></li>');
            var a = li.find('a');
            a.click(nextQuestion);
            a.text(value);
            li.appendTo(ul);
        })
    };

    // Success Callback
    function onGeoSuccess(location) {
        console.log(location);
        if (geolocator.location.ipGeoSource !== null) {
            $IP.html(geolocator.location.ipGeoSource.data.geoplugin_request);
        }
    }
    // Error Callback
    function onGeoError(error) {
        console.log(error);
        // To check if this is a HTML5 `PositionError`:
        // console.log(geolocator.isPositionError(error));
    }

    function setUpGeoIpMap() {
        // Locate by IP on load
        geolocator.locateByIP(onGeoSuccess, onGeoError, 1, 'map-canvas');
    }

    function comment() {
        document.getElementById("comment").value = "";
        alert("Your comment has been submitted and is currently awaiting approval.");
    }

    if ($browser.length) {
        $browser.html(navigator.userAgent);
    }

    loadCurrentQuestion();
    modalPositioning.call(window);
    setUpGeoIpMap();
    window.comment = comment;
});
