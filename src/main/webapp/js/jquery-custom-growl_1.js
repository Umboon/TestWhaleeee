function growl(message, type, position) {
    var alretType = type;
    var $growlCustom = $('#growl-custom');
    $growlCustom.removeAttr('class');
    $growlCustom.html(message);
    var positionHeight = 0;
    var positionWidth = ($(window).outerWidth() / 2) - ($growlCustom.outerWidth() / 2);

    switch (position) {
        case 'top':
            positionHeight = 100;
            break;
        case 'buttom':
            positionHeight = $(window).outerHeight() - 100;
            break;
        default :
            positionHeight = ($(window).outerHeight() - browser().scrollTop());
    }

    $growlCustom.css('top', positionHeight);
    $growlCustom.css('left', positionWidth);
    $growlCustom.addClass(alretType).fadeIn(100).fadeOut(5000);
}

function browser() {
    var chrome = navigator.userAgent.search("Chrome");
    var frifox = navigator.userAgent.search("Firefox");
    var brwsr;
    if (chrome > -1) {
        brwsr = $('body');
    }
    else if (frifox > -1) {
        brwsr = $('html');
    }
    return brwsr;
}


