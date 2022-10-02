const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];


// Переменные quiz'а.
let score = 0;	// Подсчет праильных ответов.
let questionIndex = 0;	// Текущий вопрос.

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitButton = document.querySelector('#submit');

clearPage();
showQuestion();
submitButton.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {
	// Вопрос.
	const headerTemplate = `<h2 class="title">%title%</h2>`
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

	headerContainer.innerHTML = title;

	// Варианты ответа.
	for (const [index, answerText] of questions[questionIndex]['answers'].entries()) {	// Деструкторизация.
		const questionTemplate = `
			<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer"/>
					<span>%answer%</span>
				</label>
			</li>
		`;

		let answerHTML = questionTemplate.replace('%answer%', answerText)
										 .replace('%number%', index + 1);
		listContainer.innerHTML += answerHTML;
	}
}

function checkAnswer() {
	// Найти выбранную радио-кнопку.
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	
	// Если ответ не выбран, то ничего не делаем и выходим из функции.
	if(!checkedRadio) {
		submitButton.blur();
		return;
	}
	
	const userAnswer = parseInt(checkedRadio.value);

	// Если пользователь ответил верно, то увеличиваем номер вопроса.
	if(userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	// Проверка на последний вопрос.
	if(questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else {
		clearPage();
		showResults();
	}
}

function showResults() {
	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`;

	// Варианты результатов quiz'а.
	let title, message;

	if(score === questions.length) {
		title = 'Поздравляем!';
		message = 'Вы ответили на все вопросы.';
	} else if((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат!';
		message = 'Вы дали более половины правильных ответов.';
	} else {
		title = 'Стоит постараться!'
		message = 'Пока у Вас меньше половины правильных ответов'
	}

	// Результат правильных ответов.
	let result = `${score} из ${questions.length}`;

	// Вывод результатов.
	const finalMessage = resultsTemplate.replace('%title%', title)
										.replace('%message%', message)
										.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;

	// Меняем кнопку на "Играть заново".
	submitButton.blur();
	submitButton.innerText = 'Играть заново';
	submitButton.onclick = () => history.go();
}