import express from 'express'
import AuditoriumController from '../../controllers/auditorium/auditoriumController'
import upload from '../../middleware/upload'

const auditoriumController=new AuditoriumController()

const  auditorium_route=express.Router()


auditorium_route.post('/addvenue', upload.array('images', 4),auditoriumController.addVenue)

auditorium_route.get('/allvenues',auditoriumController.allVEnues)

auditorium_route.put('/updatevenues',auditoriumController.updateVenues)

auditorium_route.get('/findauditorium',auditoriumController.findAuditorium)

export default auditorium_route