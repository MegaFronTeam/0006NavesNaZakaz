"use strict";

const JSCCommon = {
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					function setImage(src) {
						return `<img src="img/@2x/modal-${src}.png" alt="" loading="lazy">`
					}
					setValue(data.title, '.modal-title-js');
					setValue(data.text, '.modal-text-js');
					setValue(data.btn, '.btn');
					setValue(setImage(data.pic), '.modal-pic-js');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() {
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	// makeDDGroup() {
	// 	let parents = document.querySelectorAll('.dd-group-js');
	// 	for (let parent of parents) {
	// 		if (parent) {
	// 			// childHeads, kind of funny))
	// 			let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
	// 			$(ChildHeads).click(function () {
	// 				let clickedHead = this;

	// 				$(ChildHeads).each(function () {
	// 					if (this === clickedHead) {
	// 						//parent element gain toggle class, style head change via parent
	// 						$(this.parentElement).toggleClass('active');
	// 						$(this.parentElement).find('.dd-content-js').slideToggle(function () {
	// 							$(this).toggleClass('active');
	// 						});
	// 					}
	// 					else {
	// 						$(this.parentElement).removeClass('active');
	// 						$(this.parentElement).find('.dd-content-js').slideUp(function () {
	// 							$(this).removeClass('active');
	// 						});
	// 					}
	// 				});

	// 			});
	// 		}
	// 	}
	// },
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	// JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	// JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}
	// function setFixedNav1() {
	// 	let topNav1 = document.querySelector('.page-head__row--fix  ');
	// 	if (!topNav1) return;
	// 	window.scrollY > 100
	// 		? topNav1.classList.add('fixed')
	// 		: topNav1.classList.remove('fixed');
	// }

	function whenResize() {
		setFixedNav();
		// setFixedNav1();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();
		// setFixedNav1();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	const sCatalogSlider = new Swiper('.sCatalog__slider--js', {
		// freeMode: true,
		// loopFillGroupWithBlank: true,
		// touchRatio: 0.2,
		// freeModeMomentum: true,
		loop: true,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 16,
		slidesPerView: 1,
		slideToClickedSlide: true,
		navigation: {
			nextEl: '.sCatalog .swiper-button-next',
			prevEl: '.sCatalog .swiper-button-prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 16
			},

		}

	});
	const sReviewsSlider = new Swiper('.sReviews__slider--js', {
		// freeMode: true,
		// loopFillGroupWithBlank: true,
		touchRatio: 0.4,
		// freeModeMomentum: true,
		loop: true,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 16,
		slidesPerView: 1,
		noSwipingClass: 'plyr',
		// slideToClickedSlide: true,
		navigation: {
			nextEl: '.sReviews .swiper-button-next',
			prevEl: '.sReviews .swiper-button-prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 16
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 16
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 24
			},
			1400: {
				slidesPerView: 3,
				spaceBetween: 32
			},

		}

	});
	const sCertificatesSlider = new Swiper('.sCertificates__slider--js', {
		// freeMode: true,
		// loopFillGroupWithBlank: true,
		// touchRatio: 0.2,
		// freeModeMomentum: true,
		// loop: true,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 16,
		slidesPerView: 1,
		slideToClickedSlide: true,
		navigation: {
			nextEl: '.sCertificates .swiper-button-next',
			prevEl: '.sCertificates .swiper-button-prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 24
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 24
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 24
			},
			1400: {
				slidesPerView: 4,
				spaceBetween: 32
			},

		}

	});
	const sTypicalSlider = new Swiper('.sTypical__slider--js', {
		// freeMode: true,
		// loopFillGroupWithBlank: true,
		// touchRatio: 0.2,
		// freeModeMomentum: true,
		// loop: true,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 16,
		slidesPerView: 1,
		slideToClickedSlide: true,
		navigation: {
			nextEl: '.sTypical .swiper-button-next',
			prevEl: '.sTypical .swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 24
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 24
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 24
			},
			1400: {
				slidesPerView: 4,
				spaceBetween: 32
			},

		}

	});
	const sAboutSlider = new Swiper('.sAbout__slider--js', {
		// freeMode: true,
		loopFillGroupWithBlank: true,
		// touchRatio: 0.2,
		// freeModeMomentum: true,
		loop: true,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 16,
		slidesPerView: 1,
		slideToClickedSlide: true,
		navigation: {
			nextEl: '.sAbout .swiper-button-next',
			prevEl: '.sAbout .swiper-button-prev',
		},
	});
	const formWrapSlider = new Swiper('.form-wrap__slider--js', {
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		freeModeMomentum: true,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 16,
		slidesPerView: 'auto',
		slideToClickedSlide: true,
	});

	// Прокрутка на верх 
	$(function () {
		// прячем кнопку #back-top
		$("#back-top").hide();

		$(window).scroll(function () {
			if ($(this).scrollTop() > 908) {
				$("#back-top").fadeIn();
			} else {
				$("#back-top").fadeOut();
			}
		});

		// при клике на ссылку плавно поднимаемся вверх
		$("#back-top a").click(function () {
			$("body,html").animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});



	let  sliderWrap = document.querySelectorAll(".sSpecifications__slider-wrap");

	sliderWrap.forEach((element) => {

		var sSpecificationsswiperThumbs = new Swiper(element.querySelector(".sSpecifications__slider-thumbs--js"), {
			loop: true,
			spaceBetween: 8,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesProgress: true,
		});
		var sSpecificationsswiper2 = new Swiper(element.querySelector(".sSpecifications__slider--js"), {
			loop: true,
			spaceBetween: 0,
			slidesPerView: 1,
			// autoplay: {
			// 	delay: 5000,
			// },
			watchOverflow: true,
			thumbs: {
				swiper: sSpecificationsswiperThumbs,
			}
		});
	})
		
	// console.log(sSpecificationsswiperThumbs);
	//hc-sticky

	// var Sticky = new hcSticky('.page-head__row--fix', {
	// 	top:100
	// });


	// var $sticky = $('.page-head__row--fix');

	// $sticky.hcSticky({
	// 	// innerTop:150,
	// 	stickTo:`.sContent`,
	// 	stickyClass: `fixed`,
	// 	top:64,
	// 	responsive: {
	// 		992: {
	// 			top:48,
	// 		}
	// 	},
	// });
	//end
	// modal window
	$(".dd-head-js").click(function () {
		$(this).toggleClass("active").next().slideToggle();
	})
	const player = Array.from(document.querySelectorAll('.js-player')).map(p => new Plyr(p, { invertTime: false }));

	$(".dropdown__btn").click(function () {
		$(this).parent().toggleClass("active");
		$(this).siblings('.dropdown__content').slideToggle();
	});
	$(document).on('click', function (e) {
		if (!$(e.target).closest(".dropdown").length) {
			$('.dropdown__content').slideUp();
			$(".dropdown").removeClass("active");
		}
		e.stopPropagation();
	});
	$('.page-head__row--fix').hcSticky({
		stickTo: $('.sticky-wrapper'),
		top: 128,
		innerTop: 64,
		// bottomEnd: 100,
		responsive: {
			992: {
				top: 96,
				innerTop: 48,
				// disable: true,
			}
		}
  });
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }



const map = document.querySelector('#map');
document.addEventListener('DOMContentLoaded', function (event) {
	ymaps.ready(init);
});
function init() {
	//- var center = [55.75322550427434,37.65589449999999];
	var center = [56.01248606874105, 37.48441499999996];
	var myMap = new ymaps.Map("map", {
		center: center,
		zoom: 17,
		controls: ['zoomControl']
	});

	// Создадим коллекцию геообъектов.
	var collection = new ymaps.GeoObjectCollection();

	collection
		.add(new ymaps.Placemark([56.01248606874105, 37.48441499999996], { balloonContent: '', }))
		.add(new ymaps.Placemark([55.67169106905855, 37.2928495], { balloonContent: '', }))
		.add(new ymaps.Placemark([54.822272569867756, 38.150632499999915], { balloonContent: '', }))
		.add(new ymaps.Placemark([55.749850568991356, 38.64405949999995], { balloonContent: '', }))
		.add(new ymaps.Placemark([56.349454568379294, 36.75054550000001], { balloonContent: '', }))
		.add(new ymaps.Placemark([56.316543568414716, 38.15373199999991], { balloonContent: '', }));

	myMap.geoObjects.add(collection);


	// myMap.behaviors.disable('scrollZoom');
	//на мобильных устройствах... (проверяем по userAgent браузера)
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		//... отключаем перетаскивание карты
		myMap.behaviors.disable('drag');
	}
	// Добавляем все метки на карту.


	$(document).on('click', ".sContact__map-point", function (e) {
		// const mark = this.dataset.mark; 
		const mark = this.dataset.mark.split(',');
		const zoom = +this.dataset.zoom;
		myMap.setCenter(mark, zoom);
		console.log(mark);
	});
}