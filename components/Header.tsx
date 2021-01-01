import Image from 'next/image'
import Link from 'next/link'

import { motion } from 'framer-motion';


const Header: React.FC = () => {
    return (
        <header className="flex justify-center md:justify-between py-2 md:py-4 items-center">
            <Link href="/">
                <Image className="cursor-pointer" src="/img/logo.png" alt="logo" width={200} height={60} />
            </Link>

            <nav className="hidden md:block space-x-8">
                <Link href="/types/normal">
                    <a className="tracking-wide hover:text-gray-300 font-semibold pokeHeaderTitle">Normal</a>
                </Link>
                <Link href="/types/water">
                    <a className="tracking-wide hover:text-gray-300 font-semibold pokeHeaderTitle">Water</a>
                </Link>
                <Link href="/types/fire">
                    <a className="tracking-wide hover:text-gray-300 font-semibold pokeHeaderTitle">Fire</a>
                </Link>
                <Link href="/types/fairy">
                    <a className="tracking-wide hover:text-gray-300 font-semibold pokeHeaderTitle">Magic/Fairy</a>
                </Link>  
                <Link href="/types/flying">
                    <a className="tracking-wide hover:text-gray-300 font-semibold pokeHeaderTitle">Flying</a>
                </Link>              
                <Link href="/types/ghost">
                    <a className="tracking-wide hover:text-gray-300 font-semibold pokeHeaderTitle">Ghost</a>
                </Link>
                <Link href="/types/electric">
                    <a className="tracking-wide hover:text-gray-300 font-semibold pokeHeaderTitle">Electric</a>
                </Link>
            </nav>            
        </header>
        
    )
}

export default Header