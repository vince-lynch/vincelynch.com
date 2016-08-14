
console.log( "tampermonkey ready!" );


// navigate to quickmatch
quickmatch="https://www.okcupid.com/quickmatch";


pageloaded = function(url, callback){
	var navigateComplete = setInterval(function(){
		window.location.href = url;
		 if (windowLoaded == true){

		 	clearInterval(navigateComplete);
		 	callback()
		 }
	}, 1000);

	navigateComplete()
}


goback = function(){
	window.location.href == quickmatch;
}

visitLastProfile = function(url){



	pageloaded(url)
}


	likerepeat = function(){
	    if (windowLoaded == true){
	        // like their profile.
	        jQ('.cardactions-action--like').click();

	        setTimeout(function(){ 
		        	
		        var profile = jQ( ".isLiked > a").attr('href')
		        console.log("check this !!!", profile)
		        visitLastProfile(profile)
		    }, 500);
				
	    }
	}


	if(window.location.href == quickmatch){
		likerepeat()
	}
	if (window.location.search == "?cf=quickmatch"){
		pageloaded(quickmatch);
	}

	if (window.location.href == "https://www.okcupid.com/visitors"){

	console.log("visitors function called")


	collectVisitors = function(){

		setTimeout(function(){ 

			jQ(".userrow").each(function(index, elem){
				var username = jQ(".userrow-username").eq(index).html();
				jQ(".userrow img").eq(index).attr('src','http://137.74.171.202/visitor/' + username;);
			});


	    }, 500);

	}



	var scrollDownTimes = 0;

		var ScrollDown = function(){
			setTimeout(function(){ 
				window.scrollBy(0,2000)

				scrollDownTimes ++;
				if (scrollDownTimes < 5){
					ScrollDown();
				} else {
					collectVisitors()
				}
			}, 1000);
		}
		 ScrollDown()



	}
