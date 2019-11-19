import { h } from 'preact'
import styled from 'styled-components'

const Header = () => (
	<Container>
		<AppTitle>Streek</AppTitle>
		<Menu>
			<MenuLink href="http://localhost:3000/login">Log in</MenuLink>
			<MenuLink href="http://localhost:3000/signup">Sign up</MenuLink>
		</Menu>
	</Container>
)

const Container = styled.header`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 56px;
	padding: 0;
	background: transparent;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
	z-index: 50;
	font-weight: bolder;
`
const AppTitle = styled.h1`
	float: left;
	margin: 0;
	padding: 0 15px;
	font-size: 24px;
	line-height: 56px;
	font-weight: 400;
	color: white;
`
const Menu = styled.nav`
	float: right;
	font-size: 100%;
`
const MenuLink = styled.a`
	display: inline-block;
	height: 56px;
	line-height: 56px;
	padding: 0 15px;
	min-width: 50px;
	text-align: center;
	background: rgba(255,255,255,0);
	text-decoration: none;
	color: #FFF;
	will-change: background-color;
	cursor: pointer;
	
	&:hover {
		background: rgba(0,0,0,0.2);
	}
`
export default Header
