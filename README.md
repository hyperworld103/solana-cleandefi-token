# Cleandefi Token Contract
This cleandefi contract is for Cleandefi token on Solana
### Token Deploy
```sh
# Clone the repo
    git clone https://gitlab.com/merehead/cleandfi/cleandefi_token.git
# Cd token deploy node script
    cd token-deploy-mint
# Install all dependencies
    npm install
# Dot env setting
    RPC_CONFIG="devnet"   or  RPC_CONFIG="mainnet"
    PHANTOM_PRIVKEY=Your Phantom Private Key
    MINT_AUTHORITY=Your Wallet Address
    FREEZE_AUTHORITY=Your Wallet Address
# Run
    npm run
```
You can see the deployed cleandefi token address like this.
``` sh
RPC net:  devnet
Token Address:  BEjQsAbkd9vsBD4GF1aeCGVemqU8VsxfqkBKSGoA3R2C
```
### Cleandefi Token Instructions
    InitializeMint {
        decimals: u8,
        mint_authority: Pubkey,
        freeze_authority: COption<Pubkey>,
    }
        Initializes a new mint and optionally deposits all the newly minted.
        decimals: Number of base 10 digits to the right of the decimal place.
        mint_authority: The authority/multisignature to mint tokens.
        freeze_authority: The freeze authority/multisignature of the mint.
    
    InitializeAccount
        Initializes a new account to hold tokens.  If this account is associated
    
    Transfer {
        amount: u64
    }
        Transfers tokens from one account to another either directly or via a delegate
        amount: The amount of tokens to transfer
    
    Approve {
        amount: u64,
    }
        Approves a delegate.  A delegate is given the authority over tokens on behalf of the source account's owner
        amount: The amount of tokens the delegate is approved for

     SetAuthority {   
        authority_type: AuthorityType,
        new_authority: COption<Pubkey>,
    }
        Sets a new authority of a mint or account
        authority_type: The type of authority to update
        new_authority: The new authority

    MintTo {
        amount: u64,
    }
        Mints new tokens to an account.  The native mint does not support
        amount: The amount of new tokens to mint
    
    Burn {
        amount: u64,
    }
        Burns tokens by removing them from an account
        amount: The amount of tokens to burn
    
    ApproveChecked {
        amount: u64,
        decimals: u8,
    }
        Approves a delegate.  A delegate is given the authority over tokens on behalf of the source account's owner
        amount: The amount of tokens the delegate is approved for
        decimals: Expected number of base 10 digits to the right of the decimal place
    
    MintToChecked {
        amount: u64,
        decimals: u8,
    }
        Mints new tokens to an account
        amount: The amount of new tokens to mint
        decimals: Expected number of base 10 digits to the right of the decimal place
    
    BurnChecked {
        amount: u64,
        decimals: u8,
    }
        Burns tokens by removing them from an account
        amount:  The amount of tokens to burn
        decimals: Expected number of base 10 digits to the right of the decimal place
