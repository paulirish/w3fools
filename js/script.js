/* Author: 

*/


(function($) {
	$(function() {
		var $toc = $('#toc'),
			$tocLinks = $toc.find('a'),
			$body = $(document.body),
			$window = $(window),
			cache = {};
		
		// build cache	
		$tocLinks.each(function(i,v) {
			var href =  $(this).attr('href'),
				$target = $( href );
			if ( $target.length ) {
				cache[ this.href ] = { link: $(v), target: $target }; 
			}		
		});
		
		// handle nav links
		$toc.delegate('a', 'click', function(e) {
			e.preventDefault(); // if you expected return false, *sigh*			
			if ( cache[this.href] && cache[this.href].target ) {
				$body.animate({ scrollTop: cache[this.href].target.position().top }, 600, 'swing' );
			}			
		});
		
		// auto highlight nav links depending on doc position
		var deferred = false,
			timeout = false, // so gonna clear this later, you have NO idea	
			last = false,
			past = false,	
		 	check = function() {
				var scroll = $body.scrollTop(),
					height = $body.height(),
					margin = $window.height() * ( scroll / height );
				$.each( cache, function( i, v ) {					
					if ( scroll + margin >  v.target.position().top  ) {
						last && last.removeClass('active');				
						v.link.addClass('active');						
						last = v.link;
					} else {
						v.link.removeClass('active');
						return false;
					}
					
				});
				
				clearTimeout( timeout );
				deferred = false; // we're done				
			};
		
		// work on scroll, but debounced
		$(document).scroll( function() {	
			// timeout was already created
			if ( !deferred ) {
				timeout = setTimeout( check , 250 ); // defer this stuff
				deferred = true;
			}				
					
		});
	});
	
})(jQuery);




















