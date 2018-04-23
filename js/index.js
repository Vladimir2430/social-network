let slideIndex = 1;

function plusDiv(n) {
	showDiv(slideIndex += n);
}

function showDiv(n) {
	let i, slides = document.getElementsByClassName('slide');
	let count = document.getElementById('count');
	if (n > slides.length) slideIndex = 1;
	if (n < 1) slideIndex = slides.length;
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}
	slides[slideIndex-1].style.display = 'flex';
	if (slideIndex == slides.length) {
		slides[i-1].querySelector('.background-image').setAttribute('src', slides[i-2].querySelector('img').getAttribute('src'));
		document.getElementById('count').style.display = 'none';
		document.getElementById('spam').style.display = 'none';
	} else {
		document.getElementById('count').innerHTML = '<i class="count-photo"><img src="./images/camera.svg" alt="photo"></i>'
			 + slideIndex +'/'+(slides.length-1);
		document.getElementById('count').style.display = 'inline';
		document.getElementById('spam').innerHTML = 'P';
		document.getElementById('spam').style.display = 'inline';
	}
}

showDiv(slideIndex);

let next = document.getElementById('prev');
let prev = document.getElementById('next');
prev.addEventListener('click', () =>	plusDiv(1));
next.addEventListener('click', () =>	plusDiv(-1));

function moveSlider(e) {
    switch(e.keyCode) {
    	case 32:
    		e.preventDefault();
    		plusDiv(1);
            break;
        case 37:
        	e.preventDefault();
        	plusDiv(-1);
            break;
        case 39:
        	e.preventDefault();
        	plusDiv(1);
            break;
        case 49:
        case 97:
        	document.querySelector('.icon-like').classList.toggle('no-check');
        	document.querySelector('.icon-dislike').classList.remove('no-check');
            break;
        case 50:
        case 98:
        	document.querySelector('.icon-like').classList.add('no-check');
        	document.querySelector('.icon-dislike').classList.toggle('no-check');
            break;
        case 51:
        case 99:
        	document.querySelector('.icon-super-like').classList.toggle('no-check');
        	break;
    }
}

addEventListener('keydown', moveSlider);

let likes = document.querySelectorAll('.icon');
for (let i = 0; i < likes.length; i++) {
	likes[i].onclick = function() {
		this.classList.toggle('no-check');
	};
};

let profile = document.getElementById('profile');
profile.addEventListener('click', () => document.getElementById('user-card').classList.toggle('show'));
let buttonMap = document.getElementById('button-map');
buttonMap.addEventListener('click', () =>	document.getElementById('map-info').style.display = 'none');

let minsk_map;
ymaps.ready(function(){
	minsk_map = new ymaps.Map('first_map', {
		center: [53.936600, 27.480000],
		zoom: 15
	});
});

let width = 114, count = 1, desktop = 6, position = 0;
let carousel = document.getElementById('carousel');
let list = carousel.querySelector('ul');
let listElement = carousel.querySelectorAll('li');
document.getElementById('count-carousel').innerHTML = listElement.length + '<i class="count-photo"><img src="./images/camera.svg" alt="photo"></i>';
carousel.querySelector('.prev-carousel').style.display = 'none'

carousel.querySelector('.prev-carousel').onclick = function() {
	position = position - width * count;
	if (position <= 0) {
		position = 0;
		this.style.display = 'none'
		carousel.querySelector('.next-carousel').style.display = 'block';
	}
	list.style.marginLeft = -position + 'px';
};

carousel.querySelector('.next-carousel').onclick = function() {
	position = position + width * count;
	if (position >= width * (listElement.length - desktop)) {
		position = width * (listElement.length - desktop);
		this.style.display = 'none';
		carousel.querySelector('.prev-carousel').style.display = 'block';
	}
	list.style.marginLeft = -position + 'px';
};

let elements = carousel.querySelectorAll('.slide-carousel');
for (let i = 0; i < elements.length; i++) {
	elements[i].onclick = function() {
		for (let key in elements) {
			if (elements[key] == this) {
				slideIndex = +key+1;
				showDiv(slideIndex);
			}
		}
		document.getElementById('user-card').classList.remove('show');
		document.querySelector('.icon-profile').classList.toggle('no-check');
	};
};
