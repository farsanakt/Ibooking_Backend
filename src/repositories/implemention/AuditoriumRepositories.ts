import AuditoriumUser,{ IAuditoriumUser } from "../../models/auditorium/auditoriumUserModel";
import Venue, { IVenue } from "../../models/auditorium/venueModel";

export class AuditoriumRepositories{

    async createUser(data:any):Promise<IAuditoriumUser|null>{
       return await AuditoriumUser.create(data)
    }

    async findUserByEmail(email:string):Promise<IAuditoriumUser |null>{
        return await AuditoriumUser.findOne({email:email})
    }

    async findUserByOwnerName(ownername:string):Promise<IAuditoriumUser| null>{

        return await AuditoriumUser.findOne({ownerName:ownername})

    }

    async createVenue(data:any):Promise<IVenue|null>{

        return await Venue.create(data)

    }

    async getAllVenues():Promise<IVenue[]|null>{

        return await Venue.find()
    }

    async findVenueById(id: string): Promise<IVenue | null> {
    return await Venue.findById(id);
   }

    async updateVenue(id: string, data: Partial<IVenue>): Promise<IVenue | null> {
        return await Venue.findByIdAndUpdate(id, data, { new: true });
    }

    async findVenueByName(data:any){
        return await Venue.findOne({name:data.name})
    }

    async findAuditorium(event: string, place: string): Promise<IAuditoriumUser | null> {

        try {
            
            if (!event || !place) {
            throw new Error('Event and place must be non-empty strings');
            }

           
            const normalizedEvent = event.trim().toLowerCase();
            const normalizedPlace = place.trim().toLowerCase();

        
            const eventRegex = new RegExp(`^${normalizedEvent}$`, 'i');
            const placeRegex = new RegExp(`^${normalizedPlace}$`, 'i');
           

            const query = {
            events: { $in: [eventRegex] },
            locations: { $in: [placeRegex] }
            };

            console.log('Query:', JSON.stringify(query, (key, value) => {
            if (value instanceof RegExp) return value.toString();
            return value;
            }, 2));

            const result = await AuditoriumUser.findOne(query);
            
            return result
        } catch (error) {
            console.error("Repository Error: Failed to find auditoriums", error);
            throw error;
        }
        }



}