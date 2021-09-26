var current_member = "wonyoung";

var current_select = 6;
var degrees = {
	orb1:-330,	orb2:-300,	orb3:-270,	orb4:-240,	orb5:-210,	orb6:-180,
	orb7:-150,	orb8:-120,	orb9:-90,	orb10:-60,	orb11:-30,	orb12:0,
	pos1:30,	pos2:60,	pos3:90,	pos4:120,	pos5:150,	pos6:180,
	pos7:210,	pos8:240,	pos9:270,	pos10:300,	pos11:330,	pos12:360,
	planet1:0.15,	planet2:0.15,	planet3:0.15,	planet4:0.3,	planet5:0.6,
	planet6:1.1,	planet7:0.6,	planet8:0.3,	planet9:0.15,	planet10:0.15,
	planet11:0.15,	planet12:0.15,
};

// ALBUM UNIVERSE
var album_select = 1;
var album_degrees = {
	orb1:-160,	orb2:-280,	orb3:-40,
	pos1:200,	pos2:80,	pos3:320,
	planet1:0.15,	planet2:0.15,	planet3:0.15
};

var member_navi = true;
var album_navi = false;


// Universe Navigation SETUP
var carousel = document.querySelector('.carousel');
var scene = document.querySelector('.sun');

var galaxy = document.querySelector('#galaxy');

var pickon = false; // planet for the MEMBER
var scrollon = false;

var pickalbumon = false;

var mode1 = true; //mode for the member display screen
var lock;
// Universe Navigation SETUP END

/////////// MEMBERS PART SETUP /////
	var bigimg = false;
	var bigimglock = false;
	var thecurrent = 1;
	var thetimer = 0;//auto sldier

/////////// MEMBERS PART SETUP END /////

	// MAIN - IZONE IMG CONTROL
	var izone_hover = false;
	var izone_lock = false;
	var izone_img_total = 4;
	var izone_current = [
		{num:1},
		{num:1},
		{num:1},
		{num:1}		
	];
	var izone_data_mode = 1;



$(document).ready(function(){
	$('.planet1, .planet2, .planet3, .planet4, .planet5, .planet6, .planet7, .planet8, .planet9, .planet10, .planet11, .planet12').animate({
		'opacity':1
	},1000);


	setTimeout(function(){
		$('.theloading').animate({
			'z-index':1
		});

		$('.thelogo').animate({
			'opacity':0.7
		}, 3000);

		select_star(1);
	}, 3000);

});


////////////// MEMBERS //////////////////////
$(document).on("mouseenter", ".thebigimg", function(e) {
	bigimg = true;
	var newhtml = bigimg + " " + thecurrent;
//	alert('mouseone');
//	$('.status').html(newhtml);
});

$(document).on("mouseleave", ".thebigimg", function(e) {
	bigimg = false;
//	alert('out');
});


$(document).on("mouseenter", ".mainimg", function(e) {
	izone_hover = true;
	izone_data_mode = $(this).data('mode');
	//alert(izone_data_mode);
});
$(document).on("mouseleave", ".mainimg", function(e) {
	izone_hover = false;
});



/// PREVENT SCROLLING ON THE MEMBER SMALL IMAGE  

    $(".member-display1").delegate(".mainimg","mousewheel", function(e){
			e.preventDefault();
		});

// 		var thelock = false;
    $(".member-display2").delegate(".mainimg","mousewheel", function(e){
			e.preventDefault();
		});


// AUTO SLIDE FOR THE LEFT SIDE BIG IMG
automain = setInterval(function(){
	thetimer += 1;
	if(thetimer >= 10){
		var thetotal = $('.thebigimg').data('num'); // BIG IMG TOTAL NUMB
		//var current_member = $('.thebigimg').data('member'); // BIG IMG CURRENT

		thecurrent = thecurrent + 1;
	  if(thecurrent > thetotal) { thecurrent = 1;}

	  var thedata = window[current_member + "_data"];
		changebig(thedata, '.'+current_member+'-big', thecurrent);		
		thetimer = 0;
	}
}, 1000);

function hey(){
	alert('ho');
}


$(document).keypress(function(event){
	
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		logo_work();
	}
	
});




$(window).on('wheel', function(e) {
  var delta = e.originalEvent.deltaY;

  // SCROLL FOR THE MEMBERS PLANET
  if (pickon && delta > 0 && !lock){ // going down}
  	var num = current_select + 1;	  
  	if(num > 12) { num = num - 12;}
	  select_star(num);
  	$('.showcurrent').html('Current Page: ' + num);
		    	 	
  	lock = true;
		interval = setTimeout(function(){
			lock = false;
		}, 500);
  }
  if(pickon && delta < 0 && !lock){ // going up
  	var num = current_select - 1;	  
  	if(num <= 0) { num = num + 12;}  	
  	$('.showcurrent').html('Current Page: ' + num);
  	console.log(num);

		select_star(num);
  	lock = true;

		interval = setTimeout(function(){
			lock = false;
		}, 500);
  }  	

  // SCROLL FOR THE ALBUM PLANET
  if (pickalbumon && delta > 0 && !lock){ // going down}
  	var num = album_select + 1;	  
  	if(num > 3) { num = num - 3;}
	  select_album(num);
  	$('.showcurrent').html('Current Page: ' + num);
		    	 	
  	lock = true;
		interval = setTimeout(function(){
			lock = false;
		}, 500);
  }
  if(pickalbumon && delta < 0 && !lock){ // going up
  	var num = album_select - 1;	  
  	if(num <= 0) { num = num + 3;}  	
  	$('.showcurrent').html('Current Page: ' + num);
  	console.log(num);

		select_album(num);
  	lock = true;

		interval = setTimeout(function(){
			lock = false;
		}, 500);
  }  	


  // MEMBERS :: LEFT BIG IMAGE PART

  if (bigimg && delta > 0 && !bigimglock){ // going down}
		thetimer = 0;
		var thetotal = $('.thebigimg').data('num'); // BIG IMG TOTAL NUMB
		//var current_member = $('.thebigimg').data('member'); // BIG IMG CURRENT

  	thecurrent = thecurrent + 1;
  	if(thecurrent > thetotal) { thecurrent = 1;}

  	var memberdata = window[current_member + "_data"];
		changebig(memberdata, '.'+current_member+'-big', thecurrent);
  	bigimglock = true;

		interval = setTimeout(function(){
			bigimglock = false;
		}, 1000);
  }
  if(bigimg && delta < 0 && !bigimglock){ // going up
  	thetimer = 0;
		var thetotal = $('.thebigimg').data('num'); // BIG IMG TOTAL NUMB
		//var current_member = $('.thebigimg').data('member'); // BIG IMG CURRENT

  	thecurrent = thecurrent - 1;
  	if(thecurrent < 1) { thecurrent = thetotal;}
//	  select_star(num);
  	var memberdata = window[current_member + "_data"];
		changebig(memberdata, '.' +current_member+ '-big', thecurrent);		    	 	
  	bigimglock = true;
		interval = setTimeout(function(){
			bigimglock = false;
		}, 1000);
  }
	///////////////////////////////////////// LEFT SIDE BIG IMAGE END


	// RIGHT SIDE SMALL IMAGES
  if (izone_hover && delta > 0 && !izone_lock){ // going down}

		izone_current[izone_data_mode].num = izone_current[izone_data_mode].num + 1;
   	if(izone_current[izone_data_mode].num > izone_img_total) { izone_current[izone_data_mode].num = 1;}

  	console.log(izone_current[izone_data_mode].num);  // ??

		changecon1(izone_data_mode, current_member , izone_current[izone_data_mode].num);
		move_chosen(izone_data_mode, current_member , izone_current[izone_data_mode].num);

  	izone_lock = true;

		interval = setTimeout(function(){
			izone_lock = false;
		}, 1000);

  }
  if(izone_hover && delta < 0 && !izone_lock){ // going up
		izone_current[izone_data_mode].num = izone_current[izone_data_mode].num - 1;
   	if(izone_current[izone_data_mode].num < 1) { izone_current[izone_data_mode].num = izone_img_total;}


		changecon1(izone_data_mode, current_member, izone_current[izone_data_mode].num);
		move_chosen(izone_data_mode, current_member , izone_current[izone_data_mode].num);
   	
  	izone_lock = true;
		interval = setTimeout(function(){
			izone_lock = false;
		}, 1000);
  }
	///////////////////////////////////////// Right SIDE IZONE IMAGE END

}); // MOUSE WHIEEL COntrol End



$( document ).on( "mousemove", function(event) {
});

// just keep the rotataX values HERE(JS SIDE), and keep track the value
function move_1(){ // MAKE CIRCLE
}

function move_2(){ // MAKE CIRCLE
}

function resetSmallData(){
	izone_current[1].num = 1;
	izone_current[2].num = 1;	
	izone_current[3].num = 1;
}


function select_star(num){
	var thegap = current_select - num; // get the gap;
	var gapvalue = thegap * 30;

	for(var i = 1; i<13; i++){
		var newvalue = degrees['orb' + i] + gapvalue;
		var newvalue2 = degrees['pos' + i] + gapvalue;

		degrees['orb'+i] = newvalue;
		degrees['pos'+i] = newvalue2;

		var ho = newvalue + 'deg';
		var ko = newvalue2 + 'deg';
		document.querySelector('.orbit'+i).style.transform = `rotateZ(${ho})`;
		document.querySelector('.pos'+i).style.transform = `rotateX(-90deg) rotateY(${ko}) rotateZ(0deg)`;
		document.querySelector('.planet'+i).style.transform = `scale(.15)`;

	} // END FOR

	var first = get_beside(num - 2);
	var second = get_beside(num - 1);
	var forth = get_beside(num + 1);
	var fifth = get_beside(num + 2);

	document.querySelector('.planet'+first).style.transform = 'scale(0.4)';
	document.querySelector('.planet'+second).style.transform = 'scale(0.8)';
	document.querySelector('.planet'+num).style.transform = 'scale(1.5)';
	document.querySelector('.planet'+forth).style.transform = 'scale(0.8)';
	document.querySelector('.planet'+fifth).style.transform = 'scale(0.4)';
// calculate 5 plannet scale

	current_select = num;
	member_display(num);
} // ## select_star END;

function get_beside(num){
	var numm = num;
	if(num > 12){
		numm = num - 12;
	}
	if(num <= 0){
		numm = num + 12;
	}
	return numm;
}

function get_beside_album(num){
	var numm = num;
	if(num >3){
		numm = 1;
	}
	if(num <= 0){
		numm = 3;
	}
	return numm;
}

function select_album(num){
	var thegap = album_select - num; // get the gap;
	var gapvalue = thegap * 240;

	for(var i = 1; i<4; i++){
		var newvalue = album_degrees['orb' + i] + gapvalue;
		var newvalue2 = album_degrees['pos' + i] + gapvalue;

		album_degrees['orb'+i] = newvalue;
		album_degrees['pos'+i] = newvalue2;

		var ho = newvalue + 'deg';
		var ko = newvalue2 + 'deg';
		document.querySelector('.album-orbit'+i).style.transform = `rotateZ(${ho})`;
		document.querySelector('.album-pos'+i).style.transform = `rotateX(-90deg) rotateY(${ko}) rotateZ(0deg)`;
		document.querySelector('.album-planet'+i).style.transform = `scale(.50)`;

	} // END FOR

	var first = get_beside_album(num - 1);
	var second = get_beside_album(num + 1);

	document.querySelector('.album-planet'+num).style.transform = 'scale(1.4)';
	document.querySelector('.album-planet'+first).style.transform = 'scale(0.9)';

	document.querySelector('.album-planet'+second).style.transform = 'scale(0.5)';// calculate 5 plannet scale

	album_select = num;
	album_display(num);
} // ## select_ALBUM END;



var prevButton = document.querySelector('.previous-button');
prevButton.addEventListener( 'click', function() {
//  rotateCarousel();
	move_1();
});

var nextButton = document.querySelector('.next-button');
nextButton.addEventListener( 'click', function() {
	move_2();
});

$('.test').click(function(){
	var num = $(this).data('num');
	select_star(num);
});

$('.plan').click(function(){
	var num = $(this).data('num');
	select_star(num);
});

$('.plan').mouseenter(function(){
	var num = $(this).data('num');
	if(num == current_select){
		$('.btn').html("THISONE");
		pickon = true;
	}
});
$('.plan').mouseleave(function(){
		console.log(current_select);
		$('.btn').html("");
		pickon = false;
});

$('.album-plan').click(function(){
	var num = $(this).data('num');
	select_album(num);
});

$('.album-plan').mouseenter(function(){
	var num = $(this).data('num');
	if(num == album_select){
		$('.btn').html("THISONE");
		pickalbumon = true;
	}
});
$('.album-plan').mouseleave(function(){
		console.log(album_select);
		$('.btn').html("");
		pickalbumon = false;
});


$('#universe').mouseenter(function(){
	scrollon = true;
	$('.btn').html("ENTERED");
});
$('#universe').mouseleave(function(){
	scrollon = false;	
	$('.btn').html("LEFT");
});

var hams = false;
$('.thelogo').click(function(){
	logo_work();
});

function logo_work(){
	if(hams){
		$('.theham').toggleClass('hamopen');
		$('.nav-wrap').toggleClass('menuon');
		$('#galaxy').toggleClass('galaxy-on');
		$('.img-wrap').toggleClass('imgopen');
		$('.left-member').toggleClass('backback-on').delay(800).queue(function(){
			$('.backmenu').toggleClass('menuon-back');
			$(this).dequeue();
		});

		hams = false;
	}else{
		$('.backmenu').toggleClass('menuon-back').delay(800).queue(function(){
			$('.theham').toggleClass('hamopen');
			$('.nav-wrap').toggleClass('menuon');
			$('.img-wrap').toggleClass('imgopen');
			$('#galaxy').toggleClass('galaxy-on');
			$('.left-member').toggleClass('backback-on');
			$(this).dequeue();
		});
		hams = true;
	}

}

$('.theimgs-album').click(function(){
	var num = $(this).data('num');
	album_link(num);
});


$('.theimgs').click(function(){
	var num = $(this).data('num');
	mem_link(num);
});


function mem_link(num){
	if(member_navi){
		//
	}else{
	  member_navi_switch();
		album_navi_switch();		
	}

	if(hams){
		$('.theham').toggleClass('hamopen');
		$('.nav-wrap').toggleClass('menuon');
		$('#galaxy').toggleClass('galaxy-on');
		$('.img-wrap').toggleClass('imgopen');
		$('.left-member').toggleClass('backback-on').delay(800).queue(function(){
			$('.backmenu').toggleClass('menuon-back');
			$(this).dequeue();
		});

		hams = false;
	}else{
		$('.backmenu').toggleClass('menuon-back').delay(800).queue(function(){
			$('.theham').toggleClass('hamopen');
			$('.nav-wrap').toggleClass('menuon');
			$('.img-wrap').toggleClass('imgopen');
			$('#galaxy').toggleClass('galaxy-on');
			$('.left-member').toggleClass('backback-on');
			$(this).dequeue();
		});
		hams = true;
	}
//	var num = num;

	select_star(num);
}


function member_display(num){
	if(mode1){
		$('.member-display1').removeClass('mode-opacity').delay(1000).queue(function(){
			$(this).removeClass('mode-block');			
			$(this).dequeue();
		});
		$('.member-display2').addClass('mode-block').delay(1000).queue(function(){
			$('.members-wrap2').html(member_code[num].code);
			$(this).addClass('mode-opacity');			
			$(this).dequeue();
		});
		mode1 = false;
	}else{
		$('.member-display2').removeClass('mode-opacity').delay(1000).queue(function(){
			$(this).removeClass('mode-block');
			$(this).dequeue();
		});
		$('.member-display1').addClass('mode-block').delay(1000).queue(function(){
			$('.members-wrap1').html(member_code[num].code);
			$(this).addClass('mode-opacity');			
			$(this).dequeue();
		});
		mode1 = true;
	}
	$('.members-wrap2').scrollTop(0);
	$('.members-wrap1').scrollTop(0);

	current_member = member_code[num].name;
	resetSmallData();
}

function album_display(num){
	if(mode1){
		$('.member-display1').removeClass('mode-opacity').delay(1000).queue(function(){
			$(this).removeClass('mode-block');			
			$(this).dequeue();
		});
		$('.member-display2').addClass('mode-block').delay(1000).queue(function(){
			$('.members-wrap2').html(album_code[num].code);
			$(this).addClass('mode-opacity');			
			$(this).dequeue();
		});
		mode1 = false;
	}else{
		$('.member-display2').removeClass('mode-opacity').delay(1000).queue(function(){
			$(this).removeClass('mode-block');
			$(this).dequeue();
		});
		$('.member-display1').addClass('mode-block').delay(1000).queue(function(){
			$('.members-wrap1').html(album_code[num].code);
			$(this).addClass('mode-opacity');			
			$(this).dequeue();
		});
		mode1 = true;
	}
	$('.members-wrap2').scrollTop(0);
	$('.members-wrap1').scrollTop(0);	

	current_member = album_code[num].name;
	resetSmallData();

}




function changebig(thedata, thediv, current){
	$('.thebigimg').animate({'opacity':0}).delay(500).queue(function(){
		$(thediv).css({
			'background-image': `url(${thedata[current].file})`,
			'background-position': `${thedata[current].position}`			
		});
		$(this).animate({'opacity':1});			
		$(this).dequeue();
	});
}

function changecon1(data_code, member, current){
	var izone_small_data = window[member + "_data_" + data_code];
	var thediv = "." + member + data_code;
	$('.mainimg').animate({'opacity':0}).delay(500).queue(function(){
		$(thediv).css({
			'background-image': `url(${izone_small_data[current].file})`,
			'background-position': `${izone_small_data[current].position}`			
		});
		$(this).animate({'opacity':1});			
		$(this).dequeue();
	});
}

function move_chosen(section, member, current){
	var thepx = [	0,105, 75, 41, 7 ];
	var stage = '.chosen-' + section;
	$(stage).animate({
		right: thepx[current] + "px"
	}, 1000, "swing");
}





//////////// NAVIGATION CONTROLLLER


function album_link(num){
	if(album_navi){
		//
	}else{
	  member_navi_switch();
		album_navi_switch();		
	}

	if(hams){
		$('.theham').toggleClass('hamopen');
		$('.nav-wrap').toggleClass('menuon');
		$('#galaxy').toggleClass('galaxy-on');
		$('.img-wrap').toggleClass('imgopen');
		$('.left-member').toggleClass('backback-on').delay(800).queue(function(){
			$('.backmenu').toggleClass('menuon-back');
			$(this).dequeue();
		});

		hams = false;
	}else{
		$('.backmenu').toggleClass('menuon-back').delay(800).queue(function(){
			$('.theham').toggleClass('hamopen');
			$('.nav-wrap').toggleClass('menuon');
			$('.img-wrap').toggleClass('imgopen');
			$('#galaxy').toggleClass('galaxy-on');
			$('.left-member').toggleClass('backback-on');
			$(this).dequeue();
		});
		hams = true;
	}

	//var num = $(this).data('num');
	select_album(num);
}


function album_navi_switch(){
	if(album_navi){
		var tempnum = get_beside_album(album_select + 2);
		select_album_only(tempnum);
		$('#galaxy2').animate({
			'bottom':'-300px'
			});		
		album_navi = false;
	}else{
		var tempnum = get_beside_album(album_select - 2);
		select_album_only(tempnum);
		$('#galaxy2').animate({
			'bottom':'-50px'
		});				
		album_navi = true;
	}	
}
function member_navi_switch(){
	if(member_navi){
		var tempnum = get_beside(current_select + 5);
		select_star_only(tempnum);
		$('#galaxy').animate({
			'bottom':'-500px'
			});		
		member_navi = false;
	}else{
		var tempnum = get_beside(current_select - 5);
		select_star_only(tempnum);
		$('#galaxy').animate({
			'bottom':'0'
		});				
		member_navi = true;
	}		
}


function select_star_only(num){
	var thegap = current_select - num; // get the gap;
	var gapvalue = thegap * 30;

	for(var i = 1; i<13; i++){
		var newvalue = degrees['orb' + i] + gapvalue;
		var newvalue2 = degrees['pos' + i] + gapvalue;

		degrees['orb'+i] = newvalue;
		degrees['pos'+i] = newvalue2;

		var ho = newvalue + 'deg';
		var ko = newvalue2 + 'deg';
		document.querySelector('.orbit'+i).style.transform = `rotateZ(${ho})`;
		document.querySelector('.pos'+i).style.transform = `rotateX(-90deg) rotateY(${ko}) rotateZ(0deg)`;
		document.querySelector('.planet'+i).style.transform = `scale(.15)`;

	} // END FOR

	var first = get_beside(num - 2);
	var second = get_beside(num - 1);
	var forth = get_beside(num + 1);
	var fifth = get_beside(num + 2);

	document.querySelector('.planet'+first).style.transform = 'scale(0.4)';
	document.querySelector('.planet'+second).style.transform = 'scale(0.8)';
	document.querySelector('.planet'+num).style.transform = 'scale(1.5)';
	document.querySelector('.planet'+forth).style.transform = 'scale(0.8)';
	document.querySelector('.planet'+fifth).style.transform = 'scale(0.4)';
// calculate 5 plannet scale
	current_select = num;
} // ## select_star_only END;

function select_album_only(num){
	var thegap = album_select - num; // get the gap;
	var gapvalue = thegap * 240;

	for(var i = 1; i<4; i++){
		var newvalue = album_degrees['orb' + i] + gapvalue;
		var newvalue2 = album_degrees['pos' + i] + gapvalue;

		album_degrees['orb'+i] = newvalue;
		album_degrees['pos'+i] = newvalue2;

		var ho = newvalue + 'deg';
		var ko = newvalue2 + 'deg';
		document.querySelector('.album-orbit'+i).style.transform = `rotateZ(${ho})`;
		document.querySelector('.album-pos'+i).style.transform = `rotateX(-90deg) rotateY(${ko}) rotateZ(0deg)`;
		document.querySelector('.album-planet'+i).style.transform = `scale(.50)`;

	} // END FOR

	var first = get_beside_album(num - 1);
	var second = get_beside_album(num + 1);

	document.querySelector('.album-planet'+num).style.transform = 'scale(1.4)';
	document.querySelector('.album-planet'+first).style.transform = 'scale(0.9)';
	document.querySelector('.album-planet'+second).style.transform = 'scale(0.5)';// calculate 5 plannet scale

	album_select = num;
} // ## select_ALBUM END;

/////////// NAVIGATION CONTROLLER END