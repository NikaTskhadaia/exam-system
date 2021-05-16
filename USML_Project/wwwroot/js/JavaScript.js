const examlist = new Map();
const questionlist = new Map();
let confirmation = false;
let counter = 0;
let startTime = new Date().getTime();

window.onload = function () {
    $("header").remove();
    $("footer").remove();
    for (var i = 1; i <= sessionStorage.getItem('questionQuantity'); i++) {
        $('#questionlist').append(`<a id="q${i}" href="#" style="background-color: #f8f9fa; text-align: center; color: black; transition:.3s;">${i}</a>`);
    }

    $("body").css("background-image", "none");
    $("body").css("background-color", "#f8f9fa");

    if (sessionStorage.getItem('timeLimit') == 'true') {
        let display = document.querySelector('#time');
        let duration = sessionStorage.getItem('questionQuantity') * 100;
        startTimer(duration, display);
    }
    else {
        $("#time").remove();
    }

    let questionId = $(".question").attr("id");
    examlist.set(questionId, 0);
    questionlist.set(questionId, 1);

    $("#q1").append("<i class = 'fi-rr-eye' > </i >");
    $("#q1").css("background-color", "burlywood");
};

$('#main').on('click', '#submit', function (event) {

    event.preventDefault();
    let answerId = $("input:checked").val();
    let questionId = $(".question").attr("id");


    examlist.set(questionId, answerId);

    $.ajax({
        type: "POST",
        url: "/Exam",
        data: { answerId, questionId },
        dataType: "text",
        success: function (data) {
            if (answerId == data) {
                counter++;
                if (sessionStorage.getItem('tutorMode') == 'true') {
                    $("label[name=" + data + "]").css("background-color", "#007E33");

                    $("#q" + questionlist.get(questionId) + " > i").remove();
                    $("#q" + questionlist.get(questionId)).append(" <i class = 'fi-rr-checkbox'> </i >");
                }
            }
            else {
                if (sessionStorage.getItem('tutorMode') == 'true') {                    
                    $("label[name=" + answerId + "]").css("background-color", "#ff4444");
                    $("label[name=" + data + "]").css("background-color", "#007E33");
                    $("label[name=" + data + "]").css("color", "white");

                    $("#q" + questionlist.get(questionId) + " > i").remove();
                    $("#q" + questionlist.get(questionId)).append(" <i class = 'fi-rr-cross-circle'> </i >");
                }
            }
        }
    });
    
    if (sessionStorage.getItem('tutorMode') !== 'true') {


        $("#q" + questionlist.get(questionId) + " > i").remove();
        $("#q" + questionlist.get(questionId)).append(" <i class = 'fi-rr-rec'> </i >");

        let questionIndex = questionlist.get(questionId);

        if (questionIndex == sessionStorage.getItem('questionQuantity')) {
            return;
        }

        $.ajax({
            type: "GET",
            url: "/Exam?handler=next",
            data: { questionIndex },
            dataType: "html",
            success: function (data) {
                $('#main').html(data);
                let questionId = $(".question").attr("id");
                examlist.set(questionId, examlist.get(questionId) ?? 0);
                questionlist.set(questionId, ++questionIndex);
                $("a").css("background-color", "#f8f9fa");
                $("#q" + questionIndex).css("background-color", "burlywood");

                if ($("#q" + questionIndex).has("i").length == 0) {
                    $("#q" + questionIndex).append("<i class= 'fi-rr-eye' ></i>");
                }
            }
        });
    }
    $("input[type='radio']").attr("disabled", true);
    $("input[type='submit']").attr("disabled", true);
});

$("#main").on("click", '#next', function () {

    event.preventDefault();

    let questionId = $(".question").attr("id");
    let questionIndex = questionlist.get(questionId);

    if (questionIndex == sessionStorage.getItem('questionQuantity')) {
        return;
    }

    $.ajax({
        type: "GET",
        url: "/Exam?handler=next",
        data: { questionIndex },
        dataType: "html",
        success: function (data) {
            $('#main').html(data);
            let questionId = $(".question").attr("id");
            examlist.set(questionId, examlist.get(questionId) ?? 0);
            questionlist.set(questionId, ++questionIndex);

            $("a").css("background-color", "#f8f9fa");
            $("#q" + questionIndex).css("background-color", "burlywood");

            if ($("#q" + questionIndex).has("i").length == 0) {
                $("#q" + questionIndex).append("<i class= 'fi-rr-eye' ></i>");
            }
        }
    });

    $("input[type='submit']").attr("disabled", true);
});

$("#main").on("click", '#previous', function () {

    event.preventDefault();

    let questionId = $(".question").attr("id");
    let questionIndex = questionlist.get(questionId) - 1;

    if (questionIndex < 1) {
        return;
    }

    $.ajax({
        type: "GET",
        url: "/Exam?handler=previous",
        data: { questionIndex },
        dataType: "text",
        success: function (data) {
            $('#main').html(data);

            let questionId = $(".question").attr("id");
            examlist.set(questionId, examlist.get(questionId) ?? 0);
            questionlist.set(questionId, questionIndex);

            console.log(questionlist.get(questionId));

            $("a").css("background-color", "#f8f9fa");
            $("#q" + questionIndex).css("background-color", "burlywood");

            if ($("#q" + questionIndex).has("i").length == 0) {
                $("#q" + questionIndex).append("<i class= 'fi-rr-eye' ></i>");
            }
        }
    });

    $("input[type='submit']").attr("disabled", true);
});

$("#questionlist").on("click", "a", function () {

    event.preventDefault();

    let questionIndex = parseInt($(this).text());

    $.ajax({
        type: "GET",
        url: "/Exam?handler=random",
        data: { questionIndex },
        dataType: "html",
        success: function (data) {
            $('#main').html(data);
            let questionId = $(".question").attr("id");
            examlist.set(questionId, examlist.get(questionId) ?? 0);
            questionlist.set(questionId, questionIndex);

            console.log(questionlist.get(questionId));
        }
    });


    $("a").css("background-color", "#f8f9fa");
    $("#q" + questionIndex).css("background-color", "burlywood");

    if ($("#q" + questionIndex).has("i").length == 0) {
        $("#q" + questionIndex).append("<i class= 'fi-rr-eye' ></i>");
    }
    $("input[type='submit']").attr("disabled", true);
});

function startTimer(duration, display) {

    let timer = duration, minutes, seconds;

    let myTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (minutes < 3) {
            $('#time').css("color", "red");
        }

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            document.getElementById("main").innerText = `სწორი პასუხების რაოდენობა ${counter}`;
            clearInterval(myTimer);
        }
    }, 1000);
}

$(".finish-exam").on('click', function () {
    confirmation = confirm("დაადასტურე დასრულება");

    if (confirmation == false) {
        return;
    }
    event.preventDefault();

    let endTime = new Date().getTime();

    let answerList = JSON.stringify(Object.fromEntries(examlist));

    let duration = Math.floor((endTime - startTime) / 1000);

    $.ajax({
        type: "POST",
        url: "/Exam?handler=finish",
        data: { answerList, duration, counter },
        dataType: "text",
        success: function (data) {
            window.location.replace(data);
        }
    });
});

window.onbeforeunload = function () {

    if (!confirmation) {

        let c = confirm();

        if (c) {
            return true;
        }
        else {
            return false;
        }
    }
}

window.onunload = function () {
    sessionStorage.clear();
}


//Styles

$("#main").on("click", 'label', function () {

    let questionId = $(".question").attr("id");
    if (examlist.get(questionId) > 0) {
        return;
    }

    $("label").css("background-color", "transparent");
    $("label").css("color", "black");
    $(this).css("background-color", "hsl(200, 100%, 70%)");
    $(this).css("color", "white");
    $("input[type='submit']").attr("disabled", false);
});

$("#main").on("mouseover", 'label', function () {

    let questionId = $(".question").attr("id");
    if (examlist.get(`${questionId}`) > 0) {
        return;
    }

    $(this).css("background-color", "hsl(200, 50%, 70%)");
    $(this).css('cursor', 'pointer');
});

$("#main").on("mouseout", 'label', function () {

    let questionId = $(".question").attr("id");
    if (examlist.get(`${questionId}`) > 0) {
        return;
    }        

    $("label").css("background-color", "transparent");

    let id = $("input:checked").val();
    $("label[name=" + id + "]").css("background-color", "hsl(200, 100%, 70%)");
    $("label[name=" + id + "]").css("color", "white");

    $(this).css('cursor', 'inherit');
});

$("#questionlist").on("mouseover", "a", function () {
    $(this).css("transform", "scale(1.5)");
});

$("#questionlist").on("mouseout", "a", function () {
    $(this).css("transform", "scale(1)");
});