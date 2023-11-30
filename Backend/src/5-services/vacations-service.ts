import { OkPacket } from "mysql";
import appConfig from "../2-utils/appConfig";
import dal from "../2-utils/dal";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError } from "../4-models/client-errors";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";

async function getAllVacationsForUser(user: UserModel): Promise<VacationModel> {

    const sql = `
    SELECT DISTINCT 
    V.*,
    EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS idFollowing,
    COUNT(F.userId) AS followersCount,
    V.imageName AS imageName
    FROM vacations AS V LEFT JOIN followers AS F
    ON V.vacationId  = F.vacationId
    GROUP BY vacationId
    ORDER BY startDate 
    `;

    const vacation = await dal.execute(sql, user.userId)

    return vacation;
}

//-----------------------------------------------------------


async function follow(userId: number, vacationId: number): Promise<void> {
    const sql = "INSERT INTO followers VALUES(?,?)";
    await dal.execute(sql, userId, vacationId)
}

async function unfollow(userId: number, vacationId: number): Promise<void> {
    const sql = "DELETE FROM followers WHERE userID = ? AND vacationId = ?";
    await dal.execute(sql, userId, vacationId)
}

async function getAllVacationsForAdmin(): Promise<VacationModel[]> {
    const sql = `SELECT * FROM vacations ORDER BY startDate`;
    const vacation = await dal.execute(sql)
    return vacation;
}



async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    // vacation.validate();
    //TODO: validation
    vacation.imageName = await imageHandler.saveImage(vacation.image);

    const sql = "INSERT INTO vacations VALUES(DEFAULT,?,?,?,?,?,?)";

    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description
        , vacation.startDate,
        vacation.endDate, vacation.price, vacation.imageName);

    vacation.vacationId = result.insertId;

    delete vacation.image;

    return vacation;
}
async function updateVacation(vacation:VacationModel):Promise<VacationModel> {

    // vacation.validatePut();

    vacation.imageName = await getImageNameFromDB(vacation.vacationId)
    if(vacation.image){
        vacation.imageName = await imageHandler.updateImage(vacation.image,vacation.imageName)
 
    }

    const sql = `UPDATE vacations SET 
        destination = ?,
        description = ?,
        startDate = ?,
        endDate = ?,
        price = ?,
        imageName = ?
        WHERE vacationId = ?`;
        const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description,
        vacation.startDate,vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId);

    if (result.affectedRows === 0) 
    throw new ResourceNotFoundError(vacation.vacationId);

    delete vacation.image;
    return vacation;
}

async function deleteVacation(id: number):Promise<void> {

    const imageName = await getImageNameFromDB(id);

    imageHandler.deleteImage(imageName)

    const sql = "DELETE FROM vacations WHERE vacationId = ?";
    const result: OkPacket = await dal.execute(sql, id);

    if(result.affectedRows === 0) throw new ResourceNotFoundError(id)

}

async function getOneVacation(id:number):Promise<VacationModel> {
    const sql = `SELECT 
    vacationId AS vacationId,
    destination AS destination,
    description AS description,
    startDate AS startDate,
    endDate AS endDate,
    price AS price
    FROM vacations
    WHERE vacationId = ?`;
    const vacations = await dal.execute(sql,id);
    const vacation = vacations[0];
    if(!vacation) throw new ResourceNotFoundError(id);
    return vacation;
} 

async function getImageNameFromDB(id: number): Promise<string> {
    const sql = "SELECT imageName FROM vacations WHERE vacationId = ?"

    const vacations = await dal.execute(sql, id);

    const vacation = vacations[0];

    if (!vacation) return null;

    return vacations.imageName;
}

export default {
    getAllVacationsForAdmin,
    getAllVacationsForUser,
    addVacation,
    follow,
    unfollow,
    updateVacation,
    deleteVacation,
    getOneVacation
}