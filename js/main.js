$(document).ready(function() {

	/********************ТАЙМЕР**********************************/
	function startTimer(min, sec){
		var mins = +min;
		var seconds = +sec;
		myTimer = setTimeout(function(){
			seconds--;
			if(seconds == -1){
				seconds=59;
				mins--;
				if(mins < 10){
					$(".js-minutes").text('0'+mins);
				} else 
					$(".js-minutes").text(mins);
				};
				if(seconds < 10) {
					$(".js-seconds").text('0'+seconds);
				} else {
					$(".js-seconds").text(seconds);
				};
				if(mins == 0 && seconds == 0){
					openResult();
					clearTimeout(myTimer);
					clearTimeout(myTimerEnd);
				} else{
					startTimer(mins, seconds);
				};
		}, 1000);
	};

	function startTimerEnd(minEnd, secEnd){
		var minEnd = +minEnd;
		var secEnd = +secEnd;
		myTimerEnd = setTimeout(function(){
			console.log(secEnd);
			secEnd++;
			if(secEnd == 59){
				secEnd=0;
				minEnd++;
				if(minEnd < 10){
					$(".js-rezult-min").text('0'+minEnd);
				} else 
					$(".js-rezult-min").text(minEnd);
				}
				if(secEnd < 10) {
					$(".js-rezult-sec").text('0'+secEnd);
				} else {
					$(".js-rezult-sec").text(secEnd);
				};
				startTimerEnd(minEnd, secEnd);
		}, 1000);
	};

	function openResult(){
		$('.modal-end-wrap').css('display', 'flex');
	};

	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 30,
		freeMode: true,
		navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
  });

	var krpano = null;

	

	embedpano({
		xml : "krpano.xml", 
		target : "pano",
		html5: "prefer",
		consolelog : true,
		passQueryParameters : true,
		onready : krpano_onready_callback
	});

	function krpano_onready_callback(krpano_interface){
		krpano = krpano_interface;

		krpano.set("events.myfu", myfunction);
	};

	function myfunction(val){
		var points = Number($('.js-point').text());
		var newPoints = ++points;
		$(".js-point").text(newPoints);
		krpano.call("set(hotspot[hs-"+val+"].visible, false);");
		krpano.call("set(hotspot[hs-"+val+"].min_level, 100);");
		$(".footer .swiper-slide:nth-child("+val+")").addClass('active');
		var RezultPoint = $('.js-rezult-point').text();
		$('.js-rezult-point').text(+RezultPoint + 1);
	};

	var track_mouse_enabled = false;
	var track_mouse_interval_id = null;
	
	function track_mouse_interval_callback()
	{
		var mx = krpano.get("mouse.x");
		var my = krpano.get("mouse.y");
		var pnt = krpano.screentosphere(mx,my);
		var h = pnt.x;
		var v = pnt.y;
		console.log('" ath="' + h.toFixed(2) + '" atv="' + v.toFixed(2) + '"');
	}

	$('#pano').on('click', function(){
		track_mouse_interval_callback();
	});

	$('.js-start-game').on('click', function(){
		$('.modal-rule-wrap').css('display', 'none');
		$('.start-game').text('Продолжить игру');
		var min = $('.js-minutes').text();
		var sec = $('.js-seconds').text();
		var minEnd = $('.js-rezult-min').text();
		var secEnd = $('.js-rezult-sec').text()
		startTimer(min, sec);
		startTimerEnd(minEnd, secEnd);
	});	

	$('.js-open-rule').on('click', function(){
		$('.modal-rule-wrap').css('display', 'flex');
		clearTimeout(myTimer);
		clearTimeout(myTimerEnd);
	});

	$('.js-restart-game').on('click', function(){
		$('.modal-end-wrap').css('display', 'none');
		$('.js-minutes').text('01');
		$('.js-seconds').text('00');
		$('.js-rezult-min').text('00');
		$('.js-rezult-sec').text('00');
		$('.js-rezult-point').text('0');
		startTimer($('.js-minutes').text(), $('.js-seconds').text());
		startTimerEnd($('.js-rezult-min').text(), $('.js-rezult-sec').text());
	});	

});
	
