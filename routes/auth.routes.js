const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = Router();

router.post('/auth/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
       const user = await User.findOne({ name });
       if (user) {
           throw new Error('username already exists');
       }

       const mail = await User.findOne({ email });
       if (mail) {
            throw new Error('email already in use');
       }

       const salt = await bcrypt.genSalt(10);
       const passwordHash = await bcrypt.hash(password, salt);

       const newUser = await User.create({
           name, 
           email,
           passwordHash
       });

       res.status(201).json({
           name: newUser.name,
       });

    } catch(error) {
        res.status(500).json({ msg: 'Error while creating user', error: error.message });
    }
});


router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const mail = await User.findOne({ email });
      //console.log('this is', mail);
      if (!mail) {
          throw new Error('email not found');
      } 
      
      const compareHash = bcrypt.compareSync(password, mail.passwordHash);
      if (!compareHash) {
          throw new Error('username or password incorrect');
      }
  
      const payload = {
          id: mail.id,
          name: mail.name
      };

    //   res.status(200).json({ msg: `user ${mail.name}, logged in`});

      //crinado token
      const token = jwt.sign(
          payload,
          process.env.SECRET_JWT,
          { expiresIn: '1day' }
      );

      res.status(200).json({ msg: payload, token });

    } catch(error) {
      res.status(400).json({ msg: error.message });
    }
});

module.exports = router;
