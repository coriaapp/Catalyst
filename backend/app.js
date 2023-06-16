const express = require('express');
const { Polybase } = require('@polybase/client');
const { ethPersonalSign } = require('@polybase/eth');
const { ENS } = require('@ensdomains/ensjs');
const { ethers, JsonRpcProvider } = require('ethers');
const app = express();
const port = 3000;

const provider = new JsonRpcProvider("https://mainnet.infura.io/v3/6e92ae9db8e3403481172d06ee1e409a")

const ENSInstance = new ENS()

// Initialize the Polybase client
const db = new Polybase({
    defaultNamespace: "pk/0x3649c2c7155d1277e96bded8b1240e9ccb3cfbd27accb97f8b3cfe9f3d75902b68a7a305e05ea659c5844cedd71fe33df9d27c7a4d7f74bb41abbb120af69443/Catalyst",
  });

  const privateKey = '0x1553516c9b094ecb78e50e16c1ed49d412e12368005bbc78a0abcd01df96443b';

  db.signer((data) => {
    return {
      h: 'eth-personal-sign',
      sig: ethPersonalSign(privateKey, data)
    }
  })

async function initializePolybase() {
    await db.applySchema(`
  @public
  collection Image {
    id: string;
    ipfs: string;

    constructor(id: string, ipfs: string) {
      this.id = id;
      this.ipfs = ipfs;
    }
  }

  @public
  collection Library {
    id: string;
    images: Image[];

    constructor(id: string) {
      this.id = id;
      this.images = [];
    }

    function addImage(image: Image) {
          this.images.push(image);
      
    }
  }

  `,
        "Catalyst"
    ); // your-namespace is optional if you have defined a default namespace
}

// Middleware to parse request body as JSON
app.use(express.json());

// API endpoint for creating a library
app.post('/create-library', async (req, res) => {
    try {
        // request body should contain a walletId
        const { walletId } = req.body;

        const id = walletId;

        console.log(walletId);
        if (walletId == null) {
            res.status(400).json({ success: false, message: 'Missing walletId.' });
            return;
        }


        await db.collection("Library").create([id]);

        // Return a success response
        res.status(200).json({ success: true, message: 'Library created successfully.' });
    } catch (error) {
        // Return an error response
        console.error('Error creating library:', error);
        res.status(500).json(error);
    }
});

// API endpoint for storing images in a library
app.post('/store-images', async (req, res) => {
    try {
        const { libraryId, images } = req.body;

        for (let i = 0; i < images.length; i++) {
            const random = (Math.random() * 100000000000000000000).toString();
            const image = images[i];
            await db.collection("Image").create([random, image]);
            await db.collection("Library").record(libraryId).call("addImage", [random]);
        }

        // Return a success response
        res.status(200).json({ success: true, message: 'Images stored successfully.' });
    } catch (error) {
        // Return an error response
        console.log(error)
        res.status(500).json(error);
    }
});

app.post('/get-ens-name', async (req, res) => {
    try {
      await ENSInstance.setProvider(provider)
      const { walletAddress } = req.body;
        const profile = await ENSInstance.getProfile(
          walletAddress
        ) 
        console.log(profile)
        res.status(200).json({ success: true, message: profile });
    } catch (error) {
        // Return an error response
        console.log(error)
        res.status(500).json(error);
    }
  });

async function startServer(Initialize = false) {
    // Initialize Polybase

    if (Initialize) {
        await initializePolybase();
    }

    // Start the server
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}


startServer(true);
