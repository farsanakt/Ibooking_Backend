import { Request,Response } from "express"
import { AuditoriumService } from "../../services/auditorium/auditoriumSerivce"
import { HttpStatus } from "../../enums/httpStatus"


const auditoriumService=new AuditoriumService()
class AuditoriumController{

    async addVenue(req:Request,res:Response){

        try {

            const data=req.body

             if (typeof data.cities === "string") {
                data.cities = JSON.parse(data.cities);
                }
                if (typeof data.timeSlots === "string") {
                data.timeSlots = JSON.parse(data.timeSlots);
                }
                if (typeof data.amenities === "string") {
                data.amenities = JSON.parse(data.amenities);
                }
                if (typeof data.tariff === "string") {
                data.tariff = JSON.parse(data.tariff);
                }

            const files = req.files as Express.Multer.File[]

            const imageUrls = files.map((file) => (file as any).location)
 
            const response = await auditoriumService.addVenue({ ...data, images: imageUrls });

            if(!response){

                res.status(HttpStatus.BAD_REQUEST).json(response)

                return

            }
            
            res.status(HttpStatus.CREATED).json(response)

        } catch (error) {

            console.log(error,'error in auditorium controller')
            
        }

    }

    async allVEnues(req:Request,res:Response){

        try {

            const response=await auditoriumService.allVenues()
               
            console.log(response,'looppppp')
            if(response){

                res.status(HttpStatus.CREATED).json(response)

            }

            res.status(HttpStatus.BAD_REQUEST).json(response)
            
        } catch (error) {
            
        }

    }

    async updateVenues(req:Request,res:Response){

        try {

            const {data,id}=req.body

            const response=await auditoriumService.updateVenues(id,data)

            if(!response){

                res.status(HttpStatus.BAD_REQUEST).json(response)

                return

            }

            res.status(HttpStatus.CREATED).json(response)
            
        } catch (error) {

            console.log('something went wrong in updateVenue contoller')
            
        }

    }


async findAuditorium(req: Request, res: Response) {
  try {
    const event = req.query.event as string
    const place = req.query.place as string

    console.log('Controller received:', { event, place });

    
    const response = await auditoriumService.findAuditorium(place, event)

    if (response) {
      res.status(200).json(response);
      return
    }

     res.status(404).json({ message: 'No matching auditoriums found' });
     return
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



    


}


export default AuditoriumController