import { UploadedFile } from "express-fileupload";
class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image :File;
    public idFollowing:number;
    public followersCount:number;
}

export default VacationModel;