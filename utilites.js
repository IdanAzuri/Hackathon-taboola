/**
 * Created by idan.a on 11/01/2017.
 */
$("p").hover(function(){
    $(this).css("background-color", "yellow");
}, function(){
    $(this).css("background-color", "pink");
});
    $(document).ready(function() {
        $("#sub1").mouseover(function() {
            $("#welcome").toggle();
        });
    });

Cookies.set('taboola_disco', 'Test123');
