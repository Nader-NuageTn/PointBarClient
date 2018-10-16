
export class NewClientModel{

    public id:number;
    public  firstName:String;
    public  lastName:String;
    public email:String;;
    public phone:String;
    public numberAuto:number;
    public comment:String;
    constructor(id:number,firstName:String, lastName:String, email:String, phone:String,numberAuto:number,comment:String) {
   
        this.id =id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.numberAuto = numberAuto;
        this.comment=comment;
    }
}