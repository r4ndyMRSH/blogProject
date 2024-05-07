let s;
$("#clearBtn").on('click', ()=>{
    s = $("#postText").val();
    $("#postText").val('');
    console.log(s);
});