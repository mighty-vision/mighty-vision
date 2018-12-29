import setCSSVar from './../../utils/scripts/setCSSVar';

var initScreenDescriptionNode = document.querySelector('.initScreen .description');

var bodyHeight = window.innerHeight;

export default function scrollAniationDesktop() {
	var controller = new ScrollMagic.Controller();

	new ScrollMagic.Scene({
		duration: bodyHeight / 2,
		offset: 0
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-1', e.progress);
	})
	.addTo(controller);

	new ScrollMagic.Scene({
		duration: bodyHeight * 1.5,
		offset: 0
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-2', e.progress);
	})
	.addTo(controller);
}