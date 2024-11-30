import express from 'express';
import User from '../../models/User.js';
import path from 'path';
import bcrypt from 'bcrypt';


const router = express.Router();


router.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/views', 'index.html'));
});

router.get('/signIn', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/views', 'signIn.html'));
});


router.get('/signUp', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/views', 'signUp.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/views', 'about.html'));
});
router.get('/products', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/views', 'products.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/views', 'contact.html'));
});

router.get('/addToCart', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/views', 'addToCart.html'));
});

router.post('/signUp', async (req, res) => {
    const { username, email, password } = req.body;

    try {
       
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' }); // Respond with success message
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ message: 'Server error', error }); // Handle server errors
    }
});



router.post('/signIn', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
      const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }


        res.status(200).json({ message: 'Sign in successful' }); // Respond with success message
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ message: 'Server error', error }); // Handle server errors
    }
});

router.get('/api/products.json', (req, res) => {
    res.type('application/json');
    res.sendFile(path.join(process.cwd(), 'public/api', 'products.json'));  });
  router.get('/js/getCartProducts', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(process.cwd(), 'public/js', 'getCartProducts.js'));
  });
  router.get('/js/showToast', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(process.cwd(), 'public/js', 'showToast.js'));
  });
  router.get('/js/updateCartValue', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(process.cwd(), 'public/js', 'updateCartValue.js'));
  });
  
  router.get('/js/fetchQuantityFromCartLS', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(process.cwd(), 'public/js', 'fetchQuantityFromCartLS.js'));
  });
  router.get('/js/incrementDecrement', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(process.cwd(), 'public/js', 'incrementDecrement.js'));
  });
  
  router.get('/js/removeProdFromCart', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(process.cwd(), 'public/js', 'removeProdFromCart.js'));
  });
  
  
  router.get('/js/updateCartProductTotal', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(process.cwd(), 'public/js', 'updateCartProductTotal.js'));
  });
  

export default router;
