export interface PageProps {
  pageProps: {
    pageKey: string;
    title: string;
  };
}

export interface MintItem {
  id: number;
  title: string;
  artistFirstName: string;
  artistLastName: string;
  artistSocial: string;
  collectionName: string;
  numberOfLikes: number;
  mintImage: string;
  mintTimestamp: string;
  concept: string;
}
