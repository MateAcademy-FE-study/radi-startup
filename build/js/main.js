(function () {

	// invocations
	modalWindows('.js-mainMenu');
	smoothScrollLinks();

	///////////////////////


	function modalWindows(menuClass) {
		// variables
		let className = '.js-modal';
		let modalBlock = document.querySelector(className);
		let modalClose = modalBlock.querySelector(className + '-close');
		let modalMenu = modalBlock.querySelector(className + '-menu');
		let modalStart = modalBlock.querySelector(className + '-start');
		let activeClass = 'open';
		let invisibleClass = "invisible";
		let body = document.querySelector('body');

		// invocations
		if (menuClass) { copyMenuToModal(); }
		initModalWindow();

		// events
		modalClose.addEventListener('click', function (e) {
			e.preventDefault();
			body.classList.remove('modal-open');
			closeModal();
		});

		document.addEventListener('anika-menu:close-me-please', function(e){
			console.log(e);
			closeModal();
		});


		function copyMenuToModal() {
			let mainMenu = document.querySelector(menuClass);
			if (!mainMenu) return;

			let clone = mainMenu.cloneNode(true);
			modalMenu.appendChild(clone);
		}

		// open modal and content
		function openModal(data) {
			modalBlock.classList.add(activeClass);
			body.classList.add('modal-open');

			modalBlock.querySelector('#' + data).classList.remove(invisibleClass);
		};

		function closeModal() {
			for (let i = 0; i < modalBlock.children.length; i++) {
				if (!modalBlock.children[i].dataset.modal) {
					modalBlock.children[i].classList.add(invisibleClass);
				}
			}
			modalBlock.classList.remove(activeClass);
		}

		function initModalWindow() {
			if (!modalBlock) return;
			var modalTriggers = document.querySelectorAll(className + '-trigger');

			for (let i = 0; i < modalTriggers.length; i++) {
				modalTriggers[i].addEventListener('click', function (e) {
					e.preventDefault();
					if (!this.dataset.modal) return;
					openModal(this.dataset.modal);
				})
			}
		}

	}

	function smoothScrollLinks() {
		document.querySelectorAll('a[href^="#"]').forEach(link => {
			link.addEventListener('click', function (e) {
				e.preventDefault();

				if (document.querySelector('body').classList.contains('modal-open')) {
					let event = new CustomEvent("anika-menu:close-me-please", {
						detail: 'custom information: ' + link.href
					});
					document.dispatchEvent(event);
				}

				document.querySelector(this.getAttribute('href')).scrollIntoView({
					behavior: 'smooth'
				});
			});
		});
	}

})();