import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from 'next/router'
import api from "../../services/api";

import { motion } from 'framer-motion';
import Link from 'next/link';

interface IType {
    type: string;
}

const Type: React.FC<IType> = ({ type }) => {
    return (
      <Link href={`/types/${type}`}>
          <div className="relative mt-2 h-40 md:h-4 md:w-1/4 rounded-full py-3 px-6 cursor-pointer backContainer transition flex justify-center items-space-between md:items-center">
            <a className="text-sm tracking-wide bg-black hover:text-gray-300 font-semibold typeTitle">{type}</a>
          </div>
      </Link>
    )
  }

export default function Pokemon({ pokemon }) {
    const router = useRouter();

    console.log(pokemon)
    if (router.isFallback) {
        return <p>Carregando...</p>
    }
    
    return (
        <>
        <div className="flex items-space-between justify-center">
        <motion.img 
        className="object-contain w-2/4 mt-12 mb-12"
        src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
        layoutId={`${pokemon.name}-logo`}
        />
        <motion.div 
         initial={{opacity: 0}}
         animate={{opacity: 1}}
         transition={{delay: 0.5, duration: 1}}
        className="flex flex-col mt-24 px-19">
            <a className="text-3xl tracking-wide hover:text-gray-300 font-semibold pokeHeaderTitle mb-2">Base Experience - {pokemon.base_experience}
            </a>
            <a className="text-3xl tracking-wide hover:text-gray-300 font-semibold pokeHeaderTitle mb-2">Weight - {pokemon.weight}
            </a>
            <a className="text-3xl tracking-wide hover:text-gray-300 font-semibold pokeHeaderTitle mb-2">
                Types - 
                {pokemon.types.map(type => (
                    <Type type={type.type.name} key={type}></Type>
                ))}
            </a>
        </motion.div>
    </div>
    <div className="flex flex-col items-center">
          <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1, duration: 1}}
        >
            <Link href="/">
                <a className="backContainer px-6 py-3 rounded-xl">
                    <a className="text-lg font-semibold">Voltar para a Home</a>
                </a>
            </Link>
        </motion.div>
    </div>
    </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await api.get(`/pokemon/?limit=1118`);
    const data = response.data

    const paths = data.results.map(poke => {
        return { params: { pokemon: poke.name } }
    })
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
const { pokemon } = context.params;

const response = await api.get(`/pokemon/${pokemon}`);
const data = response.data;

    return {
        props: {
            pokemon: data,
        },
        revalidate: 60,
    }
}