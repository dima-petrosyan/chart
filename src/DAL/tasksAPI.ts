import axios from 'axios'

type ITask = {
	id: number
	title: string
	period_start: string
	period_end: string
	sub?: Array<ITask>
}

type IProject = {
	project: string
	period: string
	chart: ITask
}

export const tasksAPI = {
	getTasks() {
		return axios.get<IProject>('http://82.202.204.94/tmp/test.php')
			.then(response => response.data)
	}
}