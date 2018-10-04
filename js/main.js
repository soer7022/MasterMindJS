$(function () {

    let row = $('.game__row').clone();
    let active = null;
    let colors = ["rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(0, 0, 255)", "rgb(0, 128, 0)", "rgb(128, 0, 128)", "rgb(255, 165, 0)"];
    let secret = [colors[Math.floor(Math.random() * colors.length)],
                  colors[Math.floor(Math.random() * colors.length)],
                  colors[Math.floor(Math.random() * colors.length)],
                  colors[Math.floor(Math.random() * colors.length)]];
    secret = ["rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(0, 0, 255)", "rgb(0, 128, 0)"]

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

    $('.game').on('click','.game__picker > div', function () {
        console.log($(this).css('background-color'));
        active.css('background-color', $(this).css('background-color'));
    });

    function submitGuess() {
        $(this).remove();
        if (active !== null) {
            active.find('.game__picker').removeClass('game__picker--show');
        }

        let white = 0;
        let black = 0;

        $(this).parent().children('.game__guess').each(function (i,elm) {
                if (secret.includes($(this).css('background-color'))) white++;
                if (secret[i] === $(this).css('background-color')) black++;
            }
        );
        $(this).find('game__correct > div:lt('+ white +')').css('background','white');
        $('.game__correct > div:lt('+ black +')').css('background','black');

        console.log(white)
        row = row.clone();
    }

    $('.game').on('click','button',submitGuess)

});