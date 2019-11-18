import { h } from 'preact'
import { Link } from 'preact-router/match'
import style from './style.css'

const Header = () => (
	<header class={style.header}>
		<h1>Streek</h1>
		<nav>
			<Link href="/">Log in</Link>
			<Link href="/">Sign up</Link>
		</nav>
	</header>
)

export default Header
