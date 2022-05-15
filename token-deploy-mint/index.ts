import { 
    Connection,
    PublicKey, 
    Transaction,
    Keypair,
} from "@solana/web3.js";

import { 
    TOKEN_PROGRAM_ID, 
    getOrCreateAssociatedTokenAccount,
    createMint, 
    mintTo, 
    getAccount, 
    Account,
} from "@solana/spl-token";

import bs58 from "bs58";

require('dotenv').config();
const env = process.env;
const rpc_config = env.RPC_CONFIG;
const rpc_url: any = rpc_config == "mainnet" ? env.MAINNET_RPC : env.DEVNET_RPC;

const commitment = 'confirmed'
const connection = new Connection(rpc_url, commitment);

const phantom_privkey_str: any= env.PHANTOM_PRIVKEY;
const mint_authority_str: any = env.MINT_AUTHORITY;
const freeze_authority_str: any = env.FREEZE_AUTHORITY;
const authority_privkey = bs58.decode(phantom_privkey_str);
const payer = Keypair.fromSecretKey(authority_privkey);
const mint_authority = new PublicKey(mint_authority_str);
const freeze_authority = new PublicKey(freeze_authority_str);

async function mint_token() {
    const cleandefi_mint = await createMint(
        connection,
        payer,
        mint_authority,
        freeze_authority,
        6
    );

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        cleandefi_mint,
        payer.publicKey
    )

    await mintTo(
        connection,
        payer,
        cleandefi_mint,
        tokenAccount.address,
        mint_authority,
        2000000000000000,
      )
    
    console.log("RPC net: ", rpc_config);
    console.log("Token Address: ", cleandefi_mint.toBase58());
}

(async() => {
    await mint_token();
})();



