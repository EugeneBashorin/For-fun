  window.onload = function(){
	//First
	//add highlight
	var item = document.querySelector('.items .item');//ищет item в items	
	item.onclick = activeItem;//add ref	
	function activeItem(){
		item.classList.toggle('item-active');
	}
	//add timer
	var timer = new Timer(60,item);
	setInterval(function(){
		timer.tick();
	},1000);
	
	//Second
	var items_2 = document.querySelectorAll('.items_2 .item_2');//=>querySelectorAll<=!!!
	for(var i = 0; i < items_2.length; i++){
		items_2[i].onclick = activeItem_2;
	}
	function activeItem_2(e){//e - obj.ref. on current event with standart prop.(target/buttons/clientX/Y/layerX/Y)
		this.classList.toggle('item_2-active');
	}
	
	//Third(random/highlight)
	var items_3 = document.querySelectorAll('.items_3 .item_3');
	function activeItem_3(){
		this.classList.toggle('item_3-active');
	}
	setInterval(function(){
		var rand = mtRand(0, items_3.length - 1);
		activeItem_3.call(items_3[rand]);//вызов через call >>>> activeItem_3 в контексте текущего items_3[rand]
	},500);
	
	//Fourth(CALLBACK)
	var items_4 = document.querySelectorAll('.items_4 .item_4');
	for(var i = 0; i < items_4.length; i++){
		items_4[i].onclick = function(){
			fade(this,1000,function(){
				this.style.display = 'none';
			});//3й параметр CALLBACK 
		};
	}
}
//SIMPLE_TIMER
function Timer(time, elem){ 
	this.time = time;
	this.elem = elem;
	
	this.tick = function(){
		this.time --;
		this.elem.innerHTML = this.time;
	}
}
//RANDOM DIG.
function mtRand(min,max){//random случайного целого числа между min/max
	return (Math.floor(Math.random()*(max-min+1))+ min);		//Math.floor - возвращает округл. наибольшее целое число, кот меньше или равно данному числу // Math.Random() возвращает псевдослучайное число с плавающей запятой от 0 (включительно) до 1 (но не включая 1)
}
// FADE ELEM
function fade(elem, t, f){//f- callback funct
	var fps = 50;
	var time = t || 500;
	var steps = time / fps;
	var op = 1;
	var d0 = op / steps;
	var callback = f || function(){}	//наш CALLBACK
	
	var timer = setInterval(function(){
		op -= d0;
		elem.style.opacity = op;
		steps--;
		if(steps === 0){
			clearInterval(timer);
			callback.call(elem);					//ВЫЗОВ CALLBACK в контексте переданного элемента elem
		}
	},(1000/fps))
}




/*function activeItem(){
	this.classList.toggle('item-active');//classList => свойство элемента - объект доступный для чтения , toggle => если у тек.объекта класс есть, он его удалит. Если нет он его добавит.
}*/
/*
el.classList.length;
length: number, кол-во классов есть у элемента
add(): function, добавить класс к элементу
contains(): function, проверить, содержит ли элемент какой-либо класс
item(): function, узнать индекс интересующего класса в наборе классов элемента
remove(): function, удалить один из классов элемента
toggle(): function преключить класс (добавить, если его нет, или удалить, если он есть)
}
*/