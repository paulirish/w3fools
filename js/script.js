/* Author:
	@danheberden and the gang :)
*/
(function($) {
	$(function() {
		var contributors = $('#contributors');
		contributors.find('h2').click(function(){
			contributors.find('a').sort(function(){ return 0.5 - Math.random(); }).each(function(){ $(this).appendTo(contributors) });
		});
	});
})(jQuery);
