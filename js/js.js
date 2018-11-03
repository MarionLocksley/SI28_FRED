//////////////// VARIABLES

var name = "";

//////////////// FONCTION POUR LE PLEIN ECRAN

/*!
* screenfull
* v3.3.3 - 2018-09-04
* (c) Sindre Sorhus; MIT License
*/
(function () {
    'use strict';

    var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
    var isCommonjs = typeof module !== 'undefined' && module.exports;
    var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

    var fn = (function () {
        var val;

        var fnMap = [
            [
                'requestFullscreen',
                'exitFullscreen',
                'fullscreenElement',
                'fullscreenEnabled',
                'fullscreenchange',
                'fullscreenerror'
            ],
            // New WebKit
            [
                'webkitRequestFullscreen',
                'webkitExitFullscreen',
                'webkitFullscreenElement',
                'webkitFullscreenEnabled',
                'webkitfullscreenchange',
                'webkitfullscreenerror'

            ],
            // Old WebKit (Safari 5.1)
            [
                'webkitRequestFullScreen',
                'webkitCancelFullScreen',
                'webkitCurrentFullScreenElement',
                'webkitCancelFullScreen',
                'webkitfullscreenchange',
                'webkitfullscreenerror'

            ],
            [
                'mozRequestFullScreen',
                'mozCancelFullScreen',
                'mozFullScreenElement',
                'mozFullScreenEnabled',
                'mozfullscreenchange',
                'mozfullscreenerror'
            ],
            [
                'msRequestFullscreen',
                'msExitFullscreen',
                'msFullscreenElement',
                'msFullscreenEnabled',
                'MSFullscreenChange',
                'MSFullscreenError'
            ]
        ];

        var i = 0;
        var l = fnMap.length;
        var ret = {};

        for (; i < l; i++) {
            val = fnMap[i];
            if (val && val[1] in document) {
                for (i = 0; i < val.length; i++) {
                    ret[fnMap[0][i]] = val[i];
                }
                return ret;
            }
        }

        return false;
    })();

    var eventNameMap = {
        change: fn.fullscreenchange,
        error: fn.fullscreenerror
    };

    var screenfull = {
        request: function (elem) {
            var request = fn.requestFullscreen;

            elem = elem || document.documentElement;

            // Work around Safari 5.1 bug: reports support for
            // keyboard in fullscreen even though it doesn't.
            // Browser sniffing, since the alternative with
            // setTimeout is even worse.
            if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
                elem[request]();
            } else {
                elem[request](keyboardAllowed ? Element.ALLOW_KEYBOARD_INPUT : {});
            }
        },
        exit: function () {
            document[fn.exitFullscreen]();
        },
        toggle: function (elem) {
            if (this.isFullscreen) {
                this.exit();
            } else {
                this.request(elem);
            }
        },
        onchange: function (callback) {
            this.on('change', callback);
        },
        onerror: function (callback) {
            this.on('error', callback);
        },
        on: function (event, callback) {
            var eventName = eventNameMap[event];
            if (eventName) {
                document.addEventListener(eventName, callback, false);
            }
        },
        off: function (event, callback) {
            var eventName = eventNameMap[event];
            if (eventName) {
                document.removeEventListener(eventName, callback, false);
            }
        },
        raw: fn
    };

    if (!fn) {
        if (isCommonjs) {
            module.exports = false;
        } else {
            window.screenfull = false;
        }

        return;
    }

    Object.defineProperties(screenfull, {
        isFullscreen: {
            get: function () {
                return Boolean(document[fn.fullscreenElement]);
            }
        },
        element: {
            enumerable: true,
            get: function () {
                return document[fn.fullscreenElement];
            }
        },
        enabled: {
            enumerable: true,
            get: function () {
                // Coerce to boolean in case of old WebKit
                return Boolean(document[fn.fullscreenEnabled]);
            }
        }
    });

    if (isCommonjs) {
        module.exports = screenfull;
    } else {
        window.screenfull = screenfull;
    }
})();


/////////////// FONCTION POUR RECUPERER LE NOM



// permet de récuperer le nom du user via le formulaire dans la page html
// et modifie la valeur du span dans la page html
function userName() {
    name = document.getElementsByName("name")[0].value;
    console.log(name);
}


/////////////// FONCTION POUR AFFICHER LE NOM

function printUserName() {
    document.getElementById("userName").innerHTML="Bien sur, tu t'appelles "+name+".";

    // $("#userName").html("'Bien sur, tu t'appelles '+name+'.'")

    console.log(name);

}




/////////////// FONCTION POUR FADE IN une DIV /////////// MARCHE PAS
// http://api.jquery.com/fadeIn/

// With the element initially hidden, we can show it slowly:
$( document.body ).click(function() {
    $("#fadeIn:hidden:first").fadeIn( 2000, function() {
        // Animation complete
    });
});



/////////////// FONCTION POUR FADE OUT une DIV /////////// MARCHE PAS
// http://api.jquery.com/fadeIn/

// With the element initially hidden, we can show it slowly:

function fadeOutNow() {
    $("#fadeOut").delay(1000).fadeOut(3000, function () {
        //console.log("fade out fini.");
        $('#div1').load("src/chatouilles.html");
    });
}





function touchMe(){

    // on va chercher l'element du DOM dont l'id est "div1"
    // et on le met dans la variable "myElement" pour pouvoir agir dessus après
    var touch = document.getElementById('div1');

    var ecrirededans = document.getElementById('writeHere');


    var nb = 0;


    // create a simple instance
    // by default, it only adds horizontal recognizers

    var mc = new Hammer(touch);

    // let the pan gesture support all directions.
    // this will block the vertical scrolling on a touch-device while on the element

    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });


    // listen to events...
    mc.on("panleft panright panup pandown tap press", function(ev) {
        //ecrirededans.textContent = ev.type +" gesture detected.";
        nb++;
        //console.log(nb);
        //ecrirededans.innerHTML = nb.toString();
        if (nb==60){
            //console.log("gauche marche.");
            $('#div1').load("src/pinceMoi.html");
        }

    });


    // lorsque l'une des gestures est reconnue, on incrémente la variable associée
    // et on met à jour le span correspondant

/*    mc.on("panleft", function() {
        gcheNumber++;
        gche.innerHTML = gcheNumber.toString();
        if (gcheNumber==100){
            //console.log("gauche marche.");
            $('#div1').load("src/merci.html");
        }
    });*/

}



function pinceMe(){
    var myElement = document.getElementById('div1');
    var nbTest = document.getElementById('nbTest');


    var mc = new Hammer.Manager(myElement);

// create a pinch and rotate recognizer
// these require 2 pointers
    var pinch = new Hammer.Pinch();
    var rotate = new Hammer.Rotate();

// we want to detect both the same time
    pinch.recognizeWith(rotate);

// add to the Manager
    mc.add([pinch, rotate]);

    var nb=0;
    mc.on("pinch rotate", function(ev) {
        nb++;
        nbTest.innerHTML = nb;
        if (nb==80){
            //console.log("pinch marche.");
            $('#div1').load("src/merci.html");
        }
    });
}





////// charger page userName ////////////


$('#demarrerPE').click(function () {

    screenfull.request();

    FS=true;

    $('#div1').load("src/userName.html");

});

$('#exit').click(function () {
    screenfull.exit();
    FS=false;
});