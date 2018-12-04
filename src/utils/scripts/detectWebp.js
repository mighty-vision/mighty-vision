export default function detectWebp() {
	var WebP = new Image();

	WebP.onload = WebP.onerror = function() {
	  var className = WebP.height === 2 ? 'webp' : 'no-webp';
	  document.documentElement.classList.add(className);  
	};
	WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}