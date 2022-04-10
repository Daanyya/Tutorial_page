document.addEventListener("DOMContentLoaded", load_user_name());

var main_icon = document.getElementById("main_icon");
window.addEventListener('scroll', function() {
	if (pageYOffset > 200) {
		main_icon.src = "images/home_2.png";
	} else {
		main_icon.src = "images/home_1.png";
	}
});

var menu = document.getElementById("menu_view");
menu.onmouseleave = function(event) {
	menu_off();
};

function load_user_name() {
	if (localStorage.getItem("user_name") != null) {
		var user = document.getElementById("icon_user_name");
		user.textContent = localStorage.getItem("user_name");
		user.style.display = "inline";
	}
}

function hello_user() {
	var 
		name,
		name_all = document.querySelectorAll("input[id='user_name']");
	name_all.forEach(e => e.value.length > 0 ? name = e.value : 0);
	name_all.forEach(e => e.value = "");
	
	if (name.length == 0) {
		alert("Привет друг!");
	} else {
		localStorage.setItem("user_name", name);
		load_user_name();
		alert("Привет " + name + "!");
	}
}

function delta_side() {
	var 
		basis_all = document.querySelectorAll("input[id='delta_basis']"),
		heigh_all = document.querySelectorAll("input[id='delta_heigh']"),
		basis,
		heigh,
		side;

	basis_all.forEach(e => e.value > 0 ? basis = e.value : 0);
	heigh_all.forEach(e => e.value > 0 ? heigh = e.value : 0);
	basis_all.forEach(e => e.value = 0);
	heigh_all.forEach(e => e.value = 0);

	side = 0.5 * basis * heigh
	alert("Площадь твоего треугольника равна " + side);
}

function string_comparator() {
	var 
		string_1_all = document.querySelectorAll("input[id='string_1']"),
		string_2_all = document.querySelectorAll("input[id='string_2']"),
		string_1,
		string_2;

	string_1_all.forEach(e => e.value.length > 0 ? string_1 = e.value : 0);
	string_2_all.forEach(e => e.value.length > 0 ? string_2 = e.value : 0);
	string_1_all.forEach(e => e.value = "");
	string_2_all.forEach(e => e.value = "");

	alert(string_1.length == string_2.length);
}

function min_max() {
	var 
		mass = new Array(),
		all_elements = document.querySelectorAll("input[name='minimax_element']"),
		min = 0, 
		max = 0, 
		min_index, 
		max_index, 
		count = 0;

	all_elements.forEach(e => e.value != "" ? mass.push(e.value) : 0);
	all_elements.forEach(e => e.value = "");

	if (mass.length == 0) {
		alert("Элементов не обнаружено!")
	} else {
		if (isNaN(parseInt(mass[0]))) {
			min = mass[0].length;
			max = min;
		} else {
			min = parseInt(mass[0]);
			max = min;
		}
		min_index = 1;
		max_index = 1;
	}

	for (var i = 1; i < mass.length; i++) {
		if (isNaN(parseInt(mass[i]))) {
			count = mass[i].length;
		} else {
			count = mass[i];
		}

		if (count < min) {
			min = count;
			min_index = i + 1;
		}
		if (count > max) {
			max = count;
			max_index = i + 1;
		}
	}

	alert("Минимальный элемент " + min_index + ", максимальный элемент " + max_index);
}

var 
	t,
	hours = 0,
	minutes = 0,
	seconds = 0,
	screen = document.querySelectorAll("h3[id='timer_screen']"),
	buffer = "";

function timer_count() {
	seconds++;
	if (seconds >= 60) {
		seconds = 0;
		minutes++;
		if (minutes >= 60) {
			minutes = 0;
			hours++;
		}
	}
}

function timer_screen() {
	timer_count();
	buffer = hours > 9 ? hours : "0" + hours + ":";
	buffer += minutes > 9 ? minutes : "0" + minutes + ":";
	buffer += seconds > 9 ? seconds : "0" + seconds;
	screen.forEach(e => e.textContent = buffer);
	timer();
}

function timer() {
	t = setTimeout(timer_screen, 1000);
}

function timer_pause() {
	clearTimeout(t);
}

var 
	super_screen = document.getElementById("SSId"),
	super_description = document.querySelector(".Surprise > .Description"),
	header = document.getElementById("header_view");

function surprise() {
	super_screen.style.display = "block";
	header.style.display = "none";
	
	var 
		date_field = document.getElementById("surprise_date"),
		user_name_field = document.getElementById("surprise_user_name");

	var options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		timezone: 'UTC'
	};
	
	date_field.textContent = new Date().toLocaleString("ru", options);
	
	if (localStorage.getItem("user_name") != null) {
		var buff = "Хорошего дня, ";
		buff += localStorage.getItem("user_name") + "!";
		user_name_field.textContent = buff;
	} else {
		user_name_field.textContent = "Хорошего дня, друг!";
	}

	show(0.001);
}

function show(value) {
	if (value < 1) {
		value += 0.001;
		super_screen.style.opacity = value;
		setTimeout(show(value + 0.001), 50);
	}	
}

function hide(value) {
	if (value > 0) {
		value -= 0.001;
		super_screen.style.opacity = value;
		setTimeout(hide(value - 0.001), 50);
	} else {
		super_screen.style.display = "none";
		header.style.display = "block";
	}
}

super_screen.onclick = function() {
	hide(1);
}

function check_questions() {
	var answers = new Array(2, 1, 0, 1, 1, 2, 0, 1, 0, 2), temp, count = 0;
	for (var i = 1; i <= 10; i++) {
		temp = document.querySelector("input[name=\"question_" + i + "\"]:checked");
		if (temp == null) {
			alert("Пожалуйста, ответь снача на все вопросы!");
			return;
		}
		if (temp.value == answers[i - 1]) {
			document.getElementById("result_" + i).textContent = "Верно";
			count++;
		} else {
			document.getElementById("result_" + i).textContent = "Неверно";
		}
	}
	document.getElementById("answers_result").textContent = "Результат: " + count + " из 10";
	var radios = document.querySelectorAll("form > div > div > div > input");
	for (var i = 0; i < radios.length; i++) {
		radios[i].disabled = 1;
	}
	document.getElementById("check_answer").style.display = "none";
}

function scroll_to(name) {
	document.getElementById(name).scrollIntoView({behavior: "smooth", block: "center"});
}

var
	menu_button_on = document.getElementById("menu_button_on"),
	menu_button_off = document.getElementById("menu_button_off"),
	menu_view = document.getElementById("menu_view");

function menu_on() {
	menu_button_on.style.display = "none";
	menu_button_off.style.display = "inline";
	menu_view.style.display = "block";

}

function menu_off() {
	menu_button_on.style.display = "inline";
	menu_button_off.style.display = "none";
	menu_view.style.display = "none";
}

function go_home() {
	window.scrollTo(pageXOffset, 0);
}