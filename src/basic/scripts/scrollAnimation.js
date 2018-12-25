import setCSSVar from './../../utils/scripts/setCSSVar';

var initScreenDescriptionNode = document.querySelector('.initScreen .description');
var secondScreenTitleNode = document.querySelector('.secondScreen .title');
var secondScreenDescriptionNode = document.querySelector('.secondScreen .description');
var secondScreenNode = document.querySelector('.secondScreen');
var thirdScreenTitleNode = document.querySelector('.thirdScreen .title');
var thirdScreenDescriptionNode = document.querySelector('.thirdScreen .description');

var bodyHeight = window.innerHeight;

export default function scrollAniation() {
	if(document.body.dataset.browser == 'safari') {
		bodyHeight += 69; // Height without top & bottom bars for iOS
	} else {
		bodyHeight += 50;
	}

	var controller = new ScrollMagic.Controller();

	var start1 = initScreenDescriptionNode.getBoundingClientRect().top;

	new ScrollMagic.Scene({
		duration: initScreenDescriptionNode.getBoundingClientRect().height,
		offset: start1
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-1', e.progress);
	})
	.addTo(controller);

	document.addEventListener('click', () => {
		alert(window.innerHeight)
	});


	var start2 = secondScreenNode.getBoundingClientRect().top - bodyHeight - 100;

	new ScrollMagic.Scene({
		duration: bodyHeight + 100,
		offset: start2
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-2', e.progress);
	})
	.addTo(controller);


	var start3 = secondScreenTitleNode.getBoundingClientRect().top - bodyHeight;

	new ScrollMagic.Scene({
		duration: 70,
		offset: start3
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-3', e.progress);
		console.log('wrk')
	})
	.addTo(controller);


	var start4 = secondScreenDescriptionNode.getBoundingClientRect().top + 
							 secondScreenDescriptionNode.getBoundingClientRect().height / 2;

	new ScrollMagic.Scene({
		duration: secondScreenDescriptionNode.getBoundingClientRect().height / 2,
		offset: start4
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-4', e.progress);
	})
	.addTo(controller);


	var start5 = secondScreenNode.getBoundingClientRect().bottom - bodyHeight;

	new ScrollMagic.Scene({
		duration: bodyHeight + 200,
		offset: start5
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-5', e.progress);
	})
	.addTo(controller);


	var start6 = thirdScreenTitleNode.getBoundingClientRect().top - bodyHeight;

	new ScrollMagic.Scene({
		duration: 70,
		offset: start6
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-6', e.progress);
	})
	.addTo(controller);

	var start7 = thirdScreenDescriptionNode.getBoundingClientRect().top;

	new ScrollMagic.Scene({
		duration: thirdScreenDescriptionNode.getBoundingClientRect().height,
		offset: start7
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-7', e.progress);
	})
	.addTo(controller);
}