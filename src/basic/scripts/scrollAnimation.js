import setCSSVar from './../../utils/scripts/setCSSVar';

var bodyHeight = window.innerHeight;

export default function() {
	var controller = new ScrollMagic.Controller();
	
	var distance0 = bodyHeight * 1.4;

	new ScrollMagic.Scene({
			duration: distance0,
			offset: 0
		})
		.on("progress", function (e) {
			setCSSVar(document.body, 'progress-one', e.progress);
		})
		.addTo(controller);

	new ScrollMagic.Scene({
		duration: 150,
		offset: bodyHeight * 0.6
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-two', e.progress);
	})
	.addTo(controller);


	var start2NodeData = document.querySelector('.secondScreen .content').getBoundingClientRect();
	var startPos2 = start2NodeData.height * 1.5;

	var distance = bodyHeight * 1.2;

	new ScrollMagic.Scene({
			duration: distance,
			offset: startPos2 - 50
		})
		.on("progress", function (e) {
			if(e.progress >= 1) {
				setCSSVar(document.body, 'progress', 1);
				return;
			}

			setCSSVar(document.body, 'progress', e.progress);
		})
		.addTo(controller);


	var startPos3 = document.querySelector('.thirdScreen .title').getBoundingClientRect().top - bodyHeight;

	new ScrollMagic.Scene({
		duration: 150,
		offset: startPos3
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-three', e.progress);
	})
	.addTo(controller);


	var startPos4 = document.querySelector('.thirdScreen .methodology').getBoundingClientRect().top - bodyHeight + 200;

	new ScrollMagic.Scene({
		duration: 150,
		offset: startPos4
	})
	.on("progress", function (e) {
		setCSSVar(document.body, 'progress-four', e.progress);

		console.log('hui 4')
	})
	.addTo(controller);
}