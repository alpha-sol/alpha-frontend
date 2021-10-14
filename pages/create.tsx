import type { NextPage } from 'next';
import { CreateFlow } from '../components/CreateFlow';

const Create: NextPage<Record<string, unknown>> = () => {
  return (
    <div className="flex flex-col items-center flex-grow w-full mt-8">
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-white font-mono text-3xl mt-4 mb-12  text-center">
            Create with alpha
          </h1>
          <p className="font-mono font-normal text-white opacity-70 text-center">
            Possessing an alpha NFT is your pass to our minting platform and
            gallery for curated art, music, games, competitions, and more.
          </p>
          <p className="font-mono font-normal text-white mt-4 mb-6 opacity-70 text-center">
            We will also provide open-source tools to developers and creatives
            who want to use alpha in their non-curated mints. We are extremely
            excited to see our community creates with the alpha primitive NFT.
          </p>
          <CreateFlow />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      pageKey: 'create',
      title: 'How to use - alpha',
    },
  };
};

export default Create;
