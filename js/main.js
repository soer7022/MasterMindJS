$(function () {

    let guesses = 1;
    let maxGuesses = 12;
    let guessInfo = $('.game p');
    let row = $('.game__row').clone();
    let active = null;
    let colors = ["rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(0, 0, 255)", "rgb(0, 128, 0)", "rgb(128, 0, 128)", "rgb(255, 165, 0)"];
    let secret = [colors[Math.floor(Math.random() * colors.length)],
        colors[Math.floor(Math.random() * colors.length)],
        colors[Math.floor(Math.random() * colors.length)],
        colors[Math.floor(Math.random() * colors.length)]];

    function updateGuessCounter() {
        guessInfo.text('Current guess: ' + guesses + " / " + maxGuesses);
    }

    updateGuessCounter();

    $('.game').on('click', '.game__guess', function (e) {
        if ($(this).parents('.guessed').length === 0) {
            // toggle display of color picker
            if ($(e.target).is(active)) {
                $('.game__picker').removeClass('game__picker--show'); //If the color picker is already active, dont show
                active = null;
            } else {
                $('.game__picker').removeClass('game__picker--show');
                $(this).find('.game__picker').addClass('game__picker--show');
                active = $(this);
            }
        }
    });

    $('.game').on('click', '.game__picker > div', function () {
        console.log($(this).css('background-color'));
        active.css('background-color', $(this).css('background-color'));
    });

    function revealAnswer() {
        window.alert("Too bad")
    }

    function winner() {
        window.alert("YOU WIN!")
    }

    function submitGuess() {
        guesses++;
        if(guesses <= maxGuesses) {
            $(this).remove();
            if (active !== null) {
                active.find('.game__picker').removeClass('game__picker--show');
            }

            let white = 0;
            let black = 0;

            $('.current .game__guess').each(function (i, elm) {
                    console.log($(this).css('background-color'));
                    if (secret.includes($(this).css('background-color'))) white++;
                    if (secret[i] === $(this).css('background-color')) black++;
                }
            );
            $('.current .game__correct > div:lt(' + white + ')').css('background', 'white');
            $('.current .game__correct > div:lt(' + black + ')').css('background', 'black');
            $('.current').removeClass('current');
            if (black === 4) {
                winner()
            } else {
                row.insertAfter('.game__row:last-of-type');
                row = $('.current').clone();
                updateGuessCounter();
            }
        } else {
            revealAnswer()
        }
    }

    $('.game').on('click', 'button', submitGuess)

});
