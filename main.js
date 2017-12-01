var w = 4;
var max = 2;
var score = 0;
var best = 0;
var isappend = false;

function ram2() {
    let p = Math.floor(Math.random() * (w * w)),
        q = Math.floor(Math.random() * (w * w));
    while (p === q) {
        q = Math.floor(Math.random() * (w * w));
    }
    let init = [2, 4];
    let m = Math.floor(Math.random() * 2),
        n = Math.floor(Math.random() * 2);
    $(".cell:nth-child(" + (p + 1) + ")").text(init[m]).addClass("c" + init[m]);
    $(".cell:nth-child(" + (q + 1) + ")").text(init[n]).addClass("c" + init[n]);
}

function create() {
    for (i = 0; i < w * w; i++) {
        $("#result").append("<div class='cell'></div>");
    }
    ram2();
}

function merge(key, check) {
    //argu i_f i_l j_f j_l p q
    switch (key) {
        case 37:
            //left
            argu = [0, w, 1, w + 1, w, 1];
            break;
        case 38:
            //up
            argu = [1, w + 1, 0, w, 1, w];
            break;
        case 39:
            //right  
            argu = [1, w + 1, 0, w, w, -1];
            break;
        case 40:
            //down
            argu = [1 + w * (w - 1), w * w + 1, 0, w, 1, -w];
            break;
    }
    let p = argu[4],
        q = argu[5];
    let tag2 = false;
    for (i = argu[0]; i < argu[1]; i++) {
        let tag = false;
        let base;
        let rec = [];
        let last = -1;
        for (j = argu[2]; j < argu[3]; j++) {
            if ($(".cell:nth-child(" + (i * p + j * q) + ")").text() !== "") {
                if (last === 0 && check === false) {
                    isappend = true;
                } else {
                    last = 1;
                }
                if (tag === false) {
                    base = parseInt($(".cell:nth-child(" + (i * p + j * q) + ")").text());
                    if (max < base && check === false) max = base;
                    tag = true;
                } else {
                    var k = parseInt($(".cell:nth-child(" + (i * p + j * q) + ")").text());
                    if (base === k) {
                        base *= 2;
                        if (check === false) {
                            score += base;
                        }
                    } else {
                        if (max < k && check === false) max = k;
                        rec.push(base);
                        base = k;
                    }
                }
            } else {
                last = 0;
            }
        }
        if (tag === true) rec.push(base);
        if (rec.length < w) tag2 = true;
        if (check === false) {
            for (j = argu[2]; j < argu[3]; j++) {
                let k = $(".cell:nth-child(" + (i * p + j * q) + ")").text();
                if (k) {
                    $(".cell:nth-child(" + (i * p + j * q) + ")").removeClass("c" + k);
                }
                $(".cell:nth-child(" + (i * p + j * q) + ")").text("");
            }
            for (j = 0; j < rec.length; j++) {
                $(".cell:nth-child(" + (i * p + (j + argu[2]) * q) + ")").addClass("c" + rec[j]);
                $(".cell:nth-child(" + (i * p + (j + argu[2]) * q) + ")").text(rec[j]);
            }
        }
    }
    return tag2;
}

function append() {
    for (i = 1; i <= w * w; i++)
        if ($(".cell:nth-child(" + (i) + ")").text() == "") break;
    if (i == w * w + 1) return;
    let tf = [2, 4];
    let m = Math.floor(Math.random() * 2);
    let p = Math.floor(Math.random() * (w * w));
    while ($(".cell:nth-child(" + (p + 1) + ")").text() !== "") {
        p = Math.floor(Math.random() * (w * w));
    }
    $(".cell:nth-child(" + (p + 1) + ")").text(tf[m]);
    $(".cell:nth-child(" + (p + 1) + ")").addClass("c" + tf[m]);
}

function dododo(key) {
    if (key.keyCode <= 40 && key.keyCode >= 37) {
        merge(key.keyCode, false);
        $("#sc").text(score);
        if (score > best) {
            best = score;
            $("#be").text(best);
        }
        if (max == 2048) {
            $("p").text("YOU WIN");
            $(window).off("keydown", dododo);
        }
        if (!merge(37, true) && !merge(38, true)) {
            $("p").text("GAME OVER");
        } else if (isappend === true) {
            append();
            isappend = false;
        }
        $("#show").text(max);
    }
}
$(function () {
    create();
    $(window).keydown(dododo);
    $("#btn").click(function () {
        score = 0;
        $("#sc").text(score);
        $(window).on("keydown", dododo, false);
        for (i = 1; i <= 16; i++) {
            let k = $(".cell:nth-child(" + (i) + ")").text();
            if (k) {
                $(".cell:nth-child(" + (i) + ")").removeClass("c" + k);
            }
            $(".cell:nth-child(" + (i) + ")").text("");
        }
        ram2();
        $("p").text("");
    });
});
