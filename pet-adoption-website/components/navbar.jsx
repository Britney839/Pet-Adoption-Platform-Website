import Link from 'next/link';

export default function NavBar() {
    return (
        <div>
            <header>
                <nav className="navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 450 }}>
                    <img src="banner.png" alt="Banner Logo" className="navbar-logo" style={{ maxWidth: '70%', height: 'auto' }} />
                </nav>
                <p>Find your next furry (or feathery) friend.</p>
                <ul className="navbar-menu">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/dashboard">Adopt</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </header>
        </div>
    )
}