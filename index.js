'use strict'

const $ = el => document.querySelector(el)

const start = async () => {
	const response = await fetch('./questions.json')
	const questions = await response.json()
	localStorage.setItem('length', questions.length)
	store(questions.sort(() => .5 - Math.random()))
}

const store = array => {
	localStorage.setItem('questions', JSON.stringify(array))
}

const loadNext = () => {
	let stack = JSON.parse(localStorage.getItem('questions'))
	let current = stack.shift()

	if (current === undefined) {
		current = 'done'
	}

	$('h4#question').innerText = current
	store(stack)
	loadStatus()
}

const loadStatus = () => {
	let total = localStorage.getItem('length')
	let rest = JSON.parse(localStorage.getItem('questions')).length
	$('#status').innerText = `${total-rest}/${total}`
}

window.addEventListener('load', async () => {
	let stack = localStorage.getItem('questions')
	if (stack === null || stack === '[]') {
		start()
	}
	loadNext()
})

$('#next').addEventListener('click', loadNext)
$('#restart').addEventListener('click', async () => {
	await start()
	loadNext()
})
