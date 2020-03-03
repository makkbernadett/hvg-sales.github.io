$(document).ready(function(){

	$(window).load(function(){
		
		var queue = new createjs.LoadQueue();
		var firstPlay = true;
		
		/*
		var snowType = 0,
			windowW = $(window).innerWidth(),
			snowMaxLeft = windowW-200;

		$('.snowflake').each(function(){
			TweenMax.to($(this), 3, {opacity:1});
			TweenMax.from($(this), 30, {top:"-=250"});
			var swing = $(this).data('swing');
			TweenMax.to($(this), 2, {x:swing, repeat:-1, yoyo:true,ease: Power1.easeInOut});
		});
		*/

		// Logo Fade In
		TweenMax.to($('.logo'), 1, {opacity:1});

		// Tagline Fade In
		TweenMax.to($('#intro-text-01'), 1, {opacity:1,delay:4});
		
		
		// Tagline Phase Two

		TweenMax.to($('#intro-text-02'), 1, {opacity:1,delay:7});
		TweenMax.to($('.snowflake .work'), 1, {opacity:0,delay:8});
		TweenMax.to($('.snowflake .sing'), 1, {opacity:1,delay:8});

		TweenMax.to($('#preloader-container'), 1, {opacity:1,delay:10, onComplete: startPreload});

		// Preload Assets
		function startPreload(){
			
			queue.installPlugin(createjs.Sound);

			queue.on("complete", handleComplete, this);
			queue.on("progress", function(e){
			   
			    var amountLoaded = parseFloat(e.loaded).toFixed(2);
			    console.log(amountLoaded);
			    $('.preloader .loaded').width((100*amountLoaded)+"%");

			});

			queue.loadManifest([
			  
			   {id:"blaski_j", src:"audio/blaski_j.mp3"},
			   {id:"budahazy_a", src:"audio/budahazy_a.mp3"},
			   {id:"jakus_i", src:"audio/jakus_i.mp3"},
			   {id:"kekesi_zs", src:"audio/kekesi_zs.mp3"},
			   {id:"kiraly_l", src:"audio/kiraly_l.mp3"},
			   {id:"klinghammer", src:"audio/klinghammer.mp3"},
			   {id:"miklosi_z", src:"audio/miklosi_z.mp3"},
			   {id:"nagy_i", src:"audio/nagy_i.mp3"},
			   {id:"neizer_a", src:"audio/neizer_a.mp3"},
			   {id:"szauer_p", src:"audio/szauer_p.mp3"},
			   {id:"tinnyei_i", src:"audio/tinnyei_i.mp3"},
			   {id:"tobias_a", src:"audio/tobias_a.mp3"},
			   {id:"toth_p", src:"audio/toth_p.mp3"},
			   {id:"kohoges", src:"audio/misc_kohoges_all.mp3"},
			   {id:"csiling", src:"audio/misc_csiling.mp3"},
			   {id:"werk", src:"audio/misc_vicces.mp3"}
			]);

			function handleComplete() {
				
				/*
				==================
				ANIMATIONS
				------------------
				*/

				// Set new positions
				TweenMax.to($('.intro-text'), 1.5, {opacity:0,top:'-=500px',delay:2.2,ease: Power2.easeInOut});
				TweenMax.to($('#preloader-container'), 1.5, {opacity:0,top:'-=500px',delay:2.4,ease: Power2.easeInOut});
				TweenMax.to($('.logo'), 1.5, {top:'5%',width:'60px',delay:2,ease: Power2.easeInOut});
				TweenMax.to($('.kiskaracsony'), 1.5, {opacity:1,delay:4,ease: Power2.easeInOut});
				
				TweenMax.to($('#snowflake-01'), 1.5, {top:'5%',width:'150px',height:'150px',delay:2,ease: Power2.easeInOut});
				TweenMax.to($('#snowflake-02'), 1.5, {top:'20%',width:'150px',height:'150px',delay:2,ease: Power2.easeInOut});
				TweenMax.to($('#snowflake-03'), 1.5, {top:'30%',width:'150px',height:'150px',delay:2,ease: Power2.easeInOut});
				TweenMax.to($('#snowflake-04'), 1.5, {top:'5%',width:'60px',height:'60px',delay:2,ease: Power2.easeInOut});
				TweenMax.to($('#snowflake-05'), 1.5, {top:'30%',width:'60px',height:'60px',delay:2,ease: Power2.easeInOut});
				TweenMax.to($('#snowflake-06'), 1.5, {top:'10%',width:'60px',height:'60px',delay:2,ease: Power2.easeInOut});

				TweenMax.to($('#wall-back'), 1, {bottom:0,delay:3,ease: Power2.easeInOut});
				TweenMax.to($('#wall-front'), 1, {bottom:0,delay:3,ease: Power2.easeInOut});

				TweenMax.to($('.actor'), 1, {top:'-273px',delay:4,ease: Power1.easeInOut, onComplete:showActorNames});

				function showActorNames(){
					// Kohoges
					createjs.Sound.play("kohoges", {loop:-1});

					$('.actor').css('z-index',999);
					TweenMax.to($('.name'), 1, {opacity:1, ease: Power2.easeInOut});
				};

				TweenMax.to($('#choir-control'), 1, {bottom:0,delay:4,ease: Power2.easeInOut});

				
				
			} // handleComplete

		}// Startpreload
		
		var snd_csiling,
			snd_budahazy_a,
			snd_blaski_j,
			snd_jakus_i,
			snd_kekesi_zs,
			snd_kiraly_l,
			snd_klinghammer,
			snd_miklosi_z,
			snd_nagy_i,
			snd_neizer_a,
			snd_szauer_p,
			snd_tinnyei_i,
			snd_tobias_a,
			snd_toth_p,
			snd_werk;

		$('.actor').on('click',function(){
			
			if(firstPlay){
				createjs.Sound.stop();
				firstPlay=false;
				startAllSounds();
				startFaceAnimations();

				TweenMax.to($('#choir-control .todo'), 1, {opacity:0, ease: Power2.easeInOut});
				TweenMax.set($('#choir-control .buttons'), {display:'block'});
				TweenMax.to($('#choir-control .buttons'), 1, {opacity:1, delay:1, ease: Power2.easeInOut});

			}
			if(werkPlaying){
				createjs.Sound.stop();

				startAllSounds();
				werkPlaying = false;
			}
			setIndividualVolume($(this).attr('id'),$(this).data('name'));

		});
			    
		function startAllSounds(){


			snd_csiling = createjs.Sound.play("csiling", {loop:-1});
			snd_csiling.volume = 1;

			snd_budahazy_a = createjs.Sound.play("budahazy_a", {loop:-1});
			snd_budahazy_a.volume = 0;

			snd_blaski_j = createjs.Sound.play("blaski_j", {loop:-1});
			snd_blaski_j.volume = 0;

			snd_jakus_i = createjs.Sound.play("jakus_i", {loop:-1});
			snd_jakus_i.volume = 0;

			snd_kekesi_zs = createjs.Sound.play("kekesi_zs", {loop:-1});
			snd_kekesi_zs.volume = 0;

			snd_kiraly_l = createjs.Sound.play("kiraly_l", {loop:-1});
			snd_kiraly_l.volume = 0;

			snd_klinghammer = createjs.Sound.play("klinghammer", {loop:-1});
			snd_klinghammer.volume = 0;

			snd_miklosi_z = createjs.Sound.play("miklosi_z", {loop:-1});
			snd_miklosi_z.volume = 0;

			snd_nagy_i = createjs.Sound.play("nagy_i", {loop:-1});
			snd_nagy_i.volume = 0;

			snd_neizer_a = createjs.Sound.play("neizer_a", {loop:-1});
			snd_neizer_a.volume = 0;

			snd_szauer_p = createjs.Sound.play("szauer_p", {loop:-1});
			snd_szauer_p.volume = 0;

			snd_tinnyei_i = createjs.Sound.play("tinnyei_i", {loop:-1});
			snd_tinnyei_i.volume = 0;

			snd_tobias_a = createjs.Sound.play("tobias_a", {loop:-1});
			snd_tobias_a.volume = 0;

			snd_toth_p = createjs.Sound.play("toth_p", {loop:-1});
			snd_toth_p.volume = 0;

			snd_werk = createjs.Sound.play("werk", {loop:-1});
			snd_werk.volume = 0;

	    }//startAllSounds

	    $('#playall').on('click',playAll);
	    $('#playnone').on('click',playNone);
		$('#playwerk').on('click',playWerk);

		var werkPlaying = false;

	    function playAll(){

			if(werkPlaying){
				createjs.Sound.stop();
				startAllSounds();
				werkPlaying = false;
			}
			snd_budahazy_a.volume = 1;
			snd_blaski_j.volume = 1;
			snd_jakus_i.volume = 1;
			snd_kekesi_zs.volume = 1;
			snd_kiraly_l.volume = 1;
			snd_klinghammer.volume = 1;
			snd_miklosi_z.volume = 1;
			snd_nagy_i.volume = 1;
			snd_neizer_a.volume = 1;
			snd_szauer_p.volume = 1;
			snd_tinnyei_i.volume = 1;
			snd_tobias_a.volume = 1;
			snd_toth_p.volume = 1;
			snd_csiling.volume = 1;

			for(var i=1; i<14; i++){
				$("#actor-"+i+" .actor-open").css('display','block');
			}
	    }

	    function playNone(){

	    	

	    	if(werkPlaying){
	    		createjs.Sound.stop();

				startAllSounds();
				werkPlaying = false;
			}
			snd_budahazy_a.volume = 0;
			snd_blaski_j.volume = 0;
			snd_jakus_i.volume = 0;
			snd_kekesi_zs.volume = 0;
			snd_kiraly_l.volume = 0;
			snd_klinghammer.volume = 0;
			snd_miklosi_z.volume = 0;
			snd_nagy_i.volume = 0;
			snd_neizer_a.volume = 0;
			snd_szauer_p.volume = 0;
			snd_tinnyei_i.volume = 0;
			snd_tobias_a.volume = 0;
			snd_toth_p.volume = 0;
			snd_csiling.volume = 1;

			for(var i=1; i<14; i++){
				$("#actor-"+i+" .actor-open").css('display','none');
			}
	    }

	    function playWerk(){
	    	werkPlaying = true;

			snd_werk.volume = 1;
			createjs.Sound.stop();
			createjs.Sound.play("werk", {loop:-1});

			for(var i=1; i<14; i++){
				$("#actor-"+i+" .actor-open").css('display','none');
			}
	    }




	    function setIndividualVolume(id,target){
	    	if(werkPlaying){
				startAllSounds();
				werkPlaying = false;
			}
	    	var targetVar = eval('snd_' + target);
	    	if(targetVar.volume==0){
	    		targetVar.volume = 1;
	    		$("#"+id+" .actor-open").css('display','block');
	    	}else{
	    		targetVar.volume = 0;
	    		$("#"+id+" .actor-open").css('display','none');
	    	}

	    };

	    function startFaceAnimations(){
	    	var tlBig = new TimelineMax({repeat:-1, repeatDelay:2.2});

	    	var tl = new TimelineMax({repeat:7, repeatDelay:.11});
			tl.add( TweenMax.set('.actor-open', {opacity:1}) );
			tl.add( TweenMax.set('.actor-open', {opacity:0,delay:.3}) );
			tl.add( TweenMax.set('.actor-open', {opacity:1,delay:.15}) );
			tl.add( TweenMax.set('.actor-open', {opacity:0,delay:.15}) );
			tl.add( TweenMax.set('.actor-open', {opacity:1,delay:.25}) );
			tl.add( TweenMax.set('.actor-open', {opacity:0,delay:.35}) );
			tl.add( TweenMax.set('.actor-open', {opacity:1,delay:.25}) );
			tl.add( TweenMax.set('.actor-open', {opacity:0,delay:.35}) );

			tlBig.add(tl);

	    }; // Startfaceanimations

	});// window load

		

});