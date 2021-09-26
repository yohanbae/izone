var eventon = false;
var galaxyenter = false;
var hamenter = false;
$(document).on('mouseenter', '.plan', function(){
	galaxyenter = true;
	eventon = true;	
	var thelabel = $(this).data('name');
	var thenum = $(this).data('num');
	if(current_select == thenum){
		thelabel = "SCROLL";
	}
	focusname(thelabel);
	onfocus();
});

$(document).on('mouseleave', '.plan', function(){
	galaxyenter = false;
	eventon = false;
	onfocusout();	
});


$(document).on('mouseenter', '.album-plan', function(){
	galaxyenter = true;
	eventon = true;	
	var thelabel = $(this).data('name');
	var thenum = $(this).data('num');
	if(album_select == thenum){
		thelabel = "SCROLL";
	}
	focusname(thelabel);
	onfocus();
});

$(document).on('mouseleave', '.album-plan', function(){
	galaxyenter = false;
	eventon = false;
	onfocusout();	
});



$(document).on('mouseenter', '.thelogo', function(){
	eventon = true;
//	hamenter = true;
	if(hams){
		focusname('CLOSE');
	}else{
		focusname('MENU');
	}
	onfocus();
});
$(document).on('mouseleave', '.thelogo', function(){
	eventon = true;
	hamenter = false;
	onfocusout();
});


$( document ).on( "mousemove", function(event) {
  $( ".option1" ).text( "pageX: " + event.pageX + ", pageY: " + event.pageY );

  if(eventon){
	  $('.mycursor').css({
	  	'top':event.pageY ,
	  	'left':event.pageX
	  });  	
  }else{
	  $('.mycursor').css({
	  	'top':event.pageY - 20 ,
	  	'left':event.pageX - 20
	  });  	
  }

  if(eventon && galaxyenter){
	  $('.mycursor').css({
	  	'top':event.pageY - 70 ,
	  	'left':event.pageX - 70
	  });  	  	
  }

  if(eventon && hamenter){
	  $('.mycursor').css({
	  	'top':event.pageY - 20 ,
	  	'left':event.pageX - 70
	  });  	  	  	
  }

});
function onfocus(){
//	$('.mycursor').toggleClass('onspd');
	$('.mycursor').removeClass('onout').addClass('onlock');
	$('.cursor-inside').css({
		'background-color':'#B5B8FA'
	});	
	$('.theborder').animate({'opacity':1}, 300);
}
function onfocusout(){
	$('.cursor-desc').text('');
	$('.mycursor').removeClass('onlock').addClass('onout');
	$('.cursor-inside').css({
		'background-color':'white'
	});
	$('.theborder').animate({'opacity':0}, 300);
}
function focusname(name){
	$('.cursor-desc').text(name);	
}

$(document).on("mouseenter", ".theclick", function(e) {
	eventon = true;
	focusname('CLICK');
	onfocus();
});
$(document).on("mouseleave", ".theclick", function(e) {
	eventon = false;	
	onfocusout();
});
$(document).on("mouseenter", ".thename", function(e) {
	eventon = true;
	var thename = $(this).data('name');
	focusname(thename);
	onfocus();
});
$(document).on("mouseleave", ".thename", function(e) {
	eventon = false;	
	onfocusout();
});

$(document).on("mouseenter", ".thescroll", function(e) {
	eventon = true;	
	focusname('SCROLL');
	onfocus();
});
$(document).on("mouseleave", ".thescroll", function(e) {
	eventon = false;	
	onfocusout();
});
