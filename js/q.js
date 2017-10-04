var runningName = false;
var TName;

var runningQues = false;
var TQues;

var runningAll = false;
var TAll1;
var TAll2;

var Q;
var uploadState = false;

function saveQuestion(){

    if (document.getElementById("saveBox").value === '') {
        layer.alert("没有检查到输入，请重新输入问题",{icon: 0});
    } else {
        var xxx = document.getElementById("saveBox");
        Q = xxx.value.split("\n");
        localStorage.clear();
        Q.forEach(function(currentValue, index) {
            localStorage.setItem(index.toString(), currentValue);
        })
    }
    console.log("saveQuestion step2")
}



// $(document).ready(function(){
$("#upload").click(function(){
    if(uploadState === false){
        uploadState = true
        $("#uploadArea").css("visibility", "visible")
        console.log("hello")
    } else {
        uploadState = false
        $("#uploadArea").css("visibility", "hidden")
    }
})


$('#save').click(function() {
    layer.open({
        content: '确定保存修改吗？保存修改将会删除已经保存的问题，并用此时填写的问题替代'
        ,btn: ['确定', '取消']
        ,yes: function(index, layero){
            layer.close(index);
            saveQuestion();

        }
        ,btn2: function(index, layero){

        }
        ,cancel: function(){

        },
        time: 5000
    });

})


$("#name-button").click(function(){

    if (runningName) {
        runningName = false;
        clearInterval(TName);
        // console.log("stop  "+ runningName);
    } else {
        runningName = true;
        $.getJSON("name.json", function showName(result){
            TName = setInterval(function() {
                var now = Math.ceil(Math.random() * result[0]);
                $("#name").text(result[now]);
            }, 80);
        });
        // console.log("show  " + runningName);
    }
});


$("#question-button").click(function(){

    if(runningQues){
        runningQues = false
        clearInterval(TQues)
        // clearInterval(showQ())
    } else {
        runningQues = true;


        function showQ() {
            TQues = setInterval(function() {
                var now = Math.floor(Math.random() * localStorage.length)
                $("#question").text(localStorage[now.toString()])
            }, 80)
        }

        showQ()
    }
});




$('#all-button').click(function(){
    if(runningAll){
        runningAll = false;
        clearInterval(TAll1);
        clearInterval(TAll2);
    } else{
        runningAll = true;
        $.getJSON("name.json", function showName(result){
            TAll1 = setInterval(function () {
                var now = Math.ceil(Math.random() * result[0]);
                $("#name").text(result[now]);
            }, 60);

        });


        $.getJSON("question.json", function showQuestion(result){
            TAll2 = setInterval(function () {
                var now = Math.ceil(Math.random() * result[0]);
                $("#question").text(result[now]);
            }, 50);

        });
    }
})



// });


