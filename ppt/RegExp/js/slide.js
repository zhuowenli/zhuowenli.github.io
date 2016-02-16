$(function(){
  var $link = $("a");
  $link.map(function(i,element){
    if($(element).attr("href").match(/^#/)){
      $(element).attr("target","_self");
    }
  })
});
