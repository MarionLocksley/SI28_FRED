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



/////////////// FONCTION POUR FADE OUT une DIV ///////////
// http://api.jquery.com/fadeIn/

// With the element initially hidden, we can show it slowly:

function fadeOutNow() {
    $("#fadeOut").delay(3000).fadeOut(7000, function () {
        //console.log("fade out fini.");
        $('#div1').load("src/chatouilles.html");
    });
}


function noVoice(){
    $("#voice").delay(3000).fadeOut(3000, function () {
        //console.log("fade out fini.");
        $('#div1').load("src/tapoteMoi.html");
    });
}


function tapoteMe(){

/*
    var taptap = document.getElementById('div1');

    var nbTap = 0;

    var mcTap = new Hammer(taptap);

    // let the pan gesture support all directions.
    // this will block the vertical scrolling on a touch-device while on the element
    //mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    // listen to events...
    mcTap.on("tap", function(ev) {
        nbTap++;
        console.log("tap marche.");
        if (nbTap==10){
            console.log("tap fini");
            $('#div1').load("src/pinceMoi.html");
            mcTap.off("panleft panright panup pandown tap press", function(){});
            mcTap.destroy();
        }

    });

*/




    var tap = document.getElementById('div1');

    // We create a manager object, which is the same as Hammer(), but without the presetted recognizers.
    var mc = new Hammer.Manager(tap);

    // Default, tap recognizer
    mc.add( new Hammer.Tap() );

    // Tap recognizer with minimal 4 taps
    mc.add( new Hammer.Tap({ event: 'quadrupletap', taps: 2 }) );

    // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
    // the tap event will be emitted on every tap
    mc.get('quadrupletap').recognizeWith('tap');

    mc.on("quadrupletap", function(ev) {
        //myElement.textContent += ev.type +" ";
        console.log("2Tap.");
        mc.off("quadrupletap", function(){});
        mc.destroy();
        $('#div1').load("src/secoueMoi.html");
    });


}





function touchMe(){

    // on va chercher l'element du DOM dont l'id est "div1"
    // et on le met dans la variable "myElement" pour pouvoir agir dessus après
    var touch = document.getElementById('div1');

    //var ecrirededans = document.getElementById('writeHere');

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
        //ecrirededans.innerHTML = nb.toString();
        console.log("touch marche.");
        if (nb==60){
            console.log("gauche marche.");
            $('#div1').load("src/pinceMoi.html");
            mc.off("panleft panright panup pandown tap press", function(){});
            mc.destroy();
        }

    });

}

function caresseMe(){

    // on va chercher l'element du DOM dont l'id est "div1"
    // et on le met dans la variable "myElement" pour pouvoir agir dessus après
    var caresse = document.getElementById('div1');

    //var ecrirededans = document.getElementById('writeHere');

    var nbCar = 0;

    // create a simple instance
    // by default, it only adds horizontal recognizers

    var mcCar = new Hammer(caresse);

    // let the pan gesture support all directions.
    // this will block the vertical scrolling on a touch-device while on the element
    mcCar.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    // listen to events...
    mcCar.on("panleft panright panup pandown tap press", function(ev) {
        //ecrirededans.textContent = ev.type +" gesture detected.";
        nbCar++;
        console.log("ça marche.");
        //ecrirededans.innerHTML = nb.toString();
        if (nbCar==50){
            console.log("stop.");
            $('#div1').load("src/plusDeVoix.html");
            //mcCar.on("panleft panright panup pandown tap press",function(e){e.srcEvent.stopPropagation();});
            mcCar.off("panleft panright panup pandown tap press", function () {});
            mcCar.destroy();
        }

    });

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
            console.log("pinch marche.");
            $('#div1').load("src/caresses.html");
            mc.off("pinch rotate", function () {});
            mc.destroy();
        }
    });
}


function secoueMe(){

    // https://github.com/alexgibson/shake.js
    //listen to shake event
    var shakeEvent = new Shake({threshold: 5});

    shakeEvent.start();

    window.addEventListener('shake', function(){
        console.log("Shaked");
        stopShake();
        $('#div1').load("src/rangeMoi.html");
    }, false);

    //stop listening
    function stopShake(){
        shakeEvent.stop();
    }

    //check if shake is supported or not.
    if(!("ondevicemotion" in window)){alert("Not Supported");}

}

function rangeMe(){

    if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) {
        document.getElementById('moApi').innerHTML = 'Generic Sensor API';

        let lastReadingTimestamp;
        let accelerometer = new LinearAccelerationSensor();
        accelerometer.addEventListener('reading', e => {
            if (lastReadingTimestamp) {
                intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
            }
            lastReadingTimestamp = accelerometer.timestamp
            accelerationHandler(accelerometer, 'moAccel');
        });
        accelerometer.start();

        if ('GravitySensor' in window) {
            let gravity = new GravitySensor();
            gravity.addEventListener('reading', e => accelerationHandler(gravity, 'moAccelGrav'));
            gravity.start();
        }

        let gyroscope = new Gyroscope();
        gyroscope.addEventListener('reading', e => rotationHandler({
            alpha: gyroscope.x,
            beta: gyroscope.y,
            gamma: gyroscope.z
        }));
        gyroscope.start();

    } else if ('DeviceMotionEvent' in window) {
        document.getElementById('moApi').innerHTML = 'Device Motion API';

        var onDeviceMotion = function (eventData) {
            accelerationHandler(eventData.acceleration, 'moAccel');
            accelerationHandler(eventData.accelerationIncludingGravity, 'moAccelGrav');
            rotationHandler(eventData.rotationRate);
            intervalHandler(eventData.interval);
        }

        window.addEventListener('devicemotion', onDeviceMotion, false);
    } else {
        document.getElementById('moApi').innerHTML = 'No Accelerometer & Gyroscope API available';
    }

    function accelerationHandler(acceleration, targetId) {
        var info, xyz = "[X, Y, Z]";

        info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(1));	//en parametre le nombre de chiffres que l'on veut apres la virgule
        info = info.replace("Y", acceleration.y && acceleration.y.toFixed(1));
        info = info.replace("Z", acceleration.z && acceleration.z.toFixed(1));
        document.getElementById(targetId).innerHTML = info;
    }

    function rotationHandler(rotation) {
        var info, xyz = "[X, Y, Z]";

        info = xyz.replace("X", rotation.alpha && rotation.alpha.toFixed(1));
        info = info.replace("Y", rotation.beta && rotation.beta.toFixed(1));
        info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(1));
        document.getElementById("moRotation").innerHTML = info;
    }

    function intervalHandler(interval) {
        document.getElementById("moInterval").innerHTML = interval;
    }


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