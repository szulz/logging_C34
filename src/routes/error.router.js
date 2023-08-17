const express = require('express')
const errorRouter = express.Router();

errorRouter.get('/', async (req, res) => {
    
    req.logger.error('this is a error')
    req.logger.warn('this is a watn')
    req.logger.info('this is a info')
    res.send({ message: 'hola loli' })
})


module.exports = errorRouter