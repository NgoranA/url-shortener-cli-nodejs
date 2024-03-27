#! /usr/bin/env node

import { input } from "@inquirer/prompts"
import dotenv from 'dotenv'
import pool from "./db_config/index.js"
import chalk from 'chalk'

dotenv.config()



function fetch_urls() {
	let data;
	pool.query('select * from url', (err, result) => {
		if (err) {
			throw Error(err.message)
		}
		data = result.rows
		return data
	})
}



async function get_shortened_link(url) {
	try {
		const shortened_url = await fetch(`${process.env.SHORTENER_SERVICE}?key=${process.env.API_KEY}&short=${url}`)
		return shortened_url

	} catch (error) {
		console.error(error)
	}
}

async function user_input_handler() {
	let answer = await input({ message: chalk.blue("What is the URL that you want to be shortened? ") })
	return answer
}


function insert_to_db(title, fullLink, shortLink) {

	pool.query('insert into url (title, full_link, short_link) values ($1, $2, $3) RETURNING * ', [title, fullLink, shortLink], (err, result) => {
		if (err) {
			throw Error(err.message)
		}
		console.log("Added to the database")
		console.log(result.rows)
	})
}

try {
	if (process.argv.includes('list')) {
		fetch_urls()
	} else {
		const answer = await user_input_handler()
		const response = await get_shortened_link(answer)
		const data = await response.json()

		const { fullLink, shortLink, title } = data.url

		insert_to_db(title, fullLink, shortLink)
	}
} catch (error) {
	console.error(error)
	process.exit(1)
}
