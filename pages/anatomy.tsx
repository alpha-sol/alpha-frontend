import type { NextPage } from 'next';
import { AnatomyFlow } from '../components/AnatomyFlow';

const Anatomy: NextPage<Record<string, unknown>> = () => {
  return (
    <div className="flex flex-col items-center flex-grow w-full mt-8">
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-col justify-center w-full  items-center">
          <h1 className="text-white font-mono text-3xl mt-4 mb-12 text-center">
            Anatomy of an alpha NFT
          </h1>
          <p className="font-mono font-normal text-white opacity-70 text-center">
            alpha NFTs are 16 characters in a 4x4 matrix. Characters are
            normally distributed (i.e Bell Curve), where letters at the extremes
            (a, b, c, ...., x, y , z) are more rare than letters in the middle
            of the alphabet.
          </p>
          <p className="font-mono font-normal text-white opacity-70 mt-4 mb-8 text-center">
            alpha NFTs can be visually represented by any 26 character alphabet.
          </p>
          <AnatomyFlow />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      pageKey: 'anatomy',
      title: 'Anatomy - alpha',
    },
  };
};

export default Anatomy;
