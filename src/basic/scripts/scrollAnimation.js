import setCSSVar from './../../utils/scripts/setCSSVar';

export default function() {
	var controller = new ScrollMagic.Controller();
	
	var distance = window.innerHeight * 2;

	new ScrollMagic.Scene({
			duration: distance,
			offset: window.innerHeight * 0.2
		})
		.on("progress", function (e) {
			setCSSVar(document.body, 'progress-one', e.progress);
		})
		.addTo(controller);

	var start2NodeData = document.querySelector('.secondScreen .content').getBoundingClientRect();
	var startPos2 = start2NodeData.height;

	var distance = window.innerHeight * 1.5;

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
}