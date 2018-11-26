var className = '.js-modal';
var modalBlock = document.querySelector(className);
var modalClose = modalBlock.querySelector(className+'-close');
var modalMenu = modalBlock.querySelector(className+'-menu');
var modalStart = modalBlock.querySelector(className+'-start');
var activeModalBlock = 'open';
var invisibleModalBlockContent = "invisible";


//clone menu for mobile
function burgerMenu() {

	let mainMenu = document.querySelector('.js-mainMenu');
	if (!mainMenu) return;
	let clone = mainMenu.cloneNode(true);
//	clone.classList.remove('main_menu--visibility')
	modalMenu.appendChild(clone);
}
burgerMenu();
// open modal and content
function openModal(data){
	modalBlock.classList.add(activeModalBlock);
	data.classList.remove(invisibleModalBlockContent);
};
//close modal and content
modalClose.addEventListener('click', function (e) {
		e.preventDefault();
		console.log(' хй');
		for (let i = 0; i < modalBlock.children.length; i++) {
			if (!modalBlock.children[i].dataset.modal) {
modalBlock.children[i].classList.add(invisibleModalBlockContent);
			}
		}
		modalBlock.classList.remove(activeModalBlock);
	});
	
//
function modalWindow() {

	if (!modalBlock) return;
	var modalTriggers = document.querySelectorAll(className + '-trigger');
	for (let i = 0; i < modalTriggers.length; i++) {
		modalTriggers[i].addEventListener('click', function (e) {
			e.preventDefault();
			if (!this.dataset.modal) return;

			if (this.dataset.modal == 'start') {

				openModal(modalStart);
			}
			if (this.dataset.modal == 'menu') {
				openModal(modalMenu);
			}
		})
	}



}
modalWindow();
