import type { NextPage } from 'next';

const FAQ: NextPage<Record<string, unknown>> = () => {
  return (
    <div className="flex flex-col items-center flex-grow mt-8">
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white font-mono text-3xl mt-4 mb-8 text-center">
            FAQ
          </h1>
          <div className="max-w-3xl mb-16">
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              What is an ‘alpha’ NFT?
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              {
                "alpha is a NFT 'primitive' of which other NFTs can be derived from. Generative artworks, in-game items, music, digital collectibles and any other metaverse projects can all use alpha to influence their mint."
              }
            </p>
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              What is alphagen?
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              alphagen is a minting platform and art gallery built on top of the
              Solana blockchain. Holding alpha will allow you to earn
              participation in the alphagen DAO.
            </p>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              The alphagen DAO will provide curated mints and unique experiences
              to alpha holders. Initially these curated events will be decided
              by the internal team and community through traditional means.
            </p>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              In the future holding alpha will grant you voting rights in the
              DAO which will control the direction and goals of the alphagen
              gallery.
            </p>
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              What is the utility of alpha?
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              Possessing an alpha NFT will act as your membership for curated
              mints on the alphagen platform and the alphagen DAO. However, any
              creator can use the platform to influence their mints or projects.
            </p>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              The alphagen team will also provide tools to help the community
              issue NFTs outside of the curated alphagen platform.
            </p>
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              How will alpha be minted?
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              alpha will first be available to holders of the Solana Monkey
              Business Gen 2 NFT with 1 alpha SPL token being issued for 1 SMB
              ID which can then be used to redeem an alpha NFT during the SMB
              alpha mint.
            </p>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              {
                'This mint period will be open for 3 days after which all unclaimed alpha NFTs will be sold along with 100/500 "Genesis" alpha NFTs in a fair mint, to be determined at a later date.'
              }
            </p>
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              Why Solana Monkey Business?
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              As Solana Monkey Business holders and Monke DAO members we find
              the SMB community to be the most developed, creative, and prepared
              for governance on the alphagen platform as alpha holders.
            </p>
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              How do I know if an alpha has been minted?
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              We will offer a tool on our website to see if a particular SMB ID
              has minted an alpha SPL token. This should allow interested
              parties to see if an on market SMB has already minted an alpha
              NFT.
            </p>
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              When will I be able to mint?
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              Minting for Solana Monkey Business holders is currently targeted
              for early October. The public sale will quickly follow with
              updates being provided on our social feeds.
            </p>
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              What is the supply of alpha?
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              {
                'There are a total of 5500 alpha NFTs. 5000 will be offered 1:1 for SMB holders for free and 100 "Genesis" NFTs will be sold in a public sale. The other 400 will be held and utilized by the alphagen for contributions within the community, costs, and participation in a future alpha DAO.'
              }
            </p>
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              Are there royalty feeds?
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              Since the alpha NFT is being issued for free to SMB holders we
              will be collecting 5% royalties for after market sales on the
              alpha NFT. This royalty fee will fund the DAO treasury which will
              allow alphagen DAO to hire developers, recruit creators, do
              marketing, and other normal business operations.
            </p>
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              {
                'Do alpha "Genesis" NFTs offer any benefits from than those derived from Solana Monkey Business?'
              }
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              No all 5500 NFTs are treated equally.
            </p>
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              How is rarity of individual letters in an alpha matrix determined?
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              Letters were issued on a normal distribution curve. Letters at the
              extremes of the alphabet (a, b, c..) and (z, y, x..) are more rare
              than letters in the middle of the alphabet. Data will be made
              available via our social channels prior to the opening of the
              mint.
            </p>
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              What other rarities exist?
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              Other rarities will surely be discovered by the community. We
              expect sequences of letters, words, and other significant
              combinations will be found.
            </p>
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              Does alpha draw inspiration from other projects?
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              Yes, alpha is heavily inspired by NFT primitive projects like{' '}
              <a href="https://www.lootproject.com/">Loot Project</a>,{' '}
              <a href="https://www.lootproject.com/">the n project</a>, and
              other derivatives. Like <a href="https://gmoot.co/">gmoot</a>, we
              prefer to build and have fun on the Solana blockchain.
            </p>
            <h2 className="font-mono font-normal text-white mt-12 text-2xl opacity-70">
              How do we contact team?
            </h2>
            <p className="font-mono font-normal text-white mt-4 opacity-90">
              Join us in our Discord or hit us up in the DMs on Twitter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      pageKey: 'faq',
      title: 'FAQ - alpha',
    },
  };
};

export default FAQ;
