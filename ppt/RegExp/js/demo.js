var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.$blockScrolling = Infinity;
editor.getSession().setMode("ace/mode/javascript");

var run = document.getElementById("run");
var result = document.getElementById("result");
run.addEventListener("click",runCode,false);

function runCode(){
    eval(editor.getValue());
}
