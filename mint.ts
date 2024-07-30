import { percentAmount, generateSigner } from '@metaplex-foundation/umi';
import { TokenStandard, createAndMint } from '@metaplex-foundation/mpl-token-metadata';
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import "@solana/web3.js";
import { setupUmiClient } from "./utils/setupClient";

const umi = setupUmiClient().umi;
const userWallet = setupUmiClient().userWallet;

const metadata = {
  name: "velvet toadstool",
  symbol: "VELVTO",
  uri: "https://sapphire-secondary-cardinal-120.mypinata.cloud/ipfs/QmS1GdvymnZVxzUgbqNrVzpvdJbrUWKhtgxZvYL1HxAuQk", // Replace with the actual URL of your metadata (token.json)
};

// Create a new Mint PDA
const mint = generateSigner(umi);

// Use Token Metadata to mint tokens
umi.use(mplTokenMetadata());

// Send a transaction to deploy the Mint PDA and mint 1 million of our tokens
createAndMint(umi, {
  mint,
  authority: umi.identity,
  name: metadata.name,
  symbol: metadata.symbol,
  uri: metadata.uri,
  sellerFeeBasisPoints: percentAmount(0),
  decimals: 9,
  amount: 1000000000_000000000,
  tokenOwner: userWallet.publicKey,
  tokenStandard: TokenStandard.Fungible,
}).sendAndConfirm(umi).then(() => {
  console.log("Successfully minted 1 billion tokens (", mint.publicKey, ")");
});
