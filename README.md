                     _ _   _       _                    
     _ __ ___  _   _| | |_(_)_ __ | | _____  _____ _ __ 
    | '_ ` _ \| | | | | __| | '_ \| |/ _ \ \/ / _ \ '__|
    | | | | | | |_| | | |_| | |_) | |  __/>  <  __/ |   
    |_| |_| |_|\__,_|_|\__|_| .__/|_|\___/_/\_\___|_|   
                            |_|     

A simple git multiplexer -- for when you want to push the same code to multiple origins.

## how

Add a user. Call him `multiplexer`, if you like.

Make sure he has a .ssh directory:

    sudo su multiplexer
    mkdir ~/.ssh && touch ~/.ssh/authorized_keys
    chmod -R go-rwx ~/.ssh

Add your pubkey to his authorized keys like so:

    cat 'command="gitmultiplex",no-port-forwarding,no-X11-forwarding,no-pty ' > ~/.ssh/authorized_keys
    cat <yourpubkey> >> ~/.ssh/authorized_keys

Make some multiplexer files!

    mkdir ~/.multiplex
    vi ~/.multiplex/$YOUR_REPO

Multiplex files are just JSON arrays of SSH git remotes:

    [
        'git@github.com:chrisdickinson/batteries.no.de.git',
        'node@batteries.no.de:repo'
    ]

Okay, he's all good, `exit` back to your main account. Make sure you have `gitmultiplex` installed on your main account:

    git clone git://github.com/chrisdickinson/gitmultiplexer.git
    cd gitmultiplexer.git && npm install .

In your repo, add the following remote:

    git remote add multiplex multiplex@localhost:$YOUR_REPO

Now, when you `git push multiplex master`, your changes will be pushed to `no.de` and `github.com` simultaneously! 

Licensed BSD.
