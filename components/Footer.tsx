import Image from 'next/image';

const Footer = () => {
  return (
    <div className="flex flex-row justify-end items-end py-8 w-full h-12 px-12">
      <div className="mr-4">
        <a
          href="https://twitter.com/alphagenGallery"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/assets/icons/twitter.svg"
            width={38}
            height={30}
            alt="alpha-logo"
          />
        </a>
      </div>
      <div>
        <a
          href="https://discord.gg/6vQ6dVyfQJ"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="/assets/icons/discord.svg"
            width={38}
            height={30}
            alt="alpha-logo"
          />
        </a>
      </div>
    </div>
  );
};

export { Footer };
