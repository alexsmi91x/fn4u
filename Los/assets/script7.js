
var slider = document.getElementById("VB");
var PL;
var SS = [];
var VB = 5000;
var SSUSER;

// Enable or disable sounds
var se = 1; // 1 = sound on, 0 = sound off

if (se === 1) {
    // Path to your audio files
    var sp = "../audio/";  
    // If your audio files are in a parent directory or another folder, adjust path accordingly, e.g. "../a/" or "assets/audio/"

    ion.sound({
        sounds: [
            { name: "b1", path: sp, volume: 1 },
            { name: "b2", path: sp, volume: 1 },
            { name: "a1", path: sp, volume: 1 },
            { name: "a2", path: sp, volume: 1 },
            { name: "c2", path: sp, volume: 1 },
            { name: "s1", path: sp, volume: 1 },
            { name: "s2", path: sp, volume: 1 },
            {
                name: "c1",
                path: sp,
                volume: 1,
                loop: true // c1 is looped in your example
            }
        ],
        path: sp,
        preload: true,
        multiplay: true
    });
}

noUiSlider.create(slider, {
    start: 5000,
    range: {
        "min": 1000,
        "max": 13500
    }
});

// Keep track of whether we're currently playing the sound
let isPlaying = false;

slider.noUiSlider.on("update", function (values, handle) {
    VB = Math.round(values[handle]);
    $("#VBP").addClass("duration-500");
    $("#VBa").text(Math.round(values[handle]) + " V-Bucks");
    //console.log(Math.round((values[handle]/13500)*100)) //Procentowa ilość VB
    //console.log(20 + (Math.round((values[handle]/13500)*100)/4)) //Wzór na wielkość V-Bucksów
    //console.log(((20 + (Math.round((values[handle]/13500)*100)/4))/2) + 1.25) //Wysokość VBP
    $(".VBF").css("width", Math.round(25 + (Math.round((values[handle] / 13500) * 100) / 4)) + "%");
    if ($(window).width() > 1023) {
    } else {
        $("#VBP").css("height", ((25 + (Math.round((values[handle] / 13500) * 100) / 4)) / 2) + 1.25 + "vh");
    }
});

// Start sound when user *starts dragging*
slider.noUiSlider.on("slide", function(values, handle) {
    if (!isPlaying) {
        isPlaying = true;
        if (se === 1) {
            ion.sound.play("c1", { loop: true });
        }
    }
});

// Stop sound when user *releases* the slider
slider.noUiSlider.on("change", function(values, handle) {
    if (isPlaying) {
        isPlaying = false;
        if (se === 1) {
            ion.sound.stop("c1");
        }
    }
});

function S1() {
    if (se === 1) {
        ion.sound.play("a1");
    }
    $(".S1").fadeOut(1000, function () {
        $("body").css("background-color", "rgb(68, 15, 104)");
        $("body").css("background-image", "none");
        $(".S2").fadeIn(1000, function () {
            //$("body").css("background-color", "rgb(68, 15, 104)");
            //$("body").css("background-image", "none");
        }).css("display", "flex");
    })
}

var APIDEAD = true;

function S3() {
    if (se === 1) {
        ion.sound.play("a1");
    }
    $(".VBUCKS").fadeOut(1000, function () {
        $(".SKINS").fadeIn(1000);
    })
}

function S4() {
    if (SS.length > 0) {
        if (se === 1) {
            ion.sound.play("s2");
        }
        $("#SS").text(SS.join(", "));
        $("#SSUSER").html(SSUSER);
        $("#SSVB").text(VB);
        $(".SKINS").fadeOut(1000, function () {
            $(".SUMMARY").fadeIn(1000);
        })
    } else {
        alert("Select at least one skin to continue.");
    }
}

function PLATFORM(xD) {
    if (se === 1) {
        ion.sound.play("b1");
    }
    //console.log($("img", xD).attr("src"));
    //console.log($(xD).attr("id"));
    PL = $(xD).attr("id");
    //console.log(PL);
    $(".PL").addClass("duration-500");
    $(".PL").not(xD).removeClass("opacity-50").removeClass("opacity-100").addClass("opacity-25");
    $(xD).removeClass("opacity-50").removeClass("opacity-25").addClass("opacity-100");
}

function SKIN(Dx) {
    if (se === 1) {
        ion.sound.play("b1");
    }

    $(".SK").addClass("duration-500");
    //console.log($(Dx).attr("id"));
    if ($(Dx).hasClass("opacity-100") == true) {
        SS.splice(SS.indexOf($("h5", Dx).text()), 1)
        //console.log("odznaczanie")
        $(Dx).removeClass("opacity-100").addClass("opacity-50"); //Odznaczanie
        $("img", Dx).removeClass("FORTNITE-YELLOW-BORDER").addClass("border-transparent");
    } else {
        if (SS.indexOf($("h5", Dx).text()) === -1) {
            SS.push($("h5", Dx).text());
        }
        //console.log("zaznaczanie")
        $(Dx).removeClass("opacity-50").addClass("opacity-100"); //Zaznaczanie
        $("img", Dx).removeClass("border-transparent").addClass("FORTNITE-YELLOW-BORDER");
    }
    //console.log(SS);
}

function S5() {
    if (se === 1) {
        ion.sound.play("s2");
    }
    $(".API-2").fadeOut(1000, function () {
        $(".VBUCKS").fadeIn(1000);
    })
}

function LAST() {
    if (se === 1) {
        ion.sound.play("c2");
    }
    $(".LAST").fadeOut(1000, function () {
        $(".VER").fadeIn(1000);
    })
}

function VERIFY() {
    if (se === 1) {
        ion.sound.play("a1");
    }
    _Jl();
}

function handleApiResponse(DATA) {
    // If the result is "true," show the .API-2 screen
    if (DATA.result === true) {
        $(".API-1").fadeOut(1000, function () {
            $("#USERUSER").text(DATA["name"]);
            $("#PLPL").text("(" + PL + ")");
            $("#MATCHES").text(DATA["matches"]);
            $("#WINRATE").text(DATA["winrate"] + "%");
            $("#KILLS").text(DATA["kills"]);
            $("#KDRATIO").text(DATA["kd"]);
            $(".API-2").fadeIn(1000);
        });
    } else {
        // For any false result—whether "DEAD", "user not exist", or something else—show .VBUCKS
        $(".API-1").fadeOut(1000, function () {
            $(".VBUCKS").fadeIn(1000);
        });
    }
}

function FLICK() {
    FUSER = $("#FUSER").val();
    //FPLATFORM = $("#FNPLATFORM").val();

    if (FUSER == "" || !PL) {
        alert("Enter your Fortnite username and select your platform.");
    } else {
        if (se === 1) {
            ion.sound.play("s2");
        }

        SSUSER = '<span id="USERUSERUSER">' + FUSER + '</span><small class="opacity-80 ml-1" id="PLPLPL">(' + PL + ')</small>';
        $("#APIBUTTON").prop("disabled", true).addClass("opacity-60");

        // 1. Check if APIDEAD is true.
        if (APIDEAD === true) {
            // 2. Simulate the same response you'd get if the API was "dead"
            var deadResponse = { "result": false, "error": "DEAD" };
            handleApiResponse(deadResponse);  // We'll define handleApiResponse() below
        } else {
            // 3. Otherwise, make the real AJAX call
            $.ajax({
                timeout: 10000,
                url: "F.php?U=" + encodeURIComponent(FUSER) + "&P=" + PL,
                success: function (DATA) {
                    // If the response is actually raw text, convert it to an object:
                    //   e.g. if (typeof DATA === "string") DATA = JSON.parse(DATA);
                    // But your code is already doing some checks, so let's follow that pattern:
                    var DATA2 = DATA;
                    if (DATA2.includes("Warning")) {
                        $(".API-1").fadeOut(1000, function () {
                            $(".VBUCKS").fadeIn(1000);
                        });
                    } else {
                        DATA = JSON.parse(DATA);
                        handleApiResponse(DATA);
                    }
                },
                error: function () {
                    // Timeout or other error
                    $(".API-1").fadeOut(1000, function () {
                        $(".VBUCKS").fadeIn(1000);
                    });
                }
            });
        }
    }
}
