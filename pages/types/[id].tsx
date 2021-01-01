import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from 'next/router'
import api from "../../services/api";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback } from "react";

interface CardProps {
    href: string;
    layoutId: string;
    renderPokemon: Function;
  }
  
  const Card: React.FC<CardProps> = ({href,  layoutId, renderPokemon}) => {
    const {name, imgUrl} = renderPokemon();
    return (
      <Link href={href}>
          <div  className="relative h-40 md:h-80 rounded-1x cursor-pointer bg-red-500 hover:bg-black hover:text-gray-50 transition flex flex-col items-space-between md:items-center">
            <h1 className="px-4 text-white text-4xl sm:text-6xl lg:text-3xl mt-5 md:mt-2 leading-none font-extrabold tracking-tight pokeTitle">{name[0].toUpperCase() + name.substr(1)}</h1>
            <div className="w-44 h-44 mt-8 rounded-full backOnlyContainer">
              <motion.img src={imgUrl} className="object-contain w-full h-20 md:h-44 md:mt-4" layoutId={layoutId}/>
          </div>
          </div>
      </Link>
    )
  }
  

export default function Types({ pokemons }) {
    const router = useRouter();
    const renderPokemon = useCallback((item) => {
        const {url, name} = item;
        const pokemonNumber = url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
    
        const imgUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonNumber}.png`;
    
        return {imgUrl, name};
      },[])

    if (router.isFallback) {
        return <p>Carregando...</p>
    }
    
    return (
        <div>
      <h1 className="text-4xl sm:text-6xl lg:text-7xl mt-10 md:mt-24 leading-none font-extrabold tracking-tight isGradient">
        {`Tipo selecionado: ${pokemons.name.toUpperCase()}`}
      </h1>

      <div className="mt-10 md:mt-24 grid w-full grid-cols-1 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-1">

        {pokemons.pokemon.map((pokemon) => (
          <Card 
          key={pokemon.pokemon.name}
          href={`/pokemon/${pokemon.pokemon.name}`}
          layoutId={`${pokemon.pokemon.name}-logo`}
          renderPokemon={() => renderPokemon(pokemon.pokemon)}
        />
      ))}
        
      </div>
    </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await api.get(`/type`);
    const data = response.data

    const paths = data.results.map(poke => {
        return { params: { id: poke.name } }
    })
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
const { id } = context.params;

const response = await api.get(`/type/${id}`);
const data = response.data;

    return {
        props: {
            pokemons: data,
        },
        revalidate: 60,
    }
}