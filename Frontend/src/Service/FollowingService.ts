import { VacationActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/appConfig";
import axios from "axios";

class FollowingService {

    async addFollow(vacationId: number): Promise<void> {
        try{
            const response = await axios.post(appConfig.followUrl + vacationId);
            const addedFollow = response.data;
            vacationStore.dispatch({ type: VacationActionType.follow, payload: vacationId })
        }catch(err:any){
            console.log(err)
        }
    }

    async unfollow(vacationId: number): Promise<void> {
        try{
            await axios.delete(appConfig.followUrl + vacationId)
            vacationStore.dispatch({ type: VacationActionType.unfollow, payload: vacationId })
            vacationStore.dispatch({ type: VacationActionType.RemoveFollow, payload: vacationId })
        }catch(err:any){
            console.log(err)
        }
    }
}

const followingService = new FollowingService();
export default followingService