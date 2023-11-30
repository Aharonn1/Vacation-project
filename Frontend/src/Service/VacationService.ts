import axios from "axios";
import VacationModel from "../Models/Vacation-Model";
import { VacationActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/appConfig";

class VacationService {

    public async getAllVacation(): Promise<VacationModel[]> {
        let vacation = vacationStore.getState().vacation;
        if (vacation.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUsersUrl);
            vacation = response.data;
            vacationStore.dispatch({ type: VacationActionType.FetchVacation, payload: vacation })
        }
        return vacation
    }


    public async getAllVacationForAdmin(): Promise<VacationModel[]> {
        let vacation = vacationStore.getState().vacation;
        if (vacation.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.vacationsAdminUrl);
            vacation = response.data;
            vacationStore.dispatch({ type: VacationActionType.FetchVacation, payload: vacation })
        }
        return vacation
    }

    public async getUserFavoriteVacations(): Promise<VacationModel[]> {
        let vacations = await this.getAllVacation();
        const favoriteVacations = vacations.filter(v => v.idFollowing === 1 && v)
        console.log(favoriteVacations)
        await this.getAllVacation();
        // vacationStore.dispatch({type: VacationActionType.FavoriteVacations, payload: vacations})
        return favoriteVacations;
    }

    public async getVacationNotActive():Promise<VacationModel[]>{
        const day = new Date();
        console.log(day);
        let vacations = await this.getAllVacation();
        const vacationNotActive = vacations.filter(v => new Date(v.startDate) > day)
        console.log(vacationNotActive);
        await this.getAllVacation();
        return vacationNotActive;
        
    }      
    
    public async getVacationActive():Promise<VacationModel[]>{
        const day = new Date();
        console.log(day);
        let vacations = await this.getAllVacation();
        const vacationActive = vacations.filter(v => new Date(v.startDate) <= day && new Date(v.endDate) >= day)
        console.log(vacationActive);
        await this.getAllVacation();
        return vacationActive;   
    } 

    public async addVacation(vacation:VacationModel):Promise<void>{
        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.post<VacationModel>(appConfig.vacationsAdminUrl , vacation,{headers})
        const addedVacation = response.data;
        vacationStore.dispatch({type:VacationActionType.AddVacation, payload: addedVacation})
    }

    public async getOneVacation(vacationId:number):Promise<VacationModel>{
        let vacations = vacationStore.getState().vacation;
        let vacation = vacations.find(v => v.vacationId === vacationId )  
        if(!vacation){
            const response = await axios.get<VacationModel>(appConfig.vacationsAdminUrl + vacationId)
            vacation = response.data;
        }
        return vacation;
    
    }

    public async updateVacation(vacation:VacationModel):Promise<void>{
        const headers = {"Content-Type": "multipart/form-data"};
        const response = await axios.put<VacationModel>(appConfig.vacationsAdminUrl +  vacation.vacationId, vacation , {headers});
        const updateVacation = response.data;
        console.log(updateVacation);
        
        vacationStore.dispatch({type:VacationActionType.updateVacation , payload: updateVacation});
    }

    public async deleteVacation(vacationId:number):Promise<void>{
        await axios.delete(appConfig.vacationsAdminUrl + vacationId);
        vacationStore.dispatch({type:VacationActionType.DeleteVacation,payload:vacationId})
    }

}

const vacationService = new VacationService();
export default vacationService;