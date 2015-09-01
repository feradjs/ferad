import express from 'express'

export default function serve(port, cb) {
	const app = express()
	app.get('/', (request, response) => {
		response.send('TODO: Homepage')
	})
	app.get('/watch/:project', (request, response) => {
		response.send('Searching...')
		cb(request.params.project)
	})
	app.listen(port)
}
