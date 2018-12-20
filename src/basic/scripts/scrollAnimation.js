import setCSSVar from './../../utils/scripts/setCSSVar';

var bodyHeight = window.innerHeight;
var initScreenTitleNode = document.querySelector('.initScreen .title');
var secondScreenTitleNode = document.querySelector('.secondScreen .title');
var thirdScreenTitleNode = document.querySelector('.thirdScreen .title');
var secondScreenNode = document.querySelector('.secondScreen');

export default function() {
	var controller = new ScrollMagic.Controller();

	var start1 = initScreenTitleNode.getBoundingClientRect().top;
	var baseDistance = 200;

	new ScrollMagic.Scene({
		duration: baseDistance,
		offset: start1
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-1', e.progress);
	})
	.addTo(controller);


	var start2 = secondScreenNode.getBoundingClientRect().top - bodyHeight;

	new ScrollMagic.Scene({
		duration: bodyHeight,
		offset: start2
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-2', e.progress);
	})
	.addTo(controller);


	var start3 = secondScreenTitleNode.getBoundingClientRect().top - bodyHeight;

	new ScrollMagic.Scene({
		duration: baseDistance,
		offset: start3
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-3', e.progress);
	})
	.addTo(controller);


	var start4 = secondScreenTitleNode.getBoundingClientRect().top - 120;

	new ScrollMagic.Scene({
		duration: baseDistance,
		offset: start4
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-4', e.progress);
	})
	.addTo(controller);


	var start5 = secondScreenNode.getBoundingClientRect().bottom - bodyHeight;

	new ScrollMagic.Scene({
		duration: bodyHeight,
		offset: start5
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-5', e.progress);
	})
	.addTo(controller);


	var start6 = thirdScreenTitleNode.getBoundingClientRect().top - bodyHeight;

	new ScrollMagic.Scene({
		duration: baseDistance,
		offset: start6
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-6', e.progress);
		console.log('wrk')
	})
	.addTo(controller);
}