import express from 'express'
import AuditoriumController from '../../controllers/auditorium/auditoriumController'

const auditoriumController=new AuditoriumController()

const  auditorium_route=express.Router()


auditorium_route.post('/addvenue',auditoriumController.addVenue)

auditorium_route.get('/allvenues',auditoriumController.allVEnues)

auditorium_route.put('/updatevenues',auditoriumController.updateVenues)

export default auditorium_route