export function scrollToElement(elementId: string) {
	const yOffset = -50;
	const element = document.getElementById(elementId);
	const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
	window.scrollTo({ top: y, behavior: 'smooth' });
};
