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
	new Question("ОСТРЫЙ ОБСТРУКТИВНЫЙ БРОНХИТ ХАРАКТЕРИЗУЕТСЯ ", 
	[
		new Answer("экспираторной одышкой ", 1),
		new Answer("инспираторной одышкой ", 0),
		new Answer("притуплением перкуторного звука ", 0),
		new Answer("влажными мелкопузырчатыми хрипами", 0)
	]),

	new Question("НАИБОЛЕЕ ХАРАКТЕРНЫМ ПОБОЧНЫМ ЭФФЕКТОМ ПРИ НАЗНАЧЕНИИ ИНГИБИТОРОВ АПФ ЯВЛЯЕТСЯ ", 
	[
		new Answer("сухой кашель", 1),
		new Answer("головная боль ", 0),
		new Answer("повышение артериального давления ", 0),
		new Answer("отеки на ногах", 0)
	]),

	new Question("ПРИ ЛЕЧЕНИИ АТЕРОСКЛЕРОЗА ИЗ РАЦИОНА ПАЦИЕНТА ИСКЛЮЧАЮТ ПРОДУКТЫ, БОГАТЫЕ ", 
	[
		new Answer("холестерином", 1),
		new Answer("витамином С ", 0),
		new Answer("калием", 0),
		new Answer("железом", 0)
	]),

	new Question("ЭНДОСКОПИЧЕСКОЕ ИССЛЕДОВАНИЕ СОСУДОВ - ЭТО ", 
	[
		new Answer("ангиоскопия", 1),
		new Answer("колоноскопия", 0),
		new Answer("гастроскопия", 0),
		new Answer("ирригоскопия", 0)
	]),

	new Question("МОКРОТУ ДЛЯ БАКТЕРИОЛОГИЧЕСКОГО ИССЛЕДОВАНИЯ СОБИРАЮТ В ", 
	[
		new Answer("сухую банку ", 0),
		new Answer("стерильную пробирку ", 0),
		new Answer("сухую пробирку ", 0),
		new Answer("стерильную емкость", 1)
	]),

	new Question("ОСМОТР СЛИЗИСТОЙ ОБОЛОЧКИ ТОЛСТОЙ КИШКИ С ПОМОЩЬЮ ФИБРОСКОПА ", 
	[
		new Answer("ирригоскопия", 0),
		new Answer("эзофагоскопия", 0),
		new Answer("лапароскопия", 1),
		new Answer("колоноскопия", 0)
	]),

	new Question("В КАЧЕСТВЕ ЭТИОТРОПНОЙ ТЕРАПИИ ПРИ ОСТРОМ ГЛОМЕРУЛОНЕФРИТЕ ПРИМЕНЯЮТ", 
		[
			new Answer("дибазол", 0),
			new Answer("аналгин", 0),
			new Answer("амоксициллин", 1),
			new Answer("лазикс", 0)
		]),

	new Question("ДЛЯ СИНДРОМА ЦИТОЛИЗА ПРИ ОСТРОМ ПОВРЕЖДЕНИИ ПЕЧЕНИ ХАРАКТЕРНО", 
		[
			new Answer("снижение уровня альбуминов", 0),
			new Answer("снижение уровня билирубина", 0),
			new Answer("повышение уровня щелочной фосфотазы", 0),
			new Answer("повышение активности АЛТ, АСТ", 1)
		]),
	new Question("ДРЕНАЖНОЕ ПОЛОЖЕНИЕ ПРИДАЕТСЯ ПАЦИЕНТУ ДЛЯ", 
		[
			new Answer("улучшения отхождения мокроты", 1),
			new Answer("расширения бронхов", 0),
			new Answer("снижения лихорадки", 0),
			new Answer("уменьшения одышки", 0)
		]),
	new Question("ПРИ ПИЕЛОНЕФРИТЕ ПОРАЖАЕТСЯ", 
		[
			new Answer("клубочковый аппарат почек", 0),
			new Answer("слизистая мочевого пузыря", 0),
			new Answer("корковое и мозговое вещество почек", 0),
			new Answer("чашечно-лоханочный аппарат почек", 1)
		]),
	new Question("ПАТОГЕНЕТИЧЕСКАЯ ТЕРАПИЯ ПРИ ОСТРОЙ РЕВМАТИЧЕСКОЙ ЛИХОРАДКЕ ПРОВОДИТСЯ ПРЕПАРАТАМИ ФАРМАКОЛОГИЧЕСКОЙ ГРУППЫ", 
		[
			new Answer("антибиотики", 0),
			new Answer("диуретики", 0),
			new Answer("нестероидные противовоспалительные средства", 1),
			new Answer("гипотензивные", 0)
		]),
	new Question("ПРИЕМ НИТРОПРЕПАРАТОВ МОЖЕТ СОПРОВОЖДАТЬСЯ", 
		[
			new Answer("поносом", 0),
			new Answer("потливостью", 0),
			new Answer("тошнотой", 0),
			new Answer("головной болью", 1)
		]),
	new Question("ДЛЯ БРОНХИАЛЬНОЙ АСТМЫ ХАРАКТЕРНО В МОКРОТЕ НАЛИЧИЕ", 
		[
			new Answer("эритроцитов", 0),
			new Answer("атипичных клеток", 0),
			new Answer("лейкоцитов", 0),
			new Answer("спиралей Куршмана, эозинофилов", 1)
		]),
	new Question("КРОВОТОЧИВОСТЬ ПРИ ГЕМОФИЛИИ ОБУСЛОВЛЕНА", 
		[
			new Answer("патологией сосудистой стенки", 0),
			new Answer("эндотелиальной дисфункцией", 0),
			new Answer("дефицитом плазменных факторов свертывания крови", 1),
			new Answer("нарушением сосудисто-тромбоцитарного звена гемостаза", 0)
		]),
	new Question("ПАЦИЕНТАМ С ХРОНИЧЕСКИМ БРОНХИТОМ ПОКАЗАНО", 
		[
			new Answer("ингаляция муколитиков", 1),
			new Answer("ультразвуковая терапия", 0),
			new Answer("грязелечение", 0),
			new Answer("диадинамотерапия", 0)
		]),

		new Question("НЕСПЕЦИФИЧЕСКАЯ ПРОФИЛАКТИКА СТОЛБНЯКА ВКЛЮЧАЕТ ", 
			[
				new Answer("первичную хирургическую обработку раны с широким рассечением и дренированием ее ", 1),
				new Answer("массивную антибиотикотерапию ", 0),
				new Answer("наложение швов на рану ", 0),
				new Answer("гемосорбцию", 0)
			]),

		new Question("АНТИГИПЕРТЕНЗИВНОЕ СРЕДСТВО ЦЕНТРАЛЬНОГО ДЕЙСТВИЯ", 
			[
				new Answer("эналаприл", 0),
				new Answer("моксонидин", 1),
				new Answer("лозартан", 0),
				new Answer("амлодипин", 0)
			]),
		new Question("ТЮБАЖ ПРИМЕНЯЮТ С ЦЕЛЬЮ", 
			[
				new Answer("обезболивания", 0),
				new Answer("уменьшения оттока желчи", 0),
				new Answer("увеличения оттока желчи", 1),
				new Answer("уменьшения воспаления", 0)
			]),
		new Question("ПРИ ПРИСТУПЕ ПОЧЕЧНОЙ КОЛИКИ НЕОБХОДИМО ПРИМЕНЯТЬ", 
			[
				new Answer("лазикс", 0),
				new Answer("дибазол", 0),
				new Answer("но-шпу", 1),
				new Answer("димедрол", 0)
			]),
		new Question("ДЛЯ ОПРЕДЕЛЕНИЯ СУММАРНОГО СЕРДЕЧНО-СОСУДИСТОГО РИСКА ПО ШКАЛЕ SCORE НЕОБХОДИМО ЗНАТЬ ВОЗРАСТ, ПОЛ ЧЕЛОВЕКА И", 
			[
				new Answer("только курит человек или нет", 0),
				new Answer("уровень общего холестерина, уровень систолического (верхнего) артериального давления, а также курит человек или нет", 1),
				new Answer("уровень диастолического (нижнего) артериального давления", 0),
				new Answer("только уровень общего холестерина", 0)
			]),
		new Question("СУММАРНЫЙ СЕРДЕЧНО-СОСУДИСТЫЙ РИСК ПО ШКАЛЕ SCORE СЧИТАЕТСЯ ОЧЕНЬ ВЫСОКИМ ПРИ ВЕЛИЧИНЕ", 
			[
				new Answer("менее 1%", 0),
				new Answer("≥ 5% до 10%", 0),
				new Answer("в пределах ≥ 1% до 5%", 0),
				new Answer("≥ 10%", 1)
			]),
		new Question("ПРЕОБЛАДАНИЕ НОЧНОГО ДИУРЕЗА НАД ДНЕВНЫМ ХАРАКТЕРНО ДЛЯ", 
			[
				new Answer("никтурии", 1),
				new Answer("полиурии", 0),
				new Answer("олигурии", 0),
				new Answer("ишурии", 0)
			]),
		new Question("ПРИСТУП СИЛЬНОЙ БОЛИ В ПОЯСНИЦЕ С ИРРАДИАЦИЕЙ ПО ХОДУ МОЧЕТОЧНИКА В ПАХОВУЮ ОБЛАСТЬ НАБЛЮДАЕТСЯ ПРИ", 
			[
				new Answer("мочекаменной болезни", 1),
				new Answer("цистите", 0),
				new Answer("гломерулонефрите", 0),
				new Answer("пиелонефрите", 0)
			]),
		new Question("ДИАГНОСТИЧЕСКИМ МАРКЕРОМ ВИРУСНОГО ГЕПАТИТА В ЯВЛЯЕТСЯ НАЛИЧИЕ В СЫВОРОТКЕ КРОВИ", 
			[
				new Answer("анти-HAV IgM", 0),
				new Answer("анти-HAV IgG", 0),
				new Answer("HBC Ag", 0),
				new Answer("HBsAg", 1)
			]),

			new Question("РЕНАЛЬНАЯ СИМПТОМАТИКА ПРИ НЕФРОТИЧЕСКОМ СИНДРОМЕ С МИНИМАЛЬНЫМИ МОРФОЛОГИЧЕСКИМИ ИЗМЕНЕНИЯМИ ХАРАКТЕРИЗУЕТСЯ", 
				[
					new Answer("глюкозуpией", 0),
					new Answer("макрогематурией", 0),
					new Answer("массивной протеинурией", 1),
					new Answer("лейкоцитуpией", 0)
				]),
			new Question("БЕЗ СПЕЦИАЛЬНОЙ ПОДГОТОВКИ МОЖНО ПРОВОДИТЬ РЕНТГЕНОЛОГИЧЕСКОЕ ИССЛЕДОВАНИЕ", 
				[
					new Answer("костей", 1),
					new Answer("кишечника", 0),
					new Answer("желудка", 0),
					new Answer("почек", 0)
				]),
			new Question("ДЛЯ КУПИРОВАНИЯ ПРИСТУПА БРОНХИАЛЬНОЙ АСТМЫ НАЗНАЧАЮТ", 
				[
					new Answer("преднизолон", 1),
					new Answer("фуросемид", 0),
					new Answer("промедол", 0),
					new Answer("клонидин (клофелин)", 0)
				]),
			new Question("КРИТЕРИЕМ ЭФФЕКТИВНОСТИ ЛЕЧЕНИЯ ПИЕЛОНЕФРИТА ЯВЛЯЕТСЯ", 
				[
					new Answer("умеренная гематурия", 0),
					new Answer("умеренная протеинурия", 0),
					new Answer("отсутствие бактериурии", 1),
					new Answer("повышение артериального давления", 0)
				]),
			new Question("АУСКУЛЬТАТИВНЫЕ ПРИЗНАКИ ОСТРОГО БРОНХИТА", 
				[
					new Answer("бронхиальное дыхание", 0),
					new Answer("шум трения плевры", 0),
					new Answer("сухие хрипы", 1),
					new Answer("крепитацию", 0)
				]),
			new Question("ПРИ ЦИСТОГРАФИИ КОНТРАСТ ВВОДИТСЯ", 
				[
					new Answer("перорально", 0),
					new Answer("внутривенно", 0),
					new Answer("через катетер в мочевой пузырь", 1),
					new Answer("внутримышечно", 0)
				]),
			new Question("КОНТРОЛЬ ЗА СОСТОЯНИЕМ ПАЦИЕНТА ПРИ ОСТРОМ ГЛОМЕРУЛОНЕФРИТЕ ВКЛЮЧАЕТ", 
				[
					new Answer("одышки", 0),
					new Answer("диуреза", 1),
					new Answer("головной боли", 0),
					new Answer("стула", 0)
				]),
			new Question("КОЛИЧЕСТВО ЭРИТРОЦИТОВ В ОБЩЕМ АНАЛИЗЕ КРОВИ В НОРМЕ У МУЖЧИН (*10^12/Л)", 
				[
					new Answer("4,5-5,0", 1),
					new Answer("6,0-8,0", 0),
					new Answer("8,0-9,0", 0),
					new Answer("4,5-6,0", 0)
				]),
		
				new Question("СЖИМАЮЩИЕ БОЛИ ЗА ГРУДИНОЙ, ИРРАДИИРУЮЩИЕ ПОД ЛЕВУЮ ЛОПАТКУ, ПРОДОЛЖИТЕЛЬНОСТЬЮ 5-10 МИНУТ, ХАРАКТЕРНЫ ДЛЯ", 
					[
						new Answer("стенокардии", 1),
						new Answer("инфекционного эндокардита", 0),
						new Answer("инфаркта миокарда", 0),
						new Answer("гипертонического криза", 0)
					]),
				new Question("ЭНДОСКОПИЧЕСКИЙ МЕТОД ИССЛЕДОВАНИЯ ПИЩЕВОДА", 
					[
						new Answer("ирригоскопия", 0),
						new Answer("гастроскопия", 0),
						new Answer("колоноскопия", 0),
						new Answer("эзофагоскопия", 1)
					]),
				new Question("НАИБОЛЕЕ ИНФОРМАТИВНЫМ ИССЛЕДОВАНИЕМ ПРИ ГАСТРИТЕ ЯВЛЯЕТСЯ", 
					[
						new Answer("эндоскопия с биопсией", 1),
						new Answer("иридодиагностика", 0),
						new Answer("копрограмма", 0),
						new Answer("рентгеноконтрастное исследование", 0)
					]),
				new Question("ОСТРЫЙ ОБСТРУКТИВНЫЙ БРОНХИТ ХАРАКТЕРИЗУЕТСЯ", 
					[
						new Answer("инспираторной одышкой", 0),
						new Answer("свистящими хрипами", 1),
						new Answer("притуплением перкуторного звука", 0),
						new Answer("влажными мелкопузырчатыми хрипами", 0)
					]),
				new Question("В ЛЕЧЕНИИ ХРОНИЧЕСКОГО ВИРУСНОГО ГЕПАТИТА ОСНОВНОЙ ГРУППОЙ ЛЕКАРСТВЕННЫХ ПРЕПАРАТОВ ЯВЛЯЮТСЯ", 
					[
						new Answer("ферментные", 0),
						new Answer("противовирусные", 1),
						new Answer("антибиотики", 0),
						new Answer("гепатопротекторы", 0)
					]),
				new Question("СПЕЦИФИЧЕСКИЙ СИМПТОМ ЗАБОЛЕВАНИЙ ЛЕГКИХ", 
					[
						new Answer("общая слабость", 0),
						new Answer("кашель", 1),
						new Answer("насморк", 0),
						new Answer("лихорадка", 0)
					]),
				new Question("ФАКТОРЫ РИСКА БРОНХИАЛЬНОЙ АСТМЫ", 
					[
						new Answer("частые прогулки", 0),
						new Answer("аллергическая настроенность", 1),
						new Answer("рациональное питание", 0),
						new Answer("здоровый образ жизни", 0)
					]),
				new Question("ТРИАДА СИМПТОМОВ ПРИ ОСТРОМ ГЛОМЕРУЛОНЕФРИТЕ", 
					[
						new Answer("пиурия, бактериурия, гипертония", 0),
						new Answer("лейкоцитурия, цилиндрурия, отеки", 0),
						new Answer("гематурия, отеки, гипертония", 1),
						new Answer("гематурия, бактериурия, отеки", 0)
					]),

					new Question("РЖАВЫЙ ХАРАКТЕР МОКРОТЫ НАБЛЮДАЕТСЯ ПРИ", 
						[
							new Answer("ОРВИ", 0),
							new Answer("бронхиальной астме", 0),
							new Answer("остром бронхите", 0),
							new Answer("крупозной пневмонии", 1)
						]),
					new Question("В ЛЕЧЕНИИ ГИПОКИНЕТИЧЕСКОЙ ФОРМЫ ДИСКИНЕЗИИ ЖЕЛЧНОГО ПУЗЫРЯ ИСПОЛЬЗУЮТ", 
						[
							new Answer("спазмолитики", 0),
							new Answer("холекинетики", 1),
							new Answer("антациды", 0),
							new Answer("ингибиторы протоновой помпы", 0)
						]),
					new Question("ПРИ ОТСУТСТВИИ ЭФФЕКТА ОТ ПОВТОРНОГО ВВЕДЕНИЯ ДЛЯ КУПИРОВАНИЯ ПРИСТУПА БРОНХИАЛЬНОЙ АСТМЫ β-АДРЕНОМИМЕТИКОВ ЧЕРЕЗ 15-30 МИНУТ СЛЕДУЕТ ПРИСТУПИТЬ К ВНУТРИВЕННОМУ ВВЕДЕНИЮ", 
						[
							new Answer("преднизолона", 1),
							new Answer("папаверина", 0),
							new Answer("но-шпы", 0),
							new Answer("супрастина", 0)
						]),
					new Question("ВЕДУЩИМ ФАКТОРОМ РИСКА РАЗВИТИЯ БОЛЕЗНЕЙ ОРГАНОВ ДЫХАНИЯ ЯВЛЯЕТСЯ", 
						[
							new Answer("неправильное питание", 0),
							new Answer("курение", 1),
							new Answer("воздействие аллергенов", 0),
							new Answer("профессиональные вредности", 0)
						]),
					new Question("ПРИ ГЛОМЕРУЛОНЕФРИТЕ ПОРАЖАЕТСЯ", 
						[
							new Answer("чашечно-лоханочный аппарат почек", 0),
							new Answer("клубочковый аппарат почек", 1),
							new Answer("слизистая мочевого пузыря", 0),
							new Answer("интерстиций ткани почек", 0)
						]),
					new Question("НАИБОЛЕЕ ЧАСТЫМ ОСЛОЖНЕНИЕМ ТЕРАПИИ НЕСТЕРОИДНЫМИ ПРОТИВОВОСПАЛИТЕЛЬНЫМИ ПРЕПАРАТАМИ ЯВЛЯЕТСЯ", 
						[
							new Answer("снижение артериального давления", 0),
							new Answer("брадикардия", 0),
							new Answer("повышение температуры тела", 0),
							new Answer("желудочно-кишечное кровотечение", 1)
						]),
					new Question("ГЕМАРТРОЗ ЯВЛЯЕТСЯ ХАРАКТЕРНЫМ ПРИЗНАКОМ", 
						[
							new Answer("ревматоидного артрита", 0),
							new Answer("гемофилии", 1),
							new Answer("ревматизма", 0),
							new Answer("геморрагического васкулита", 0)
						]),
					new Question("СИМПТОМЫ, ХАРАКТЕРНЫЕ ДЛЯ ЛЕКАРСТВЕННОЙ АЛЛЕРГИИ", 
						[
							new Answer("стоматит, гингивит, глоссит", 0),
							new Answer("боль в животе", 0),
							new Answer("сыпь, отеки, кожный зуд", 1),
							new Answer("лихорадка", 0)
						]),
					new Question("ХАРАКТЕРНЫЕ ПРИЗНАКИ ИНФЕКЦИОННЫХ ЗАБОЛЕВАНИЙ", 
						[
							new Answer("специфичность этиологического агента, цикличность течения, формирования иммунитета", 1),
							new Answer("имеют обязательную сезонность", 0),
							new Answer("источник инфекции - больной человек", 0),
							new Answer("всегда протекает в тяжелой форме", 0)
						]),

						new Question("ДЛЯ ЛЕВОЖЕЛУДОЧКОВОЙ НЕДОСТАТОЧНОСТИ ХАРАКТЕРНЫ", 
							[
								new Answer("приступы удушья с затрудненным выдохом", 0),
								new Answer("дыхание Чейн-Стокса", 0),
								new Answer("дыхание Куссмауля", 0),
								new Answer("приступы удушья с затрудненным вдохом", 1)
							]),
						

							
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