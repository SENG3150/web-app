describe('unsafe filter', function() {

	var $filter;
	var $sanitize;
	var unsafe;

	beforeEach(angular.mock.module('joy-global'));

	beforeEach(inject(function(_$filter_, _$sanitize_) {
		$filter = _$filter_;
		$sanitize = _$sanitize_;
		unsafe = _$filter_('unsafe');
	}));

	it('should sanitise untrusted html', function() {
		expect($sanitize(unsafe('<span onmouseover"alert(1)">unsafe</span>')).toString()).toEqual('<span>unsafe</span>');
	});

	it('should not sanitise trusted html', function() {
		expect($sanitize(unsafe('<i>safe</i>')).toString()).toEqual('<i>safe</i>');
	});
});