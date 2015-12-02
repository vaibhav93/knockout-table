$(document).ready(function(){
    $("#inputName").on('keyup', printName);
});

function printName() {
    $("#outputName").text($("#inputName").val());
}