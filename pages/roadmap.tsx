import type { NextPage } from 'next';
import { RoadmapFlow } from '../components/RoadmapFlow';

const Roadmap: NextPage<Record<string, unknown>> = () => {
  return (
    <div className="flex flex-col items-center flex-grow mt-8 w-full">
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-col justify-center items-center flex-grow">
          <h1 className="text-white font-mono text-3xl mt-4 mb-8 text-center">
            Roadmap
          </h1>
          <RoadmapFlow />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      pageKey: 'roadmap',
      title: 'Roadmap - alpha',
    },
  };
};

export default Roadmap;
