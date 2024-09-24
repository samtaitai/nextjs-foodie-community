import Link from 'next/link'
import logImg from '@/assets/logo.png'
import classes from './main-header.module.css'
import Image from 'next/image'
import MainHeaderBackground from './main-header-background'
import NavLink from './nav-link'

export default function MainHeader() {
    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    {/*src property is for general img tag */}
                    {/*Image tag is more optimized way */}
                    {/*priority property is against lazy loading */}
                    <Image src={logImg} alt="A place with food on it" priority/>
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meals">Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    ) 
    
    
}