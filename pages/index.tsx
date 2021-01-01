import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '../services/api'
import { useCallback } from 'react';

interface CardProps {
  href: string;
  layoutId: string;
  renderPokemon: Function;
}

const Card: React.FC<CardProps> = ({href,  layoutId, renderPokemon}) => {
  const {name, imgUrl} = renderPokemon();
  return (
    <Link href={href}>
        <div  className="relative h-40 md:h-80 rounded-1x cursor-pointer bg-red-500 hover:bg-black transition flex flex-col items-space-between md:items-center">
          <h1 className="px-4 text-white text-4xl sm:text-6xl lg:text-3xl mt-5 md:mt-2 leading-none font-extrabold tracking-tight pokeTitle">{name[0].toUpperCase() + name.substr(1)}</h1>
          <div className="w-44 h-44 mt-8 rounded-full backOnlyContainer">
          <motion.img src={imgUrl} className="object-contain w-full h-20 md:h-44 md:mt-4" layoutId={layoutId}/>
          </div>
        </div>
    </Link>
  )
}

export default function Home({pokemons}) {
  const renderPokemon = useCallback((item) => {
    const {url, name} = item;
    const pokemonNumber = url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');

    const imgUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonNumber}.png`;

    return {imgUrl, name};
  },[])
  return (
    <div>
      <h1 className="text-4xl sm:text-6xl lg:text-7xl mt-10 md:mt-24 leading-none font-extrabold tracking-tight isGradient">
        Sua Pokédex otimizada, agora em server side rendering.
      </h1>

      <div className="mt-10 md:mt-24 grid w-full grid-cols-1 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-1">

        {pokemons.results.map((pokemon) => (
          <Card 
          key={pokemon.name}
          href={`/pokemon/${pokemon.name}`}
          layoutId={`${pokemon.name}-logo`}
          renderPokemon={() => renderPokemon(pokemon)}
        />
      ))}
        
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const {data} = await api.get('/pokemon?limit=30&offset=200')  
  const pokemons= data

  return {
    props: {
      pokemons
    }
  }
}
