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
	new Question("НАИБОЛЕЕ ЧАСТЫМ ВОЗБУДИТЕЛЕМ ИНФЕКЦИОННОГО ЭНДОКАРДИТА ЯВЛЯЕТСЯ:", 
		[
			new Answer("Граммотрицательная микрофлора", 0),
			new Answer("Вирусы", 0),
			new Answer("Граммположительная микрофлора", 1),
			new Answer("Грибы", 0)
		]),
	
	new Question("ДЛИТЕЛЬНОСТЬ ЛЕЧЕНИЯ АНТИБИОТИКАМИ ПРИ ИНФЕКЦИОННОМ ЭНДОКАРДИТЕ, КАК ПРАВИЛО, СОСТАВЛЯЕТ:", 
		[
			new Answer("2 недели или меньше", 0),
			new Answer("4-6 недель", 1),
			new Answer("8-10 недель", 0),
			new Answer("более 10 недель", 0)
		]),
	
	new Question("ОСНОВНАЯ ПРИЧИНА РАЗВИТИЯ ОСТРОГО БРОНХИТА:", 
		[
			new Answer("алкоголизм", 0),
			new Answer("курение", 0),
			new Answer("ОРВИ", 1),
			new Answer("переохлаждение", 0)
		]),
	
	new Question("ОСНОВНАЯ ПРИЧИНА РАЗВИТИЯ ХРОНИЧЕСКОГО БРОНХИТА:", 
		[
			new Answer("курение", 1),
			new Answer("ОРВИ", 0),
			new Answer("переохлаждение", 0),
			new Answer("гиповитаминоз", 0)
		]),
	
	new Question("ОСНОВНАЯ ЖАЛОБА ПАЦИЕНТА ПРИ ОБСТРУКТИВНОМ БРОНХИТЕ:", 
		[
			new Answer("повышение температуры", 0),
			new Answer("головная боль", 0),
			new Answer("одышка", 1),
			new Answer("слабость", 0)
		]),
	
	new Question("ДАННЫЕ АУСКУЛЬТАЦИИ ПРИ БРОНХИТЕ:", 
		[
			new Answer("бронхиальное дыхание", 0),
			new Answer("крепитация", 0),
			new Answer("сухие и влажные хрипы", 1),
			new Answer("шум трения плевры", 0)
		]),
	
	new Question("ПРИ ОСТРОМ БРОНХИТЕ ОТМЕЧАЕТСЯ КАШЕЛЬ С МОКРОТОЙ:", 
		[
			new Answer("розовой пенистой", 0),
			new Answer("«ржавой»", 0),
			new Answer("слизистой", 1),
			new Answer("стекловидной", 0)
		]),
	
	new Question("ОСЛОЖНЕНИЕ ХРОНИЧЕСКОГО БРОНХИТА:", 
		[
			new Answer("абсцесс легкого", 0),
			new Answer("плеврит", 0),
			new Answer("туберкулез", 0),
			new Answer("эмфизема легких", 1)
		]),
	
	new Question("ПРИ ЛЕЧЕНИИ ГНОЙНОГО БРОНХИТА ПРИМЕНЯЮТ:", 
		[
			new Answer("ампициллин, бромгексин", 1),
			new Answer("преднизолон, эуфиллин", 0),
			new Answer("теофедрин, фуросемид", 0),
			new Answer("пентамин, дигоксин", 0)
		]),
		new Question("ПРОФИЛАКТИКА АТЕРОСКЛЕРОЗА ВКЛЮЧАЕТ:", 
			[
				new Answer("занятия физической культурой", 1),
				new Answer("курение", 0),
				new Answer("злоупотребление алкоголем", 0),
				new Answer("несбалансированное питание", 0)
			]),
		
		new Question("ОСНОВНАЯ ПРИЧИНА СМЕРТИ СРЕДИ СЕРДЕЧНО-СОСУДИСТЫХ ЗАБОЛЕВАНИЙ:", 
			[
				new Answer("гипертоническая болезнь", 0),
				new Answer("ишемическая болезнь сердца", 1),
				new Answer("пороки сердца", 0),
				new Answer("ревматизм", 0)
			]),
		
		new Question("СЖИМАЮЩИЕ БОЛИ ЗА ГРУДИНОЙ, ИРРАДИРУЮЩИЕ ПОД ЛЕВУЮ ЛОПАТКУ, ПРОДОЛЖИТЕЛЬНОСТЬЮ 5-10 МИНУТ, ХАРАКТЕРНЫ ДЛЯ:", 
			[
				new Answer("бактериального эндокардита", 0),
				new Answer("инфаркта миокарда", 0),
				new Answer("ревматического эндокардита", 0),
				new Answer("стенокардии", 1)
			]),
		
		new Question("ОСНОВНАЯ ПРИЧИНА ОСТРОГО ГЛОМЕРУЛОНЕФРИТА:", 
			[
				new Answer("бета-гемолитический стрептококк", 1),
				new Answer("грибы", 0),
				new Answer("микобактерии", 0),
				new Answer("простейшие", 0)
			]),
		
		new Question("ПРИ ГЛОМЕРУЛОНЕФРИТЕ ПРЕИМУЩЕСТВЕННО ПОРАЖАЮТСЯ ПОЧЕЧНЫЕ:", 
			[
				new Answer("канальцы", 0),
				new Answer("клубочки", 1),
				new Answer("лоханки", 0),
				new Answer("чашечки", 0)
			]),
		
		new Question("ОСТРЫЙ ГЛОМЕРУЛОНЕФРИТ ЧАЩЕ ВОЗНИКАЕТ В ВОЗРАСТЕ:", 
			[
				new Answer("1-2 лет", 0),
				new Answer("3-4 лет", 0),
				new Answer("5-15 лет", 1),
				new Answer("17-25 лет", 0)
			]),
		
		new Question("ТРИАДА СИМПТОМОВ ПРИ ОСТРОМ ГЛОМЕРУЛОНЕФРИТЕ:", 
			[
				new Answer("гематурия, отеки, гипертония", 1),
				new Answer("пиурия, бактериурия, гипертония", 0),
				new Answer("гематурия, бактериурия, отеки", 0),
				new Answer("лейкоцитурия, цилиндрурия, отеки", 0)
			]),
		
		new Question("АНАЛИЗ МОЧИ ПРИ ОСТРОМ ГЛОМЕРУЛОНЕФРИТЕ:", 
			[
				new Answer("гематурия, протеинурия, цилиндрурия", 1),
				new Answer("гематурия, глюкозурия, пиурия", 0),
				new Answer("лейкоцитурия, протеинурия, цилиндрурия", 0),
				new Answer("лейкоцитурия, протеинурия, бактериурия", 0)
			]),
		
		new Question("ОТЕКИ НА ЛИЦЕ, ГИПЕРТОНИЯ, МОЧА ЦВЕТА «МЯСНЫХ ПОМОЕВ» НАБЛЮДАЮТСЯ ПРИ:", 
			[
				new Answer("мочекаменной болезни", 0),
				new Answer("остром гломерулонефрите", 1),
				new Answer("остром цистите", 0),
				new Answer("хроническом пиелонефрите", 0)
			]),
			new Question("МОЧА ЦВЕТА «МЯСНЫХ ПОМОЕВ» ОБУСЛОВЛЕНА СОДЕРЖАНИЕМ БОЛЬШОГО КОЛИЧЕСТВА:", 
				[
					new Answer("белка", 0),
					new Answer("бактерий", 0),
					new Answer("лейкоцитов", 0),
					new Answer("эритроцитов", 1)
				]),
			
			new Question("НАЛИЧИЕ В КАЛЕ НЕРАСЩЕПЛЕННОГО КРАХМАЛА — ЭТО:", 
				[
					new Answer("амилорея", 1),
					new Answer("диарея", 0),
					new Answer("креаторея", 0),
					new Answer("стеаторея", 0)
				]),
			
			new Question("ЖИДКИЙ, ДЕГТЕОБРАЗНЫЙ СТУЛ — ЭТО:", 
				[
					new Answer("амилорея", 0),
					new Answer("диарея", 0),
					new Answer("мелена", 1),
					new Answer("креаторея", 0)
				]),
			
			new Question("АМИЛОРЕЯ, КРЕАТОРЕЯ, СТЕАТОРЕЯ НАБЛЮДАЮТСЯ ПРИ ХРОНИЧЕСКОМ:", 
				[
					new Answer("гастрите", 0),
					new Answer("гепатите", 0),
					new Answer("холецистите", 0),
					new Answer("панкреатите", 1)
				]),
			
			new Question("ПРИ ЛЕЧЕНИИ ХРОНИЧЕСКОГО ПАНКРЕАТИТА С ЗАМЕСТИТЕЛЬНОЙ ЦЕЛЬЮ НАЗНАЧАЮТ:", 
				[
					new Answer("морфин", 0),
					new Answer("но-шпу", 0),
					new Answer("панзинорм", 1),
					new Answer("холосас", 0)
				]),
			
			new Question("ОСНОВНАЯ ПРИЧИНА ХРОНИЧЕСКОГО ГЕПАТИТА:", 
				[
					new Answer("вирус гепатита А", 0),
					new Answer("вирус гепатита В", 1),
					new Answer("кишечная палочка", 0),
					new Answer("энтерококк", 0)
				]),
			
			new Question("ОСНОВНЫЕ СИМПТОМЫ ХРОНИЧЕСКОГО ГЕПАТИТА:", 
				[
					new Answer("желтуха, гепатомегалия", 1),
					new Answer("слабость, недомогание", 0),
					new Answer("головная боль, тошнота", 0),
					new Answer("метеоризм, поносы", 0)
				]),
			
			new Question("ПРИ ЛЕЧЕНИИ ХРОНИЧЕСКОГО ГЕПАТИТА ПРИМЕНЯЮТ ПРЕПАРАТЫ:", 
				[
					new Answer("антибиотики", 0),
					new Answer("гепатопротекторы", 1),
					new Answer("антигистаминные", 0),
					new Answer("нитрофураны", 0)
				]),
			
			new Question("РАСШИРЕНИЕ ВЕН ПИЩЕВОДА РАЗВИВАЕТСЯ ПРИ:", 
				[
					new Answer("гастрите", 0),
					new Answer("колите", 0),
					new Answer("холецистите", 0),
					new Answer("циррозе печени", 1)
				]),
			
			new Question("СИМПТОМ «ГОЛОВЫ МЕДУЗЫ» ХАРАКТЕРЕН ДЛЯ:", 
				[
					new Answer("гастрита", 0),
					new Answer("панкреатита", 0),
					new Answer("цирроза печени", 1),
					new Answer("язвенной болезни", 0)
				]),
				new Question("«СОСУДИСТЫЕ ЗВЕЗДОЧКИ» НА ВЕРХНЕЙ ЧАСТИ ТУЛОВИЩА ХАРАКТЕРНЫ ДЛЯ:", 
					[
						new Answer("панкреатита", 0),
						new Answer("холецистита", 0),
						new Answer("цирроза печени", 1),
						new Answer("язвенной болезни", 0)
					]),
				
				new Question("ПРИЗНАК ПОРТАЛЬНОЙ ГИПЕРТЕНЗИИ:", 
					[
						new Answer("асцит", 1),
						new Answer("атрофия сосочков языка", 0),
						new Answer("желтуха", 0),
						new Answer("эритема ладоней", 0)
					]),
				
				new Question("РАННИЕ БОЛИ В ЭПИГАСТРАЛЬНОЙ ОБЛАСТИ ВОЗНИКАЮТ ПОСЛЕ ЕДЫ В ТЕЧЕНИЕ:", 
					[
						new Answer("30 минут", 1),
						new Answer("2 часов", 0),
						new Answer("3 часов", 0),
						new Answer("4 часов", 0)
					]),
				
				new Question("ПОЗДНИЕ, «ГОЛОДНЫЕ», НОЧНЫЕ БОЛИ ХАРАКТЕРНЫ ДЛЯ:", 
					[
						new Answer("хронического гастрита", 0),
						new Answer("язвенной болезни желудка", 0),
						new Answer("язвенной болезни 12-перстной кишки", 1),
						new Answer("цирроза печени", 0)
					]),
				
				new Question("ПРИ ВОСПАЛЕНИИ СИГМОВИДНОЙ КИШКИ БОЛЬ ЛОКАЛИЗУЕТСЯ В ОБЛАСТИ:", 
					[
						new Answer("правой подреберной", 0),
						new Answer("околопупочной", 0),
						new Answer("правой подвздошной", 0),
						new Answer("левой подвздошной", 1)
					]),
				
				new Question("ПРИ ХРОНИЧЕСКОМ КОЛИТЕ ОТМЕЧАЕТСЯ КАЛ:", 
					[
						new Answer("дегтеобразный", 0),
						new Answer("с примесью чистой крови", 0),
						new Answer("обесцвеченный", 0),
						new Answer("скудный, жидкий", 1)
					]),
				
				new Question("ПРИ ХРОНИЧЕСКОМ ПАНКРЕАТИТЕ НАБЛЮДАЮТСЯ СИНДРОМЫ:", 
					[
						new Answer("анемический, гиперпластический", 0),
						new Answer("болевой, диспептический", 1),
						new Answer("гипертонический, отечный", 0),
						new Answer("гипертонический, нефротический", 0)
					]),
				
				new Question("КЛИНИЧЕСКИЕ СИМПТОМЫ КРАПИВНИЦЫ:", 
					[
						new Answer("инспираторная одышка, осиплость голоса", 0),
						new Answer("непроизвольное мочеиспускание и дефекация", 0),
						new Answer("падение АД, нитевидный пульс", 0),
						new Answer("сыпь, кожный зуд", 1)
					]),
				
				new Question("ЛОКАЛИЗАЦИЯ СЫПИ ПРИ КРАПИВНИЦЕ:", 
					[
						new Answer("лицо", 0),
						new Answer("конечности", 0),
						new Answer("туловище", 0),
						new Answer("любые участки тела", 1)
					]),
				
				new Question("КЛИНИЧЕСКИЕ СИМПТОМЫ ОТЕКА КВИНКЕ:", 
					[
						new Answer("отеки на лице, затруднение дыхания", 1),
						new Answer("повышение АД, рвота", 0),
						new Answer("кожный зуд, падение АД", 0),
						new Answer("потеря сознания, повышение АД", 0)
					]),
					new Question("ПОРАЖЕНИЕ ПЯСТНО-ФАЛАНГОВЫХ И ПРОКСИМАЛЬНЫХ МЕЖФАЛАНГОВЫХ СУСТАВОВ НАБЛЮДАЕТСЯ ПРИ:", 
						[
							new Answer("деформирующем остеоартрозе", 0),
							new Answer("ревматическом полиартрите", 0),
							new Answer("ревматоидном артрите", 1),
							new Answer("подагре", 0)
						]),
					
					new Question("УТРЕННЯЯ СКОВАННОСТЬ СУСТАВОВ ОТМЕЧАЕТСЯ ПРИ:", 
						[
							new Answer("деформирующем остеоартрозе", 0),
							new Answer("ревматическом полиартрите", 0),
							new Answer("ревматоидном артрите", 1),
							new Answer("подагре", 0)
						]),
					
					new Question("ДАННЫЕ АУСКУЛЬТАЦИИ ПРИ МИТРАЛЬНОЙ НЕДОСТАТОЧНОСТИ:", 
						[
							new Answer("диастолический шум на верхушке", 0),
							new Answer("систолический шум на верхушке", 1),
							new Answer("диастолический шум во 2-м межреберье справа у грудины", 0),
							new Answer("систолический шум во 2-м межреберье справа у грудины", 0)
						]),
					
					new Question("ПУЛЬСАЦИЯ СОННЫХ АРТЕРИЙ («ПЛЯСКА КАРОТИД») НАБЛЮДАЕТСЯ ПРИ:", 
						[
							new Answer("аортальной недостаточности", 1),
							new Answer("аортальном стенозе", 0),
							new Answer("митральной недостаточности", 0),
							new Answer("митральном стенозе", 0)
						]),
					
					new Question("КЛИНИЧЕСКИЕ СИМПТОМЫ ИНФЕКЦИОННОГО МИОКАРДИТА:", 
						[
							new Answer("лихорадка, боли в области сердца, одышка", 1),
							new Answer("лихорадка, кашель со «ржавой» мокротой", 0),
							new Answer("тошнота, рвота, понос", 0),
							new Answer("отеки, гематурия, гипертензия", 0)
						]),
					
					new Question("ПРИ СУХОМ ПЕРИКАРДИТЕ АУСКУЛЬТАТИВНО ОПРЕДЕЛЯЕТСЯ:", 
						[
							new Answer("крепитация", 0),
							new Answer("сухие хрипы", 0),
							new Answer("усиление тонов", 0),
							new Answer("шум трения перикарда", 1)
						]),
						new Question("ПРИ ЭКССУДАТИВНОМ ПЕРИКАРДИТЕ БОЛЬНОЙ ЗАНИМАЕТ ВЫНУЖДЕННОЕ ПОЛОЖЕНИЕ:", 
							[
								new Answer("горизонтальное", 0),
								new Answer("горизонтальное с приподнятыми ногами", 0),
								new Answer("лежа на боку", 0),
								new Answer("сидя с наклоном туловища вперед", 1)
							]),
						
						new Question("АУСКУЛЬТАТИВНЫЙ ПРИЗНАК ЭКССУДАТИВНОГО ПЕРИКАРДИТА:", 
							[
								new Answer("акцент второго тона на аорте", 0),
								new Answer("акцент второго тона на легочной артерии", 0),
								new Answer("усиление первого тона на верхушке сердца", 0),
								new Answer("ослабление тонов сердца", 1)
							]),
						
						new Question("ГЛАВНЫЙ ЭТИОЛОГИЧЕСКИЙ ФАКТОР РАЗВИТИЯ ГИПЕРТОНИЧЕСКОЙ БОЛЕЗНИ:", 
							[
								new Answer("нервно-психическое перенапряжение", 1),
								new Answer("гломерулонефрит", 0),
								new Answer("ожирение", 0),
								new Answer("болезнь Иценко-Кушинга", 0)
							]),
						
						new Question("СИЛЬНАЯ ГОЛОВНАЯ БОЛЬ, ТОШНОТА, РВОТА, «МУШКИ» ПЕРЕД ГЛАЗАМИ, НАПРЯЖЕННЫЙ ПУЛЬС НАБЛЮДАЮТСЯ ПРИ:", 
							[
								new Answer("обмороке", 0),
								new Answer("коллапсе", 0),
								new Answer("гипертоническом кризе", 1),
								new Answer("стенокардии", 0)
							]),
						
						new Question("РЕНТГЕНОЛОГИЧЕСКАЯ КАРТИНА ПРИ ЭКССУДАТИВНОМ ПЛЕВРИТЕ:", 
							[
								new Answer("полость с горизонтальным уровнем жидкости", 0),
								new Answer("повышенная прозрачность легких", 0),
								new Answer("гомогенное затенение части легкого со смещением органов средостения в здоровую сторону", 1),
								new Answer("гомогенное затенение части легкого со смещением органов средостения в больную сторону", 0)
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