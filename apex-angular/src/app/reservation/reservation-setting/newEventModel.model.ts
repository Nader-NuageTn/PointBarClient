import { ReservationDateModel } from './ReservationDateModel.model';

export class NewEvenModel{


    public  title:String;
    public  date:ReservationDateModel;
    public  description:String;
    
    constructor(title:String, date:ReservationDateModel, description:String) {

        this.title =  title;
        this.date = date;
        this.description = description;

              
    }
}