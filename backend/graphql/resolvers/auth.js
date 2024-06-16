import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user.js';
import { errorNames } from '../../helpers/errorConstants.js';

export default {
  createUser: async args => {
    try {
      console.log("before");
      const existingUser = await User.findOne({
        $or: [
          { email: args.userInput.email },
          { identification_num: args.userInput.identification_num }
        ]
      });
      console.log("after");
      if (existingUser) {
        throw new Error(errorNames.USER_ALREADY_EXISTS);
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      let user_options = {
        name: args.userInput.name,
        identification_num: args.userInput.identification_num,
        email: args.userInput.email,
        password: hashedPassword,
        createdAt: new Date()
      };

      if (args.userInput?.role && args.userInput.role === 'dean') {
        user_options = { ...user_options, role: 'dean' };
      }
      const user = new User(user_options);

      const result = await user.save();
      return {
        name: result._doc.name,
        _id: result.id,
        identification_num: result._doc.identification_num,
        email: result._doc.email
      };
    } catch (err) {
      throw err;
    }
  },

  login: async (args, req) => {
    let input_role = (args.logInput?.role && args.logInput.role === 'student')
      ? 'student' : 'dean';
    console.log('role =', input_role)
    console.log('id = ', args.logInput.identification_num)
    const user = await User.findOne(
      {
        identification_num: args.logInput.identification_num,
        role: input_role
      }
    );
    if (!user) {
      throw new Error(errorNames.INNCORRECT_ACCOUNT);
    }
    const isEqual = await bcrypt.compare(args.logInput.password, user.password);
    if (!isEqual) {
      throw new Error(errorNames.INNCORRECT_PASSWORD);
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        identification_num: user.identification_num,
        role: user.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h'
      }
    );
    req.res.cookie('secretToken', token, { maxAge: process.env.COOKIE_MAX_AGE, httpOnly: false });
    return {
      userId: user.id,
      role: user.role,
      token
    };
  }
};