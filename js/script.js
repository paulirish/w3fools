/* Author:
	@danheberden and the gang :)
*/
(function($) {
	$(function() {

		var $toc = $('#toc'),
			$tocLinks = $toc.find('a'),
			$body = $.browser.opera ? $( document.documentElement ) : $( document.body ),
			$window = $( window ),
			cache = {};

		// build cache
		$tocLinks.each(function(i,v) {
			var href =  $( this ).attr( 'href' ),
				$target = $( href );
			if ( $target.length ) {
				cache[ this.href ] = { link: $(v), target: $target };
			}
		});

		// handle nav links
		$toc.delegate( 'a', 'click', function(e) {
			e.preventDefault(); // if you expected return false, *sigh*
			if ( cache[ this.href ] && cache[ this.href ].target ) {
				$body.animate( { scrollTop: cache[ this.href ].target.position().top }, 600, 'swing' );
			}
		});

		// auto highlight nav links depending on doc position
		var deferred = false,
			timeout = false, // so gonna clear this later, you have NO idea
			last = false, // makes sure the previous link gets un-activated
			check = function() {
				var scroll = $body.scrollTop(),
					height = $body.height(),
					tolerance = $window.height() * ( scroll / height );

				$.each( cache, function( i, v ) {
					// if we're past the link's section, activate it
					if ( scroll + tolerance >  v.target.position().top  ) {
						last && last.removeClass('active');
						last = v.link.addClass('active');
					} else {
						v.link.removeClass('active');
						return false; // get outta this $.each
					}
				});

				// all done
				clearTimeout( timeout );
				deferred = false;
			};

		// work on scroll, but debounced
		var $document = $(document).scroll( function() {
			// timeout hasn't been created yet
			if ( !deferred ) {
				timeout = setTimeout( check , 250 ); // defer this stuff
				deferred = true;
			}
		});

		// fix any possible failed scroll events and fix the nav automatically
		(function() {
			$document.scroll();
			setTimeout( arguments.callee, 1500 );
		})();

	});
})(jQuery);