import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public image: UploadedFile;
    public imageName: string;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
    }


    // private static postValidationSchema = Joi.object({
    //     vacationId : Joi.number().optional().integer().positive(),
    //     destination : Joi.string().required().max(50),
    //     description : Joi.string().required().max(1000),
    //     startDate : Joi.string().required(),
    //     endDate : Joi.string().required(),
    //     price : Joi.number().required().min(500),
    //     image : Joi.object().required(),
    //     imageName : Joi.string().optional()
    // })

    // private static putValidationSchema = Joi.object({
    //     vacationId: Joi.number().required().integer().positive(),
    //     destination: Joi.string().required().min(2).max(100),
    //     description: Joi.string().required().min(2).max(100),
    //     startDate : Joi.string().required(),
    //     endDate : Joi.string().required(),
    //     price: Joi.number().required().min(0).max(1000),
    //     image: Joi.object().optional(),
    //     imageName: Joi.string().forbidden().min(38).max(50)
    // })

    // public validate():void{
    //     const result = VacationModel.postValidationSchema.validate(this);
    //     if(result.error) throw new ValidationError(result.error.message)
    // }

    // public validatePut():void{
    //     const result = VacationModel.putValidationSchema.validate(this);
    //     if(result.error) throw new ValidationError(result.error.message)
    // }

    // TODO: add validation:
    
}

export default VacationModel;