const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 2),
	new Result("Ваш уровень выше среднего", 4),
	new Result("Вы в совершенстве знаете тему", 6)
];

//Массив с вопросами
const questions = 
[
	new Question("НАИБОЛЕЕ ИНФОРМАТИВНЫМ МЕТОДОМ ДИАГНОСТИКИ БРОНХОЭКТАТИЧЕСКОЙ БОЛЕЗНИ ЯВЛЯЕТСЯ", [
		new Answer("спирография", 0),
		new Answer("бронхография", 1),
		new Answer("флюорография", 0),
		new Answer("рентгеноскопия грудной клетки", 0)
	]),
	
	new Question("ДИАГНОСТИЧЕСКИМ МАРКЕРОМ ВИРУСНОГО ГЕПАТИТА А ЯВЛЯЕТСЯ НАЛИЧИЕ В СЫВОРОТКЕ КРОВИ", [
		new Answer("анти-HAV IgM", 1),
		new Answer("HBsAg", 0),
		new Answer("анти-HCV IgM", 0),
		new Answer("HBC Ag", 0)
	]),
	
	new Question("ПОЯВЛЕНИЕ БОЛИ ПРИ ПОКОЛАЧИВАНИИ РЕБРОМ ЛАДОНИ ПО РЕБЕРНОЙ ДУГЕ НАД ПЕЧЕНЬЮ ХАРАКТЕРНО ДЛЯ СИМПТОМА", [
		new Answer("Воскресенского", 0),
		new Answer("Ортнера", 1),
		new Answer("Ровзинга", 0),
		new Answer("Образцова", 0)
	]),
	
	new Question("КОЛИЧЕСТВО ТРОМБОЦИТОВ В ОБЩЕМ АНАЛИЗЕ КРОВИ В НОРМЕ (*10^9 В 1 Л)", [
		new Answer("180-240", 0),
		new Answer("120-320", 0),
		new Answer("120-240", 0),
		new Answer("180-320", 1)
	]),
	
	new Question("КЛАССИЧЕСКАЯ ТРИАДА СИМПТОМОВ, ХАРАКТЕРНЫХ ДЛЯ ВЫРАЖЕННОГО АОРТАЛЬНОГО СТЕНОЗА, ВКЛЮЧАЕТ", [
		new Answer("одышку, обмороки, стенокардию", 1),
		new Answer("тремор, отеки, одышку", 0),
		new Answer("одышку, артериальную гипертонию, обмороки", 0),
		new Answer("стенокардию, постуральную гипотензию, отеки", 0)
	]),
	
	new Question("ПРИ ОСМОТРЕ И ПАЛЬПАЦИИ ЖИВОТА ПАЦИЕНТ ДОЛЖЕН НАХОДИТЬСЯ В ПОЛОЖЕНИИ", [
		new Answer("лежа на спине с прямыми ногами", 0),
		new Answer("лежа на спине с согнутыми в коленных суставах ногами", 1),
		new Answer("в любом удобном для пациента положении", 0),
		new Answer("лежа на боку с прямыми ногами", 0)
	]),
	
	new Question("ЛАБОРАТОРНЫМ КРИТЕРИЕМ ЭФФЕКТИВНОСТИ ЛЕЧЕНИЯ ЖЕЛЧНОКАМЕННОЙ БОЛЕЗНИ ЯВЛЯЕТСЯ НОРМАЛИЗАЦИЯ УРОВНЯ В КРОВИ", [
		new Answer("глюкозы", 0),
		new Answer("щелочной фосфатазы", 1),
		new Answer("амилазы", 0),
		new Answer("мочевины", 0)
	]),
	
	new Question("АРТЕРИАЛЬНАЯ ГИПЕРТЕНЗИЯ ХАРАКТЕРНА ДЛЯ", [
		new Answer("тубулопатии", 0),
		new Answer("дисметаболической нефропатии", 0),
		new Answer("пиелонефрита", 0),
		new Answer("гломерулонефрита", 1)
	]),
	new Question("ОДЫШКА С ЗАТРУДНЕННЫМ ВЫДОХОМ НАЗЫВАЕТСЯ", [
		new Answer("инспираторная", 0),
		new Answer("атипичная", 0),
		new Answer("экспираторная", 1),
		new Answer("смешанная", 0)
	]),
	new Question("ИНСТРУМЕНТАЛЬНЫЙ МЕТОД, ДЛЯ ДИАГНОСТИКИ МОЧЕКАМЕННОЙ БОЛЕЗНИ", [
		new Answer("биопсия почек", 0),
		new Answer("внутривенная урография", 1),
		new Answer("обзорная рентгенография почек", 0),
		new Answer("УЗИ почек", 0)
	]),
	new Question("ПАЦИЕНТАМ С ТЕРМИНАЛЬНОЙ СТАДИЕЙ ОСТЕОАРТРОЗА НЕОБХОДИМО", [
		new Answer("хождение с тростью", 0),
		new Answer("введение глюкокортикостероидов в сустав", 0),
		new Answer("корригирующие остеотомии", 0),
		new Answer("эндопротезирование сустава", 1)
	]),
	new Question("ДЛЯ СНЯТИЯ ПРИСТУПА ПОЧЕЧНОЙ КОЛИКИ НЕОБХОДИМО ВВЕСТИ", [
		new Answer("дибазол", 0),
		new Answer("димедрол", 0),
		new Answer("но-шпу", 1),
		new Answer("лазикс", 0)
	]),
	new Question("ПРИ ОСТРОМ БРОНХИТЕ С ЛИХОРАДКОЙ ОБЯЗАТЕЛЬНЫМ МЕТОДОМ ДИАГНОСТИКИ ЯВЛЯЕТСЯ", [
		new Answer("рентгенография легких", 1),
		new Answer("общий анализ мокроты", 0),
		new Answer("исследование функции внешнего дыхания", 0),
		new Answer("ЭКГ", 0)
	]),
	new Question("ДЕФИЦИТ ПУЛЬСА ХАРАКТЕРЕН ДЛЯ", [
		new Answer("синусовой тахикардии", 0),
		new Answer("мерцательной аритмии", 1),
		new Answer("синусовой брадикардии", 0),
		new Answer("блокаде левой ножки пучка Гиса", 0)
	]),
	new Question("ВЕРХНЯЯ ОТНОСИТЕЛЬНАЯ ГРАНИЦА СЕРДЦА В НОРМЕ НАХОДИТСЯ", [
		new Answer("в третьем межреберье по левой окологрудинной линии", 1),
		new Answer("на 2 см кнаружи от правого края грудины", 0),
		new Answer("по правому краю грудины", 0),
		new Answer("на 2 см кнутри от левой срединоключичной линии", 0)
	]),
	new Question("ПОЗДНИЕ, «ГОЛОДНЫЕ», НОЧНЫЕ БОЛИ ХАРАКТЕРНЫ ДЛЯ", [
		new Answer("хронического колита", 0),
		new Answer("хронического энтерита", 0),
		new Answer("язвенной болезни желудка", 0),
		new Answer("язвенной болезни 12-перстной кишки", 1)
	]),
	new Question("МЕЛЕНА ПРЕДСТАВЛЯЕТ СОБОЙ", [
		new Answer("стул по типу «болотной тины»", 0),
		new Answer("стул по типу «рисового отвара»", 0),
		new Answer("стул по типу «малинового желе»", 0),
		new Answer("дегтеобразный стул", 1)
		]),
		new Question("ТИП НАСЛЕДОВАНИЯ ГЕМОФИЛИИ", [
		new Answer("сцепленный с X-хромосомой", 1),
		new Answer("аутосомно-рецессивный", 0),
		new Answer("сцепленный с Y-хромосомой", 0),
		new Answer("аутосомно-доминантный", 0)
		]),
		new Question("О КАКОМ ЗАБОЛЕВАНИИ СЛЕДУЕТ ПОДУМАТЬ,ЕСЛИ У ПАЦИЕНТА ВЫЯВЛЕН НИЗКИЙ УДЕЛЬНЫЙ ВЕС МОЧИ (1001-1003)", [
		new Answer("несахарный диабет", 1),
		new Answer("гломерулонефрит", 0),
		new Answer("сахарный диабет", 0),
		new Answer("пиелонефрит", 0)
		]),
		new Question("КОЛИЧЕСТВО СЕРДЕЧНЫХ СОКРАЩЕНИЙ ЗА ОДНУ МИНУТУ В НОРМЕ У ВЗРОСЛОГО ЧЕЛОВЕКА СОСТАВЛЯЕТ", [
		new Answer("40-60", 0),
		new Answer("60-80", 1),
		new Answer("90-100", 0),
		new Answer("50-60", 0)
		]),
		new Question("СОБИРАТЬ МОЧУ НА ПОСЕВ РЕКОМЕНДУЕТСЯ МЕТОДОМ", [
		new Answer("из суточной мочи", 0),
		new Answer("из анализа мочи по Нечипоренко", 0),
		new Answer("при катетеризации мочевого пузыря", 0),
		new Answer("из средней струи в стерильную посуду", 1)
		]),
		new Question("МЕТОДОМ РАННЕЙ ДИАГНОСТИКИ ТУБЕРКУЛЕЗА ЛЕГКИХ ЯВЛЯЕТСЯ", [
		new Answer("бронхография", 0),
		new Answer("спирография", 0),
		new Answer("бронхоскопия", 0),
		new Answer("флюорография", 1)
		]),
		new Question("СИМПТОМЫ «БАРАБАННЫЕ ПАЛОЧКИ» И «ЧАСОВЫЕ СТЕКЛА» ЯВЛЯЮТСЯ ПРИЗНАКАМИ", [
		new Answer("острой интоксикации", 0),
		new Answer("острой гипоксии", 0),
		new Answer("хронической интоксикации", 0),
		new Answer("хронической гипоксии", 1)
		]),
		new Question("ПРИ ОБОСТРЕНИИ ХРОНИЧЕСКОГО ПАНКРЕАТИТА ПОКАЗАНО", [
		new Answer("голодание", 1),
		new Answer("морфин", 0),
		new Answer("диета № 15", 0),
		new Answer("тепловые процедуры", 0)
]),new Question("СУБФЕБРИЛЬНАЯ ЛИХОРАДКА ХАРАКТЕРИЗУЕТСЯ ТЕМПЕРАТУРОЙ ", [
	new Answer("37,1-37,9°С", true),
	new Answer("37,0-37,2°С", false),
	new Answer("37,2-37,5°С", false),
	new Answer("37,0-37,5°С", false)
	]),
	new Question("ПРЕОБЛАДАНИЕ НОЧНОГО ДИУРЕЗА НАД ДНЕВНЫМ МОЖЕТ СВИДЕТЕЛЬСТВОВАТЬ О РАЗВИТИИ ", [
	new Answer("панкреатита", false),
	new Answer("острой почечной недостаточности", false),
	new Answer("хронической почечной недостаточности", true),
	new Answer("холецистита", false)
	]),
	new Question("ПОКАЗАТЕЛЯМИ ТЯЖЕСТИ ПНЕВМОНИИ ЯВЛЯЮТСЯ ", [
	new Answer("гепатоспленомегалия", false),
	new Answer("локализованные хрипы", false),
	new Answer("степень дыхательной недостаточности", true),
	new Answer("кашель", false)
	]),
	new Question("ПРИ ГИПЕРТОНИЧЕСКИ-ГИПЕРКИНЕТИЧЕСКОМ ТИПЕ ДИСКИНЕЗИИ ЖЕЛЧЕВЫВОДЯЩИХ ПУТЕЙ ДЛЯ КУПИРОВАНИЯ БОЛИ ЭФФЕКТИВНЫ ", [
	new Answer("спазмолитики", true),
	new Answer("антибиотики", false),
	new Answer("нитрофураны", false),
	new Answer("сульфаниламиды", false)
	]),
	new Question("НАИБОЛЕЕ ТИПИЧНЫМ ПРИЗНАКОМ АТОПИЧЕСКОГО ДЕРМАТИТА ЯВЛЯЕТСЯ ", [
	new Answer("зуд", true),
	new Answer("гипертермия", false),
	new Answer("диарея", false),
	new Answer("анорексия", false)
	]),
	new Question("СИМПТОМ «УТРЕННЯЯ СКОВАННОСТЬ» В СУСТАВАХ ХАРАКТЕРНА ДЛЯ ", [
	new Answer("ревматоидного артрита", true),
	new Answer("ревматического артрита", false),
	new Answer("деформирующего остеоартроза", false),
	new Answer("подагры", false)
	]),
	new Question("ПОКАЗАНИЕМ К ГОСПИТАЛИЗАЦИИ ЯВЛЯЕТСЯ ", [
	new Answer("стабильная стенокардия напряжения 1 функционального класса", false),
	new Answer("стабильная стенокардия напряжения 2 функционального класса", false),
	new Answer("стабильная стенокардияв сочетании с экстрасистолией", false),
	new Answer("впервые возникшая стенокардия напряжения", true)
	]),
	new Question("КРОВОХАРКАНЬЕ ЯВЛЯЕТСЯ ПРИЗНАКОМ ", [
	new Answer("стенокардии", false),
	new Answer("долевой пневмонии", true),
	new Answer("острого бронхита", false),
	new Answer("острого инфаркта миокарда", false)
	]),
	new Question("СИМПТОМЫ, ХАРАКТЕРНЫЕ ДЛЯ ЖЕЛЕЗОДЕФИЦИТНОЙ АНЕМИИ", [
		new Answer("бледность кожи, глоссит, нарушение чувствительности", 0),
		new Answer("бледность кожи, кровоизлияния, лихорадка", 0),
		new Answer("бледность кожи, кровоточивость, лихорадка, увеличение лимфоузлов", 0),
		new Answer("бледность кожи, трофические расстройства, извращение вкуса, одышка", 1)
		]),
		new Question("ПРИ ПЕЧЕНОЧНОЙ КОЛИКЕ СЛЕДУЕТ ПРИМЕНЯТЬ", [
		new Answer("но-шпа, баралгин", 1),
		new Answer("мезатон, лазикс", 0),
		new Answer("кордиамин,валидол", 0),
		new Answer("гепарин, димедрол", 0)
		]),
		new Question("СТЕПЕНЬ ПРОХОДИМОСТИ КОРОНАРНЫХ СОСУДОВ ОПРЕДЕЛЯЮТ МЕТОДОМ", [
		new Answer("обзорная рентгенография органов грудной клетки", 0),
		new Answer("электрокардиография", 0),
		new Answer("ангиография", 1),
		new Answer("фонокардиография", 0)
		]),
		new Question("ДЛЯ МЕСТНОЙ ОБРАБОТКИ КОЖИ ПРИ ПУЗЫРЧАТКЕ ИСПОЛЬЗУЮТ РАСТВОР", [
		new Answer("1% спиртовой бриллиантового зеленого", 1),
		new Answer("фурацилина 1:5000", 0),
		new Answer("3% перекиси водорода", 0),
		new Answer("5% раствор йода", 0)
		]),
		new Question("ВЕРХНЯЯ ГРАНИЦА ЛЕГКИХ СПЕРЕДИ ОПРЕДЕЛЯЕТСЯ НА", [
		new Answer("1-2 см выше ключицы", 0),
		new Answer("3-4 см ниже ключицы", 0),
		new Answer("1-2 см ниже ключицы", 0),
		new Answer("3-4 см выше ключицы", 1)
		]),
		new Question("ЛЕЧЕНИЕ САХАРНОГО ДИАБЕТА 1 ТИПА В ПЕРВУЮ ОЧЕРЕДЬ ПРЕДУСМАТРИВАЕТ НАЗНАЧЕНИЕ", [
		new Answer("диеты", 0),
		new Answer("инсулина", 1),
		new Answer("пероральных сахароснижающих препаратов", 0),
		new Answer("физических нагрузок", 0)
		]),
		new Question("ДЛЯ КУПИРОВАНИЯ ПРИСТУПА СТЕНОКАРДИИ ПРИ СОПУТСТВУЮЩЕЙ БРОНХИАЛЬНОЙ АСТМЕ ПОКАЗАН", [
		new Answer("пропранолол", 0),
		new Answer("эуфиллин", 0),
		new Answer("нифедипин", 1),
		new Answer("кеторалак", 0)
		]),
		new Question("ЗА 3 ДНЯ ИСКЛЮЧАЮТ ИЗ ПИТАНИЯ ПАЦИЕНТА ЖЕЛЕЗОСОДЕРЖАЩИЕ ПРОДУКТЫ ПРИ ПОДГОТОВКЕ К", [
		new Answer("УЗИ брюшной полости", 0),
		new Answer("анализ кала на скрытую кровь", 1),
		new Answer("рентгенография желудка", 0),
		new Answer("анализ кала на копрологическое исследование", 0)
		]),
		new Question("КРИТЕРИЕМ ЭФФЕКТИВНОСТИ ЛЕЧЕНИЯ КЕТОАЦИДОЗА ЯВЛЯЕТСЯ",
			[
				new Answer("восстановление сердечно сосудистой деятельности", 0),
				new Answer("устранение дыхательной недостаточности", 0),
				new Answer("уменьшение признаков отека мозга", 0),
				new Answer("ликвидация ацидоза", 1)
			]),
			
			new Question("ЭКГ-ПРИЗНАКОМ ПОЛНОЙ АТРИОВЕНТРИКУЛЯРНОЙ БЛОКАДЫ ЯВЛЯЕТСЯ",
			[
				new Answer("удлинение интервала QТ", 0),
				new Answer("удлинение интервала PQ", 0),
				new Answer("отсутствие связи между зубцом Р и комплексом QRS", 1),
				new Answer("уширение комплекса QRS", 0)
			]),
			
			new Question("РАЗВИТИЕ ТОЛЕРАНТНОСТИ ВОЗМОЖНО ПРИ ДЛИТЕЛЬНОМ ПРИЕМЕ",
			[
				new Answer("ингибиторов АПФ", 0),
				new Answer("бета-адреноблокаторов", 0),
				new Answer("нитратов", 1),
				new Answer("антагонистов кальция", 0)
			]),
			
			new Question("ЗНАЧЕНИЕ СОЭ В НОРМЕ У ЖЕНЩИН",
			[
				new Answer("2-15 мм/ч", 1),
				new Answer("2-10 мм/ч", 0),
				new Answer("2-8 мм/ч", 0),
				new Answer("2-6 мм/ч", 0)
			]),
			
			new Question("ДЛЯ ЖЕЛЕЗОДЕФИЦИТНОЙ АНЕМИИ ХАРАКТЕРНО",
			[
				new Answer("лейкоцитоз", 0),
				new Answer("отсутствие ретикулоцитов", 0),
				new Answer("повышение цветового показателя", 0),
				new Answer("снижение цветового показателя", 1)
			]),
			
			new Question("ПЕРИОДЫ РАЗВИТИЯ ИНФЕКЦИОННОЙ БОЛЕЗНИ",
			[
				new Answer("латентный, разгара, выздоровления", 0),
				new Answer("инкубационный, латентный, разгара, выздоровления", 0),
				new Answer("начальный, разгара, выздоровления", 0),
				new Answer("инкубационный, начальный, разгара, выздоровления", 1)
			]),
			
			new Question("МОЧУ СОБИРАЮТ В ТЕЧЕНИЕ СУТОК ДЛЯ ОПРЕДЕЛЕНИЯ",
			[
				new Answer("ацетона", 0),
				new Answer("глюкозы", 1),
				new Answer("эритроцитов", 0),
				new Answer("цилиндров", 0)
			]),
			
			new Question("ПОКАЗАНИЕМ К ГОСПИТАЛИЗАЦИИ ПРИ СТЕНОКАРДИИ ЯВЛЯЕТСЯ",
			[
				new Answer("стабильная стенокардия 3 ФК", 0),
				new Answer("стабильная стенокардия 1 ФК", 0),
				new Answer("прогрессирующая стенокардия", 1),
				new Answer("стабильная стенокардия 2 ФК", 0)
			]),
			
			new Question("КОНТРОЛЬ ЭФФЕКТИВНОСТИ ЛЕЧЕНИЯ ОБОСТРЕНИЯ ХРОНИЧЕСКОГО ПАНКРЕАТИТА ОСУЩЕСТВЛЯЕТСЯ ОПРЕДЕЛЕНИЕМ УРОВНЯ",
			[
				new Answer("мочевой кислоты", 0),
				new Answer("трансаминаз крови", 0),
				new Answer("амилазы в крови и моче", 1),
				new Answer("щелочной фосфатазы", 0)
			]),
			
			new Question("ПРОБА ПО ЗИМНИЦКОМУ ПОЗВОЛЯЕТ ВЫЯВИТЬ",
			[
				new Answer("уратурию", 0),
				new Answer("кальцийурию", 0),
				new Answer("никтурию", 1),
				new Answer("оксалурию", 0)
			])
		
	
							
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 4000);
}