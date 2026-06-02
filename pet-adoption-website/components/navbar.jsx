export default function NavBar() {
    return (
        <div>
            <header>
                <nav className="navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 450 }}>
                    <img src="banner.png" alt="Banner Logo" className="navbar-logo" style={{ maxWidth: '70%', height: 'auto' }} />
                </nav>
                <p>Find your next furry (or feathery) friend.</p>
                <ul className="navbar-menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/dashboard">Adopt</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </header>
        </div>
    )
}