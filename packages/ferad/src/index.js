
const ferad = {}
const _tasks = {}

ferad.task = (name, func) => {
	if (func) {
		_tasks[name] = func
	} else {
		return _tasks[name]
	}
}


ferad.tasks = (tasks) => {
	if (tasks) {
		for (var name in tasks) {
			ferad.task(name, tasks[name])
		}
	} else {
		return _tasks
	}
}

module.exports = ferad
