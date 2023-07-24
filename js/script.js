lazyload($('img[data-src]'));
$.fancybox.defaults.mobile = {};

let nav = document.querySelector('.nav');

// setTimeout(function () {
// 	nav.style.transition = 'top 0.8s ease';
// }, 1000)

$('.section-title').not('h1').not('.no-anim').addClass('animation');
$('.section-subtitle').not('.no-anim').addClass('animation');
setTimeout(function () {
	$('.hero-title').addClass('visible');
}, 500)

let header = document.querySelector('header');
let burger = document.querySelector('.burger');
let loc = document.querySelector('.location');
let navMenu = nav.querySelector('.nav__menu');
let navLoc = nav.querySelector('.nav__location');
let sidebar = document.querySelector('.sidebar__list');

burger.addEventListener('click', function () {
	if (navLoc.classList.contains('active')) {
		loc.classList.remove('active');
		navLoc.classList.remove('active');
		burger.classList.add('active');
		navMenu.classList.add('active');
		header.classList.add('active');
		sidebar.classList.add('active');
	} else {
		nav.classList.toggle('active');
		navMenu.classList.toggle('active');
		burger.classList.toggle('active');
		sidebar.classList.toggle('active');
		header.classList.toggle('active');
		document.body.classList.toggle('lock');
	}

	let links = nav.querySelectorAll('.nav__link');
	links.forEach(function (link) {
		link.addEventListener('click', function () {
			closeMenu();
		})
	})
})

loc.addEventListener('click', function () {
	if (burger.classList.contains('active')) {
		burger.classList.remove('active');
		navMenu.classList.remove('active');
		loc.classList.add('active');
		navLoc.classList.add('active');
		header.classList.add('active');
		sidebar.classList.add('active');
	} else {
		nav.classList.toggle('active');
		navLoc.classList.toggle('active');
		loc.classList.toggle('active');
		sidebar.classList.toggle('active');
		header.classList.toggle('active');
		document.body.classList.toggle('lock');
	}
})

let navClose = nav.querySelector('.nav__close');
if (navClose) navClose.addEventListener('click', closeMenu)


function closeMenu() {
	burger.classList.remove('active');
	loc.classList.remove('active');
	nav.classList.remove('active');
	navMenu.classList.remove('active');
	navLoc.classList.remove('active');
	header.classList.remove('active');
	sidebar.classList.remove('active');
	document.body.classList.remove('lock');
}

let contactsBtn = document.querySelector('.sidebar__btn.phone');
let contactsSidebar = document.querySelector('.sidebar__social');
if (contactsBtn) {
	contactsBtn.addEventListener('click', function () {
		contactsBtn.classList.toggle('active');
		contactsSidebar.classList.toggle('active');
	})
}

// checkbox 
let checkbox = document.querySelectorAll('.agree__checkbox');
checkbox.forEach(function (item) {
	let mainBtn = item.closest('form').querySelector('.main-btn');
	item.classList.add('check');

	item.addEventListener('click', function () {
		item.classList.toggle('check');
		if (!item.classList.contains('check')) {
			mainBtn.setAttribute('disabled', 'disabled');
		} else {
			mainBtn.removeAttribute('disabled', 'disabled');
		}
		mainBtn.classList.toggle('disabled');
	})
})

// кнопка наверх
let heightOfHero = document.querySelector('.hero').offsetHeight;
let btnUp = document.querySelector('.btn-top');
window.addEventListener('scroll', function () {
	if (window.pageYOffset > heightOfHero - 400) {
		btnUp.classList.add('active')
	} else {
		btnUp.classList.remove('active')
	}
});
if (btnUp) {
	btnUp.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	})
}

// select
let select = document.querySelectorAll('select');
select.forEach(function (item) {
	if (item) {
		customSelect(item);
	}
})


// маска на телефон
$('input[type="tel"]').inputmask({
	mask: '+7(X99)999-99-99',
	placeholder: '_',
	showMaskOnHover: false,
	definitions: {
		'X': {
			validator: "[0-6, 9]"
		}
	}
});
jQuery.validator.addMethod("checkMaskPhone", function (value, element) {
	return /\+\d{1}\(\d{3}\)\d{3}-\d{2}-\d{2}/g.test(value);
});



// валидация формы
$('[data-form-validate-js]').each(function () {
	var form = $(this);

	form.validate({
		errorClass: "validate_error",
		rules: {
			phone: {
				required: true,
				checkMaskPhone: true,
			},
		},
		errorPlacement: function (error, element) { },
		submitHandler: function () {
			var data = form.serialize();
			var action = form.attr('action');
			var method = form.attr('method');

			$.ajax({
				type: method,
				url: action,
				data: data,
				success: function (response) {
					window.location.href = "thanks.html";
				},
				error: function (response) {
					window.location.href = "404.html";
				},
			});
		},
	});
});

$('[data-download-form-js]').each(function () {
	var form = $(this);

	form.validate({
		errorClass: "validate_error",
		rules: {
			phone: {
				required: true,
				checkMaskPhone: true
			},
		},
		errorPlacement: function (error, element) { },
		submitHandler: function () {
			var data = form.serialize();
			var action = form.attr('action');
			var method = form.attr('method');
			var link = document.createElement('a');
			var file = form.attr('data-download-form-js');

			link.setAttribute('href', file);
			link.setAttribute('download', '');

			$.ajax({
				type: method,
				url: action,
				data: data,
				success: function (response) {
					window.location.href = "thanks.html";
					link.click();
				},
				error: function (response) {
					window.location.href = "404.html";
				},
			});
		},
	});
});


// плавная прокрутка
$("[data-anchor-btn-js]").on("click", function (event) {
	event.preventDefault();
	var headerHeight = $('header').height();

	var target = $(this).attr('href');

	if ($(target).length) {
		if (window.innerWidth > 768) {
			var offset = ($(target).offset().top);
		} else {
			var offset = ($(target).offset().top) - headerHeight - 50;
		}

		let scroll = $(window).scrollTop();
		let windowHeight = $(window).height();

		if (offset > scroll) {
			var time = Math.round(offset / windowHeight) * 500;
		} else {
			var time = Math.round((scroll - offset) / windowHeight) * 300;
		}

		$('body,html').animate({
			scrollTop: offset
		}, time);
	} else {
		window.location.href = "index.html";
	}
});

$('.nav__list a').on("click", handler);
$(function () {
	handler(location.hash);
});

function handler(event) {
	var hash = typeof event === 'string' ? event : event.target.hash;

	if (!hash)
		return

	var tag = $(hash);

	if (tag.length) {
		if (window.innerWidth > 768) {
			var offset = tag.offset().top;
		} else {
			var offset = tag.offset().top - headerHeight;
		}
		$('html, body').stop().animate({
			scrollTop: offset
		}, 2000);
	}
}

window.onhashchange = locationHashChanged;
function locationHashChanged() {
	if (location.hash) {
		history.pushState("", document.title, window.location.pathname);
	}
}


// квиз
var number = 0;
var maxNumber = $(".quiz-item").length;
var $element = $(".quiz-item").find("input");
var btnPrev = $(".quiz-btn--prev");
var btnNext = $('.quiz-btn--next');
var isValid;
var dataBlock;
var activeSlide = [];

$element.on('change input', function (e) {
	var value = $(this).val().trim();
	isValid = value !== "";
	btnActive(!isValid);
});

function btnActive(isValid) {
	if (number === 0) {
		btnPrev.prop('disabled', 'false');
		btnNext.prop('disabled', isValid);
	} else {
		btnPrev.prop('disabled', false);
		if (activeSlide[number] === true || isValid === false) {
			btnNext.prop('disabled', false);
		} else {
			btnNext.prop('disabled', true);
		}
	}
}

let quizSingle = document.querySelectorAll('[data-quiz-single-answer]');
quizSingle.forEach(function (item) {
	let inputs = item.querySelectorAll('input[type="radio"]');

	for (let i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener("click", function () {
			for (let j = 0; j < inputs.length; j++) {
				if (inputs[j].getAttribute('checked') == 'checked') {
					inputs[j].removeAttribute('checked')
				}
			};
			inputs[i].setAttribute('checked', 'checked')
		});
	}
})

// progressbar
function progress(num) {
	const percent = parseInt((100 / maxNumber) * (num + 1));
	$('.js-quiz').text(num + 1);
	$('.quiz__progress-inner').css('width', (percent === 100 ? 98.6 : percent) + '%');
}
progress(0);

$('input[name^="quiz"]').not('input[name^=quiz3]').on('change', function () {
	setTimeout(function () {
		btnNext.click();
	}, 800);
});

// btn
function btnClick() {
	btnPrev.on('click', function (event) {
		event.preventDefault();
		--number;
		$(".quiz-item").hide();
		$(".quiz-item").eq(number).fadeIn();
		btnActive(!isValid);
		if (number === 0) {
			btnPrev.hide();
		}
		progress(number);
		btnNext.blur();
	});

	btnNext.on('click', function (event) {
		event.preventDefault();
		let quizScroll = $(".quiz__inner").offset().top - 100;

		activeSlide[number] = true;
		++number;
		$(".quiz-item").hide();
		$(".quiz-item").eq(number).fadeIn(1000);
		btnActive(!isValid);

		if (activeSlide[number] === true) {
			btnNext.prop('disabled', false);
		} else {
			btnNext.prop('disabled', true);
		}

		if (number > 0) {
			btnPrev.show();
		}

		$('html, body').animate({
			scrollTop: quizScroll
		}, 1000);

		progress(number);

		if (number === maxNumber - 1) {
			$(".quiz__bottom").hide();
			$('.quiz-right__descr').html(`
			Вы ответили на все вопросы. Инженер уже приступил к расчету стоимости вашего дома			`);

			quizFinalStep();
		}

		setTimeout(function () {
			btnNext.trigger("blur");
		}, 500);
	});
}
btnClick();

var quizFinalStep = function () {
	$('.quiz__loader').addClass('visible');
	$('.quiz__body').addClass('blur');

	setTimeout(function () {
		$('.quiz-item--final').addClass('visible');
	}, 1500)

	setTimeout(function () {
		$('.quiz__body').removeClass('blur');
		$('.quiz__loader').removeClass('visible');
	}, 2000)
}

function inputValid(item) {
	if (item.value != '' && item.value > 0) {
		item.classList.add('checked')
	} else {
		item.classList.remove('checked')
	}
}

let quiz3Inputs = document.querySelectorAll('input[name^="quiz3"]');
if (quiz3Inputs) {
	quiz3Inputs.forEach(function (input) {
		input.oninput = function () {
			inputValid(input)

			let quiz3InputsChecked = document.querySelectorAll('input[name^="quiz3"].checked');
			if (quiz3Inputs.length == quiz3InputsChecked.length) {
				btnNext.prop('disabled', false);
			} else {
				btnNext.prop('disabled', true);
			}
		};
	})
}

let inputCount = document.querySelector('.quiz__input-count');
if (inputCount) {
	let inputBtnUp = inputCount.parentNode.querySelector('.input-arrow__up');
	let inputBtnDown = inputCount.parentNode.querySelector('.input-arrow__down');
	inputBtnUp.addEventListener('click', function () {
		event.preventDefault()
		++inputCount.value
		inputValid(inputCount)
		$('.quiz__input-count').trigger("oninput");
	})
	inputBtnDown.addEventListener('click', function () {
		event.preventDefault()
		if (inputCount.value > 0) {
			--inputCount.value
			inputValid(inputCount)
			$('.quiz__input-count').trigger("oninput");
		}
	})
}

// stock sliders
let stockSwipers = document.querySelectorAll('.stock__main-swiper');
stockSwipers.forEach(item => {
	let stockThumbs = item.parentNode.querySelector('.stock__swiper');

	var stockThumb = new Swiper(stockThumbs, {
		loop: false,
		speed: 600,
		centeredSlides: false,
		touchRatio: 1,
		slidesPerView: 'auto',
		freeMode: true,
		watchSlidesProgress: true,
	});

	var stockSwiper = new Swiper(item, {
		loop: false,
		speed: 600,
		centeredSlides: false,
		touchRatio: 1,
		slidesPerView: 'auto',
		freeMode: true,

		navigation: {
			nextEl: item.querySelector('.slider-btn--next'),
			prevEl: item.querySelector('.slider-btn--prev'),
		},
		thumbs: {
			swiper: stockThumb,
		},
	});
})

// слайдеры
let portfolioSlider = document.querySelector('.portfolio__swiper');
if (portfolioSlider) initSwiper(portfolioSlider);
let feedbackSlider = document.querySelector('.feedback__swiper');
if (feedbackSlider) initSwiper(feedbackSlider);

function initSwiper(slider) {
	let swiper = new Swiper(slider, {
		loop: false,
		speed: 600,
		centeredSlides: false,
		touchRatio: 1,
		slidesPerView: 'auto',
		freeMode: true,

		navigation: {
			nextEl: slider.closest('section').querySelector('.slider-btn--next'),
			prevEl: slider.closest('section').querySelector('.slider-btn--prev'),
		},

		pagination: {
			el: slider.closest('section').querySelector('.swiper-pagination'),
			clickable: true,
		},
	});
}

let contactsSlider = document.querySelector('.contacts__swiper--office');
if (contactsSlider) {
	let contactsSwiper = new Swiper(contactsSlider, {
		loop: false,
		speed: 600,
		centeredSlides: false,
		touchRatio: 1,
		slidesPerView: 'auto',
		freeMode: true,

		navigation: {
			nextEl: contactsSlider.querySelector('.slider-btn--next'),
			prevEl: contactsSlider.querySelector('.slider-btn--prev'),
		},
	});
}

let contactsSlider2 = document.querySelector('.contacts__swiper--excursion');
if (contactsSlider2) {
	let contactsSwiper2 = new Swiper(contactsSlider2, {
		loop: false,
		speed: 600,
		centeredSlides: false,
		touchRatio: 1,
		slidesPerView: 'auto',
		freeMode: true,

		navigation: {
			nextEl: contactsSlider2.querySelector('.slider-btn--next'),
			prevEl: contactsSlider2.querySelector('.slider-btn--prev'),
		},
	});
}



// анимация подгрузки контента при скролле
var titleAnimation = function () {
	$('.animation').each(function () {
		var element = $(this);

		if (!(element.hasClass('visible'))) {
			var scroll = $(window).scrollTop(),
				position = element.offset().top,
				windowHeight = $(window).height();

			if ((scroll + (windowHeight * 4 / 5)) > position) {
				element.addClass('visible');
			};
		};
	});
}
$(document).ready(function () {
	titleAnimation();
	setTimeout(function () {
		$('.hero__title').addClass('visible');
	}, 500)
});
$(window).on('scroll', function () {
	titleAnimation();
});


// popup
let callbackPopup = document.querySelector('.popup-callback');
let openCallbackPopup = document.querySelectorAll('.callback-open');

let confPopup = document.querySelector('.popup-conf');
let openConfPopup = document.querySelectorAll('.conf');

let waitPopup = document.querySelector('.popup-wait');
let openWaitPopup = document.querySelectorAll('.wait-open');


// открытие popup
openPopup(openConfPopup, confPopup);
openPopup(openCallbackPopup, callbackPopup);
openPopup(openWaitPopup, waitPopup);

function openPopup(btnOpen, popup) {
	btnOpen.forEach(function (item) {
		item.addEventListener('click', function (e) {
			e.preventDefault();
			popup.classList.add('active');
			if (!document.body.classList.add('lock')) document.body.classList.add('lock');
		});
	})
}

// закрытие popup
let popups = document.querySelectorAll('.popup');
popups.forEach(function (popup) {
	let body = popup.querySelector(".popup__body");
	let close = popup.querySelector(".popup__close");

	if (!popup.classList.contains('popup-cookie')) {
		popup.addEventListener('click', (e) => {
			const withinBoundaries = e.composedPath().includes(body);
			if (!withinBoundaries) closePopup(popup);
		})
	}
	close.addEventListener('click', function () {
		closePopup(popup)
	});

})

function closePopup(popup) {
	popup.classList.remove('active');
	document.body.classList.remove('lock');
}

let video = document.querySelector('.video');
if (video) {
	window.addEventListener('scroll', function () {
		if (window.pageYOffset > (heightOfHero / 3) && window.innerWidth > 768 && !video.classList.contains('hidden')) {
			video.classList.add('visible')
		} else {
			video.classList.remove('visible')
		}
	})

	let close = video.querySelector('.video__close');
	close.addEventListener('click', function () {
		video.classList.remove('visible');
		video.classList.add('hidden');
	})
}

// липкое боковое меню
let sideMenu = document.querySelector('.sidemenu');
if (sideMenu) {

	window.addEventListener('scroll', function () {
		if (window.pageYOffset > heightOfHero && window.innerWidth > 768) {
			sideMenu.classList.add('visible')
		} else {
			sideMenu.classList.remove('visible')
		}
	})
	document.addEventListener('DOMContentLoaded', function () {
		if (window.pageYOffset > heightOfHero && window.innerWidth > 768) {
			sideMenu.classList.add('visible')
		} else {
			sideMenu.classList.remove('visible')
		};

		if (window.innerWidth < 768) {
			setTimeout(function () {
				sideTop.click();
			}, 2000)
		}
	})

	let sideClose = sideMenu.querySelector('.sidemenu__close');
	let sideBody = sideMenu.querySelector('.sidemenu__body');
	let sideTop = sideMenu.querySelector('.sidemenu__top');
	sideBody.style.maxHeight = sideBody.scrollHeight + "px";

	window.addEventListener('resize', function () {
		if (!sideMenu.classList.contains('hidden')) {
			sideBody.style.maxHeight = sideBody.scrollHeight + "px";
		}
	})

	sideClose.addEventListener('click', function () {
		if (sideBody.style.maxHeight == null && !sideTop.classList.contains('active')) {
			sideBody.style.maxHeight = sideBody.scrollHeight + "px";
		} else {
			sideBody.style.maxHeight = null;
			sideMenu.classList.add('hidden');
		}

		setTimeout(function () {
			sideClose.classList.add('close');
			sideTop.classList.add('close');
		}, 1200)

		if (sideMenu.classList.contains('hidden')) {
			setTimeout(function () {
				sideClose.classList.remove('close');
				sideTop.classList.remove('close');
				sideMenu.classList.remove('hidden');
			}, 15000)
		}
	})

	sideTop.addEventListener('click', function () {
		sideTop.classList.toggle('active');
		if (sideBody.style.maxHeight) {
			sideBody.style.maxHeight = null;
		} else {
			sideBody.style.maxHeight = sideBody.scrollHeight + "px";
		}
	})
}


var months = [
	'Января',
	'Февраля',
	'Марта',
	'Апреля',
	'Мая',
	'Июня',
	'Июля',
	'Августа',
	'Сентября',
	'Октября',
	'Ноября',
	'Декабря',
];

var itsNow = new Date();
let monthNow = months[itsNow.getMonth()].toLowerCase();
let offerMonth = document.querySelector('.stock__now');
let catalogDate = document.getElementById('catalogDate');
if (offerMonth) offerMonth.innerHTML = 'Сегодня ' + itsNow.getDate() + ' ' + monthNow + ' ' + itsNow.getFullYear() + ' года';
if (catalogDate) {
	if (itsNow.getMonth() + 1 < 10) {
		catalogDate.innerHTML = itsNow.getDate() + '.0' + (itsNow.getMonth() + 1) + '.' + itsNow.getFullYear();
	} else {
		catalogDate.innerHTML = itsNow.getDate() + '.' + (itsNow.getMonth() + 1) + '.' + itsNow.getFullYear();
	}
}

let stock = document.getElementById('stock');
if (stock) {
	let completed = stock.getElementsByClassName('status-completed');
	let built = stock.getElementsByClassName('status-built');

	let builtDescr;
	if (built.length === 1) {
		builtDescr = ' дом'
	} else if (built.length < 5 && built.length > 0) {
		builtDescr = ' дома'
	} else {
		builtDescr = ' домов'
	}
	document.getElementById('endSum').innerHTML = completed.length;
	document.getElementById('builtSum').innerHTML = built.length + builtDescr;

	let btnMore = stock.querySelector('.stock__more');

	btnMore.addEventListener('click', function () {
		let stockListHidden = stock.querySelectorAll('.stock__item.hidden');
		for (i = 0; i < 2; i++) {
			stockListHidden[i].classList.remove('hidden');
		}
		if (stock.getElementsByClassName('stock__item hidden').length == 0) {
			btnMore.style.display = "none"
		}
	})
}

let setHint = document.querySelectorAll('.set__hint');
let hintActive = document.getElementsByClassName('set__hint active');

Array.from(setHint).forEach(function (item) {
	item.addEventListener('click', function (e) {
		if (hintActive.length > 0 && hintActive[0] !== this) hintActive[0].classList.remove('active');

		this.classList.toggle('active');
	});
});

// блок экскурсия
let excursionNow = document.getElementById('excursionNow');
if (excursionNow) {
	if (itsNow.getMonth() + 1 < 10) {
		excursionNow.value = itsNow.getFullYear() + '-0' + (itsNow.getMonth() + 1) + '-' + (itsNow.getDate() + 1) + 'T' + '13:00';
		excursionNow.min = itsNow.getFullYear() + '-0' + (itsNow.getMonth() + 1) + '-' + (itsNow.getDate() + 1) + 'T' + '10:00';
	} else {
		excursionNow.value = itsNow.getFullYear() + '-' + (itsNow.getMonth() + 1) + '-' + (itsNow.getDate() + 1) + 'T' + '13:00';
		excursionNow.min = itsNow.getFullYear() + '-' + (itsNow.getMonth() + 1) + '-' + (itsNow.getDate() + 1) + 'T' + '10:00';
	}

	let excursionDate = document.getElementById('excursionDate');
	changeData();

	excursionNow.addEventListener('change', changeData);

	function changeData() {
		let value = excursionNow.value;
		excursionDate.value = 'Дата: ' + value.slice(8, 10) + '.' + value.slice(5, 7) + '.' + value.slice(0, 4) + ' Время: ' + value.slice(11);
	}
}

let hupothecItem = document.querySelectorAll('.hypothec__item');
hupothecItem.forEach(item => {
	item.addEventListener('click', function () {
		item.classList.toggle('active');
	})
})

let hupothecCard = document.querySelectorAll('.hypothec__card');
hupothecCard.forEach(card => {
	card.addEventListener('click', function () {
		card.classList.toggle('active');
	})
})

// faq
let faqItems = document.querySelectorAll('.faq__item');
faqItems.forEach(function (faq) {
	faq.addEventListener('click', function () {
		faq.classList.toggle('active');
		let answer = faq.querySelector('.faq__answer');
		if (answer.style.maxHeight) {
			answer.style.maxHeight = null;
		} else {
			answer.style.maxHeight = answer.scrollHeight + 'px';
		}
	})
})

let faqMore = document.querySelector('.faq__more');
let faqList = document.querySelector('.faq__list');
if (faqMore) {
	faqMore.addEventListener('click', function () {
		faqList.classList.add('active');
		faqMore.style.display = 'none';
	})
}