import { createFungible, createV1, mintV1, mplTokenMetadata, TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import { generateSigner, keypairIdentity, percentAmount } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { userKeypair } from "./helpers";

const umi = createUmi('https://api.devnet.solana.com');

const keypair = umi.eddsa.createKeypairFromSecretKey(userKeypair.secretKey);

umi.use(keypairIdentity(keypair))
    .use(mplTokenMetadata())

const metadata = {
    name: "Rick Rollz",
    symbol: "rrollz",
    uri: "https://gist.githubusercontent.com/mconstant/bb01f8d3b070e5c5508058aa618ca189/raw/f089aaab1b5a47b2e416413b5e0330a62a678d1b/spl-token.json",
};

const mint = generateSigner(umi);

// async function createMetadataDetails() {
//     await createV1(umi, {
//         mint,
//         authority: umi.identity,
//         name: metadata.name,
//         symbol: metadata.symbol,
//         uri: metadata.uri,
//         sellerFeeBasisPoints: percentAmount(0),
//         decimals: 9,
//         tokenStandard: TokenStandard.Fungible,
//     }).sendAndConfirm(umi)
// }

// async function mintToken() {
//     await mintV1(umi, {
//         mint: mint.publicKey,
//         authority: umi.identity,
//         amount: 10_000,
//         tokenOwner: umi.identity.publicKey,
//         tokenStandard: TokenStandard.Fungible,
//     }).sendAndConfirm(umi)
// }

async function createFungibleOneLiner() {
    createFungible(umi, {
        mint,
        authority: umi.identity,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        sellerFeeBasisPoints: percentAmount(0),
        decimals: 9,
    }).sendAndConfirm(umi)
}

createFungibleOneLiner()
    .then(() => console.log(`success \ntx: https://explorer.solana.com/address/${mint.publicKey}?cluster=devnet`))
    .catch(err => console.error("error minting the tokens", err))


// createMetadataDetails().
//     then(() => console.log('successfully crated our metadata accounts'))
//     .catch(err => console.error("error minting the tokens", err))

// mintToken()
//     .then(() => console.log("Successfully minted our Gold Token"))
//     .catch(err => console.error("error minting the tokens", err))
