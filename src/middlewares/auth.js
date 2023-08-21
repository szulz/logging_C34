const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_STATUS } = require("../config/env.config.js");

class Auth {

    async isAdmin(req, res, next) {
        if (req.user.role == 'admin') {
            return next();
        } else {
            throw new Error({ message: 'You have no permission to make perform these actions' })
        }
    }

    async denieUsersInSession(req, res, next) {
        if (req.session.user) {
            console.log('There is a current session active');
            return res.redirect('/products')
        }
        return next()
    }

    async allowUsersInSession(req, res, next) {
        if (req.session.user) {
            console.log('There is a current session active');
            return next()
        }
        return res.redirect('/auth/login')
    }

    async isUserCart(req, res, next) {
        if (req.params.cid === req.session.user.cartID) {
            return next()
        }
        return res.redirect('/auth/fail')

    }

    async blockAdmin(req, res, next) {
        if (req.user.role == 'admin') {
            return res.send({ message: 'Admins have not permission to do this' })
        }
        return next();
    }
}


module.exports = Auth;