import React from 'react'
import { useTypedSelector } from '../store/store'

const Header: React.FC = () => {

	const { tasks } = useTypedSelector(state => state)

	return (
		<header className='header'>
			<div className='container'>
				{tasks.project} / {tasks.period}
			</div>
		</header>
	)
}

export default Header