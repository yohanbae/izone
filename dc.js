/////////////// DRAWING CIRCLE BORDER ////////////////////////
///////////////////////////////////////////////////////////////////

var dc_i = [];
var dc_play = [];

$('.dc_circle').on('mouseenter', function(){
	var theid = $(this).data('id');
	dc_i[theid] = 0;
	dc_play[theid] = true;
	hoverTimer = setTimeout(function(){ dc_loopit('c', theid) }, 1);
});

$('.dc_circle').on('mouseleave', function(){
	var theid = $(this).data('id');
	dc_play[theid] = false;
	hoverTimer = setTimeout(function(){ 
		dc_loopout('nc',theid) 
	}, 1);	
});

function dc_loopit(dir, id){
		var activeBorder = $(".active-border[data-id="+ id + "]"); 
    if (dir == "c")
        dc_i[id] = dc_i[id] + 4;
    if (dc_i[id] < 0)
        dc_i[id] = 0;
    if (dc_i[id] > 360)
        dc_i[id] = 360;
    if (dc_i[id]<=180){
        activeBorder.css('background-image','linear-gradient(' + (90 + dc_i[id]) + 'deg, transparent 50%, rgba(255,255,255,1) 50%),linear-gradient(90deg, rgba(255,255,255,1) 50%, transparent 50%)');
    }
    else{
        activeBorder.css('background-image','linear-gradient(' + (dc_i[id] - 90) + 'deg, transparent 50%, rgba(209, 16, 90, 0.2) 50%),linear-gradient(90deg, rgba(255,255,255,1) 50%, transparent 50%)');
    }

    setTimeout(function(){
    	if(dc_play[id]){
	    	dc_loopit('c', id);    		
    	}
    },1);
}

function dc_loopout(dir, id){
		var activeBorder = $(".active-border[data-id="+ id + "]"); 
		if (dir == "nc")
	    dc_i[id] = dc_i[id] - 4;
    if (dc_i[id] < 0)
        dc_i[id] = 0;
    if (dc_i[id] > 360)
        dc_i[id] = 360;
    if (dc_i[id]<=180){
        activeBorder.css('background-image','linear-gradient(' + (90 + dc_i[id]) + 'deg, transparent 50%, rgba(255,255,255,1) 50%),linear-gradient(90deg, rgba(255,255,255,1) 50%, transparent 50%)');
    }
    else{
        activeBorder.css('background-image','linear-gradient(' + (dc_i[id] - 90) + 'deg, transparent 50%, rgba(209, 16, 90, 0.2) 50%),linear-gradient(90deg, rgba(255,255,255,1) 50%, transparent 50%)');
    }
    setTimeout(function(){
    	if(!dc_play[id]){
				dc_loopout('nc', id);    		
    	}
    },1);
}
//////////////// DRAWING CIRCLE BORDER END ////////////////////////
///////////////////////////////////////////////////////////////////