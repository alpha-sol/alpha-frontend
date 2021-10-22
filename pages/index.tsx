import type { NextPage } from 'next';
import Head from 'next/head';
import normalizedAttributesJSON from '../data/normalizedAttributes.json';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../components/Button';

const normalizedAttributesKeys = Object.keys(normalizedAttributesJSON);

interface Props {
  title: string;
}

const About: NextPage<Props> = (props) => {
  const [monke, setMonke] = useState(null);
  const [imagePostfix, setImagePostfix] = useState('');

  useEffect(() => {
    const monke =
      // @ts-ignore
      normalizedAttributesJSON[
        normalizedAttributesKeys[
          Math.floor(Math.random() * normalizedAttributesKeys.length)
        ]
      ];
    setMonke(monke);
  }, []);

  return (
    <div className="flex flex-col items-center flex-grow pb-24">
      <h1 className="font-mono text-white text-4xl text-center pb-8 mt-10 opacity-90 text-center">
        alpha
      </h1>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div>
        <Image
          // @ts-ignore
          src={
            monke
              ? // @ts-ignore
                `/assets/alpha-home/${monke.mintId}${imagePostfix}.png`
              : `/assets/alpha-home/alpha-smb-1${imagePostfix}.png`
          }
          width={450}
          height={450}
          alt="alpha logo"
        />
        <div className="relative w-full flex flex-row items-center justify-center">
          <Button
            className="my-4 justify-self-center"
            callToAction="Feed me alpha"
            onPress={() => {
              const monke =
                // @ts-ignore
                normalizedAttributesJSON[
                  normalizedAttributesKeys[
                    Math.floor(Math.random() * normalizedAttributesKeys.length)
                  ]
                ];
              setMonke(monke);
            }}
          />
          <button
            className="w-10 h-10 bg-gray rounded-3xl absolute right-0"
            onClick={(e) => {
              e.preventDefault();
              if (imagePostfix.length === 0) {
                setImagePostfix('-values');
                return;
              }
              setImagePostfix('');
            }}
          >
            <p className="text-white text-xl">
              {imagePostfix.length === 0 ? 'a' : '00'}
            </p>
          </button>
        </div>
      </div>
      <p className="font-mono font-normal text-white text-center mt-12 opacity-90">
        alphagen is a minting platform and art gallery built on top of the
        Solana blockchain.
      </p>
      <p className="font-mono font-normal text-white text-center mt-8 opacity-90">
        alphagen NFTs are available for anyone to use. However, owning an ‘alpha
        NFT’ is your pass to create and mint curated projects on the alphagen
        platform.
      </p>
      <p className="font-mono font-normal text-white text-center mt-8 opacity-90">
        The first alpha NFTs will be distributed for FREE to all{' '}
        <a href="https://solanamonkey.business/">Solana Monkey Business</a>{' '}
        holders over a 3 day period. Unclaimed alpha NFTs will then be sold in a
        fair mint along with 100 genesis alpha NFTs.
      </p>
      <p className="font-mono font-normal text-white text-center mt-8 opacity-90">
        There will be a total of 5,500 alpha NFTs.
      </p>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      pageKey: 'home',
      title: 'Home - alpha',
    },
  };
};
//
export default About;
