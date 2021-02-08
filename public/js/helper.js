// JavaScript Document

function gotoloc(url) {
    window.location.replace(url);
}

function togglePass(field) {
    var x = document.getElementById(field);
    var y = document.getElementById(field+'_eye');
    if (x.type === "password") {
        x.type = "text";
        y.classList.remove("fa-eye");
        y.classList.add("fa-eye-slash");
    } else {
        x.type = "password";
        y.classList.remove("fa-eye-slash");
        y.classList.add("fa-eye");
    }
}

function setDmxValue(field,val) {
    dmx.app.set(field, val);
}
