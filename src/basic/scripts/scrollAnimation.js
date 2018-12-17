import setCSSVar from './../../utils/scripts/setCSSVar';

export default function() {
  var controller = new ScrollMagic.Controller();

	var startNodeData = document.querySelector('.secondScreen .content').getBoundingClientRect();
	var startPos = startNodeData.height;

	var distance = window.innerHeight * 1.5;

	new ScrollMagic.Scene({
			duration: distance,
			offset: startPos - 50
		})
		.on("update", function (e) {
			
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