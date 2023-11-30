import axios from "axios";
import FollowModel from "../Models/Follow-Model";
import { VacationActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/appConfig";

class FollowingService {

    public async addFollow(vacationId: number): Promise<void> {
        const response = await axios.post(appConfig.followUrl + vacationId);
        const addedFollow = response.data;
        vacationStore.dispatch({ type: VacationActionType.follow, payload: vacationId })
        // vacationStore.dispatch({ type: VacationActionType.AddFollow, payload: vacationId })
    }

    public async unfollow(vacationId: number): Promise<void> {
        await axios.delete(appConfig.followUrl + vacationId)
        vacationStore.dispatch({ type: VacationActionType.unfollow, payload: vacationId })
        vacationStore.dispatch({ type: VacationActionType.RemoveFollow, payload: vacationId })
    }
}

const followingService = new FollowingService();
export default followingService