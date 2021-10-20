import type { NextPage } from 'next';

const FAQ: NextPage<Record<string, unknown>> = () => {
  return (
    <div className="flex flex-col items-center flex-grow mt-8">
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white font-mono text-3xl mt-4 mb-8 text-center">
            Mint
          </h1>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      pageKey: 'mint',
      title: 'Mint - alpha',
    },
  };
};

export default FAQ;
