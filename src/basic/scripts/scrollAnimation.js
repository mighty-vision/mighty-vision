import ScrollMagic from 'ScrollMagic';
import setCSSVar from './../../utils/scripts/setCSSVar';

export default function() {
  var controller = new ScrollMagic.Controller();

	var startNodeData = document.querySelector('.secondScreen .content').getBoundingClientRect();
	var startPos = startNodeData.height;

	var distance = window.innerHeight * 1.3;

	new ScrollMagic.Scene({
			duration: distance,
			offset: startPos - 50
		})
		.on("update", function (e) {
			
		})
		.on("progress", function (e) {
			if(e.progress >= 0.680995) {
				setCSSVar(document.body, 'progress', 0.680995);
				return;
			}

			setCSSVar(document.body, 'progress', e.progress);
		})
		.addTo(controller);
}