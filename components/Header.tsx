import Link from 'next/link';
import { PageProps } from '../types';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import styled from '@emotion/styled';
import { useMint } from '../mint/MintProvider';
import { MintButton, MintLinkButton } from './Button';
import { useAlpha } from '../alpha/AlphaProvider';
import { AlphaLogo } from './AlphaLogo';

const StyledWalletDialogButton = styled(WalletDialogButton)`
  background-color: #222222 !important;
  border: #bbbbbb 1px solid !important;
  text-align: center;

  :hover {
    background-color: #444444 !important;
  }
`;

const LogoDiv = styled.div`
  height: 40px;
  width: 125px;
`;

interface DotProps {
  selected: boolean;
}

const Dot = ({ selected }: DotProps) => {
  if (!selected) return <div className="h-1 w-1 mt-1"></div>;
  return <div className="h-1 w-1 rounded-md mt-1 bg-white"></div>;
};

const Routes = [
  {
    name: 'Home',
    key: 'home',
    route: '/',
  },
  {
    name: 'Roadmap',
    key: 'roadmap',
    route: '/roadmap',
  },
  {
    name: 'Anatomy',
    key: 'anatomy',
    route: '/anatomy',
  },
  {
    name: 'Create',
    key: 'create',
    route: '/create',
  },
  {
    name: 'Faq',
    key: 'faq',
    route: '/faq',
  },
];

const Header = ({ pageProps: { pageKey } }: PageProps) => {
  const { walletShortValue } = useMint();
  const { alphaCount } = useAlpha();
  return (
    <div className="flex flex-row justify-between items-center py-8 w-full px-6">
      <Link passHref href="/">
        <LogoDiv>
          <a className="cursor-pointer">
            <AlphaLogo width={40} height={40} />
          </a>
        </LogoDiv>
      </Link>
      <div className="flex flex-row justify-center items-center py-8">
        {Routes.map(({ name, key, route }, index) => {
          return (
            <div
              key={`route-${key}`}
              className="flex flex-row justify-center items-center"
            >
              <Link passHref href={route}>
                <a
                  className={`text-white font-mono opacity-70 text-xs md:text-base ${
                    index === 0 ? '' : 'ml-2 md:ml-6'
                  }`}
                >
                  {name}
                  <div className="flex flex-col justify-center items-center">
                    <Dot selected={pageKey === key} />
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="invisible md:visible relative">
        {alphaCount ? (
          <div className="text-white border border-white w-8 h-8 flex items-center justify-center mr-2 rounded-3xl absolute -left-10">
            <p>{alphaCount}</p>
          </div>
        ) : null}
        <div
          style={{
            width: 125,
          }}
        >
          {!walletShortValue ? (
            <StyledWalletDialogButton>Connect Wallet</StyledWalletDialogButton>
          ) : alphaCount ? (
            <MintLinkButton
              callToAction="Mint"
              href="/mint"
              className={'bg-green-800 text-white'}
            />
          ) : (
            <MintButton
              callToAction="Disconnect"
              onPress={() => {
                if (window) {
                  window.location.reload();
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { Header };
