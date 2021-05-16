
sessionStorage.setItem('tutorMode', false);

$('input').on("change", function () {
    $("#createBtn").attr("disabled", false);
});



document.querySelector('#questionQuantity').addEventListener('input', function (e) {
    sessionStorage.setItem('questionQuantity', e.target.value)
});

document.querySelector('#ShowCorrectAnswer').addEventListener('change', function () {
    if (this.checked) {
        sessionStorage.setItem('tutorMode', true);
    }
    else {
        sessionStorage.setItem('tutorMode', false);
    }
});

document.querySelector('#TimeLimit').addEventListener('change', function () {
    if (this.checked) {
        sessionStorage.setItem('timeLimit', true);
    }
    else {
        sessionStorage.setItem('timeLimit', false);
    }
});

document.querySelector('#Unused').addEventListener('change', function () {
    if (this.checked) {
        sessionStorage.setItem('unused', true);
    }
    else {
        sessionStorage.setItem('unused', false);
    }
});