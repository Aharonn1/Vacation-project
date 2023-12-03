import { VacationActionType, vacationStore } from "../Redux/VacationState";
import VacationModel from "../Models/Vacation-Model";
import appConfig from "../Utils/appConfig";
import axios from "axios";

class VacationService {

    async getAllVacation(): Promise<VacationModel[]> {
        try {
            let vacation = vacationStore.getState().vacation;
            if (vacation.length === 0) {
                const response = await axios.get<VacationModel[]>(appConfig.vacationsUsersUrl);
                vacation = response.data;
                vacationStore.dispatch({ type: VacationActionType.FetchVacation, payload: vacation })
            }
            return vacation
        } catch (err: any) {
            console.log(err)
        }
    }

    async getAllVacationForAdmin(): Promise<VacationModel[]> {
        let vacation = vacationStore.getState().vacation;
        if (vacation.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.vacationsAdminUrl);
            vacation = response.data;
            vacationStore.dispatch({ type: VacationActionType.FetchVacation, payload: vacation })
        }
        return vacation
    }

    async getUserFavoriteVacations(): Promise<VacationModel[]> {
        let vacations = await this.getAllVacation();
        const favoriteVacations = vacations.filter(v => v.idFollowing === 1 && v)
        await this.getAllVacation();
        return favoriteVacations;
    }

    async getVacationNotActive(): Promise<VacationModel[]> {
        const day = new Date();
        let vacations = await this.getAllVacation();
        const vacationNotActive = vacations.filter(v => new Date(v.startDate) > day)
        await this.getAllVacation();
        return vacationNotActive;
    }

    async getVacationActive(): Promise<VacationModel[]> {
        const day = new Date();
        let vacations = await this.getAllVacation();
        const vacationActive = vacations.filter(v => new Date(v.startDate) <= day && new Date(v.endDate) >= day)
        await this.getAllVacation();
        return vacationActive;
    }

    async addVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.post<VacationModel>(appConfig.vacationsAdminUrl, vacation, { headers })
        const addedVacation = response.data;
        vacationStore.dispatch({ type: VacationActionType.AddVacation, payload: addedVacation })
    }

    async getOneVacation(vacationId: number): Promise<VacationModel> {
        try {
            let vacations = vacationStore.getState().vacation;
            let vacation = vacations.find(v => v.vacationId === vacationId)
            if (!vacation) {
                const response = await axios.get<VacationModel>(appConfig.vacationsAdminUrl + vacationId)
                vacation = response.data;
            }
            return vacation;
        } catch (err: any) {
            console.log(err)
        }
    }

    async updateVacation(vacation: VacationModel): Promise<void> {
        try {
            const headers = { "Content-Type": "multipart/form-data" };
            const response = await axios.put<VacationModel>(appConfig.vacationsAdminUrl + vacation.vacationId, vacation, { headers });
            const updateVacation = response.data;
            vacationStore.dispatch({ type: VacationActionType.updateVacation, payload: updateVacation });
        } catch (err: any) {
            console.log(err)
        }
    }

    async deleteVacation(vacationId: number): Promise<void> {
        try {
            await axios.delete(appConfig.vacationsAdminUrl + vacationId);
            vacationStore.dispatch({ type: VacationActionType.DeleteVacation, payload: vacationId })
        } catch (err: any) {
            console.log(err)
        }
    }
}

const vacationService = new VacationService();
export default vacationService;