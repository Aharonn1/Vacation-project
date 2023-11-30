import express, { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";
import imageHandler from "../2-utils/image-handler";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import VacationModel from "../4-models/vacation-model";
import vacationsService from "../5-services/vacations-service";

const router = express.Router();

router.get("/users/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request)
        const vacation = await vacationsService.getAllVacationsForUser(user);
        response.json(vacation)
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/users/follow/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const user = cyber.getUserFromToken(request)
        const vacationId = +request.params.vacationId;
        await vacationsService.follow(user.userId, vacationId)
        response.sendStatus(201)
    }
    catch (err: any) {
        next(err);
    }
});


router.delete("/users/follow/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request)
        const vacationId = +request.params.vacationId;
        await vacationsService.unfollow(user.userId, vacationId)
        response.sendStatus(201)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/users/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = imageHandler.getAbsolutePath(imageName)
        response.sendFile(absolutePath)
    } catch (err: any) {
        next(err)
    }
})






//-----------------------------------------------------------------------------------------------------



router.get("/admin/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacation = await vacationsService.getAllVacationsForAdmin()
        response.json(vacation)
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/admin/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationsService.addVacation(vacation);
        response.status(210).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response:Response, next:NextFunction) => {
    try {
        console.log(request.body);
        request.body.vacationId = +request.params.vacationId;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updateVacation = await vacationsService.updateVacation(vacation);
        response.json(updateVacation);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/admin/vacations/:vacationId([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction)=>{
    try{  
        const vacationId = +request.params.vacationId;
        await vacationsService.deleteVacation(vacationId);
        response.sendStatus(204)
    }catch(err:any){
        next(err)
    }
})

router.get("/admin/vacations/:vacationId([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction)=>{
    try{
        const id = +request.params.vacationId;
        const vacation = await vacationsService.getOneVacation(id);
        response.json(vacation)
    }catch(err:any){
        next(err)
    }
})


export default router;