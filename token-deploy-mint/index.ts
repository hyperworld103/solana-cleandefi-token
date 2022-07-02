import { 
    Connection,
    PublicKey, 
    Transaction,
    Keypair,
    TransactionInstruction,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    sendAndConfirmTransaction,
    ConfirmOptions
} from "@solana/web3.js";

import { struct, u8 } from '@solana/buffer-layout';
import { publicKey } from '@solana/buffer-layout-utils';

import { 
    TOKEN_PROGRAM_ID, 
    createAccount,
    getOrCreateAssociatedTokenAccount,
    createAssociatedTokenAccount,
    createMint, 
    mintTo, 
    getAccount, 
    Account,
    getAssociatedTokenAddress,

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

const token_program_id = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');

async function mint_token() {
    let mint = await createMint(
        connection,
        payer,
        mint_authority,
        freeze_authority,
        6,
        Keypair.generate(),
        undefined,
        token_program_id
    );

    console.log("Token Address: ", mint.toBase58());

    const owner = Keypair.generate();
    const associatedAddress = await getAssociatedTokenAddress(
        mint,
        owner.publicKey,
        false,
        token_program_id,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );
    try {
        const createdAddress = await createAccount(
            connection,
            payer,
            mint,
            owner.publicKey,
            undefined, // uses ATA by default
            undefined,
            token_program_id
        );  
        console.log(createdAddress.toBase58());
        console.log(associatedAddress.toBase58());
    } catch(err) {
        console.log(err);
    }

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        cleandefi_mint,
        payer.publicKey,
        false,
        undefined,
        undefined,
        token_program_id
    )
    await mintTo(
        connection,
        payer,
        cleandefi_mint,
        tokenAccount.address,
        mint_authority,
        2000000000000000,
        [payer],
        undefined,
        token_program_id
      )
    
    console.log("RPC net: ", rpc_config);
}

(async() => {
    await mint_token();
})();



