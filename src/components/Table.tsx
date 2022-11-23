import React, { useEffect } from 'react'
import { useTypedSelector } from '../store/store'
import { useDispatch } from 'react-redux'
import { getTasks } from '../store/tasksReducer'

type ITask = {
	id: number
	title: string
	period_start: string
	period_end: string
	sub?: Array<ITask>
}

const Table = () => {

	const { tasks } = useTypedSelector(state => state)
	const dispatch = useDispatch<any>()

	useEffect(() => {
		dispatch(getTasks())
	}, [])

	function itemsTree() {

		const items: any = []
		let offset = 10

		function configureArr(item: ITask) {
			const obj = {
				...item,
				offset, 
			}
			items.push(obj)
			if (Object.hasOwn(item, 'sub')) {
				offset += 10
				item.sub!.forEach(i => {
					configureArr(i)
				})
			}
		}

		configureArr(tasks.chart!)
		return items

	}

	function getArr() {
		let arr = []
		for(let i = 1; i < 50; i++) {
			if (i > 30) {
				arr.push(i)
			} else {
				arr.push(i % 30)
			}
		}
		return arr
	}

	const colors = ['blue', 'orange', 'green', 'green', 'orange', 'orange']
	const weeks = ['01 Sep - 07 Sep', '08 Sep - 14 Sep', '15 Sep - 21 Sep', '22 Sep - 28 Sep', '29 Sep - 4 Oct', '5 Oct - 11 Oct', '12 Oct - 18 Oct']

	return (
		<section>
			<div className='container'>
				<div className='table'>
					<div className='table__lead lead'>
						<div className='lead__header'>
							<h3>Work Item</h3>
						</div>
						<ul className='lead__items'>
							{
								itemsTree().map((item: any) => {
									return (
										<li 
											style={{paddingLeft: `${item.offset}px`}} 
											className='lead__item'
										>
											{item.title}
										</li>
									)
								})
							}	
						</ul>
					</div>
					<div className='table__body body'>
						<div className='body__header'>
							{
								[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
									const arrOfDays = []
									for(let i = (item * 7 - 6); i <= item * 7; i++) {
										arrOfDays.push(i <= 31 ? i : (i % 31))
									}
									return (
										<div className='body__header-item'>
											<div className='week'>
												{weeks[index]}
											</div>
											<div className='days'>
												{
													arrOfDays.map(i => <div className='day'>{i}</div>)
												}
											</div>
										</div>
									)
								})
							}
							
						</div>
						<div className='body__content'>
							{
								getArr().map(i => <div className='column'></div>)
							}
							<div className='bars'>
			
								{
									itemsTree().map((item: ITask, index: number) => {
										const startNumber = Number(item.period_start.split('-')[2][1])
										const endNumber = Number(item.period_end.split('-')[2][1])
										const ml = 20 * (startNumber - 1)
										const width = (endNumber - startNumber === 0 ? 1 : endNumber - startNumber) * 23
										return (
											<div style={{marginLeft: `${ml}px`, display: 'flex', gap: '20px', alignItems: 'center'}}>
												<div className='bar' style={{
													width: `${width}px`, 
													border: `1px solid ${colors[index]}`,
													borderRadius: '5px',
												}}>
													<div style={{
														width: '100%', 
														height: '100%', 
														backgroundColor: colors[index], 
														opacity: 0.5
													}}>
													</div>
												</div>
												<div style={{fontSize: '14px'}}>{item.title}</div>
											</div>
										)
									})
								}
								

							</div>
						</div>
					</div>
				</div>
			</div>
		</section>	
	)
}

export default Table















