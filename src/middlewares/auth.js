const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_STATUS } = require("../config/env.config.js");
const CustomError = require("../services/errors/custom-error.js");
const EErrors = require("../services/errors/enums.js");
const GenerateErrorCauses = require("../services/errors/info.js");
const generateErrorCauses = new GenerateErrorCauses
const { addLogger } = require("../utils/logger.js");

class Auth {

    isAdmin(req, res, next) {
        try {
            if (req.user.role == 'admin') {
                return next();
            } else {
                req.logger.error('Someone tried to post a product without permission')
                CustomError.createError({
                    name: 'Not admin',
                    message: 'Only admins can add products',
                    cause: generateErrorCauses.notAdmin(),
                    code: EErrors.NOT_ADMIN,
                })
            }
        } catch {
            req.logger.error('Someone tried to post a product without permission')
            CustomError.createError({
                name: 'Not admin',
                message: 'Only admins can add products',
                cause: generateErrorCauses.notAdmin(),
                code: EErrors.NOT_ADMIN,
            })
        }
    }

    async denieUsersInSession(req, res, next) {
        if (req.session.user) {
            req.logger.info('There is a current session active');
            return res.redirect('/products')
        }
        return next()
    }

    async allowUsersInSession(req, res, next) {
        if (req.session.user) {
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

    blockAdmin(req, res, next) {
        if (req.user.role == 'admin') {
            req.logger.warn('Admins tried to use the chat room / use the post method in carts')
            CustomError.createError({
                name: 'Admins can not chat nor post in carts',
                message: 'You must have the user role to be able to use the chat room / or to post in carts',
                cause: generateErrorCauses.blockAdminChat(),
                code: EErrors.BLOCK_CHAT,
            })
        }
        return next();
    }
}


module.exports = Auth;