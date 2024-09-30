import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModels.js';

import validatePassword from '../utils/validatePassword.js';
import validateEmail from '../utils/validateEmail.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

const userControllers = {
    register: (req, res) => {
        const { email, password, rePassword } = req.body;

        //check if email already exist
        const emailExist = User.getByEmail(email);
        if (emailExist) {
            return res.status(409).render('404', {
                title: 'Email already exist',
                message: 'Email already exist'
            });
        }

        //if email doesn't exist validate email, password and match password with rePassword
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        const doPasswordsMatch = matchPasswords(password, rePassword);

        if (isValidEmail && isValidPassword && doPasswordsMatch) {
            //hash passwords
            const hashedPassword = hashPassword(password);
            const newUser = User.add({ email, password: hashedPassword });

            res.status(302).redirect('/api/login');
        } else {
            res.status(400).render('404', {
                title: 'Invalid email or password',
                message: 'Invalid email or password'
            });
        }
    },
    login: (req, res) => {
        const { email, password } = req.body;
        //check if email exist
        const emailExist = User.getByEmail(email);
        if (!emailExist) {
            return res.status(404).render('404', {
                title: 'User not found',
                message: 'User not found, please register'
            });
        }

        //check if the password is correct
        bcrypt.compare(password, emailExist.password, (err, isValid) => {
            if (err) {
                console.error(err);
            }
            if (isValid) {
                //create token
                const token = jwt.sign(
                    { email: emailExist.email },
                    process.env.TOKEN_SECRET
                );
                if (token) {
                    res.cookie('token', token, { httpOnly: true });
                    res.status(200).redirect('/api/products');
                }
            } else {
                res.status(409).render('404', {
                    title: 'Invalid email or password',
                    message: 'Password or email is invalid'
                });
            }
        });
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).redirect('/api/products');
    },

    getRegisterForm: (req, res) => {
        res.status(200).render('register-form');
    },
    getLoginForm: (req, res) => {
        res.status(200).render('login-form');
    }
};

export default userControllers;
