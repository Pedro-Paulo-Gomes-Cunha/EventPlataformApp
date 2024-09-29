const express = require('express')
const router = express.Router()

const usersController = require('../app/controllers/usersController')
const registrationsController = require('../app/controllers/registrationsController')
const eventsController = require('../app/controllers/eventsController')

const {authenticateUser}=require('../app/middlewares/authenticateUser')
const {onlyAdminAccess}=require('../app/middlewares/onlyAdminAccess')

router.get('/users',usersController.list)
router.get('/users/agents',usersController.listEventAgents)
router.get('/users/customers',usersController.listCustomers)
router.post('/users/register',usersController.register)
router.post('/users/login',usersController.login)
router.delete('/users/logout',authenticateUser,usersController.logout)
router.get('/users/:id',usersController.show)
router.put('/users/:id',authenticateUser,usersController.update)
router.delete('/users/:id',onlyAdminAccess,usersController.destroy)

router.get('/events',authenticateUser,eventsController.list)
router.post('/events',authenticateUser,eventsController.create)
router.get('/events/:id',authenticateUser,eventsController.show)
router.put('/events/:id',authenticateUser,eventsController.update)
router.delete('/events/:id',authenticateUser,eventsController.destroy)

router.get('/registrations',authenticateUser,registrationsController.list)
router.post('/registrations',authenticateUser,registrationsController.create)
router.get('/registrations/:id',authenticateUser,registrationsController.show)
router.put('/registrations/:id',authenticateUser,registrationsController.update)
router.delete('/registrations/:id',authenticateUser,registrationsController.destroy)


// router.delete('/*',(req,res)=>{
//     res.status('401').send({error:'Page not available'})
// })

module.exports = {
    router
}