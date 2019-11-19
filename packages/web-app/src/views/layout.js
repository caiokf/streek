import React from 'react'

const Layout = ({ children }) => (
    <div className="App">
        <header className="App-header">
        <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            Home Streek
        </a>
        </header>
        {children}
    </div>
)

export default Layout