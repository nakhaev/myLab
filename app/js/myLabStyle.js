(function() {
	$('a[href="#all"]').click(function (e) {
		  e.preventDefault();
		  $('.tab-pane').addClass('active');
		})
})();