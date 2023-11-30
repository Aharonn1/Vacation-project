import { createStore } from "redux";
import VacationModel from "../Models/Vacation-Model";


export class VacationState {
    public vacation: VacationModel[] = [];
}

export enum VacationActionType {
    FetchVacation = "FetchVacation",
    AddVacation = "AddVacation",
    updateVacation = "updateVacation",
    DeleteVacation = "DeleteVacation",
    follow = "follow",
    unfollow = "unfollow",
    AddFollow = "AddFollow",
    RemoveFollow = "RemoveFollow",
    FavoriteVacations = "FavoriteVacations"

}

export interface vacationAction {
    type: VacationActionType;
    payload: any;
}

export function vacationReducer(currentState = new VacationState(), action: vacationAction): VacationState {
    const newState = { ...currentState }

    switch (action.type) {
        case VacationActionType.FetchVacation:
            newState.vacation = action.payload
            break;
        case VacationActionType.FavoriteVacations:
            newState.vacation = action.payload
            break;

        case VacationActionType.AddVacation:
            newState.vacation.push(action.payload)
            break;

        case VacationActionType.updateVacation:
            const indexToUpdate = newState.vacation.findIndex(p => p.vacationId === action.payload.vacationId)
            if (indexToUpdate >= 0) {
                newState.vacation[indexToUpdate] = action.payload;
            }
            break;

        case VacationActionType.DeleteVacation:
            const indexToDelete = newState.vacation.findIndex(p => p.vacationId === action.payload)
            if (indexToDelete >= 0) {
                newState.vacation.splice(indexToDelete, 1)
            }
            break;


        case VacationActionType.follow:
            const isNotFollowingToUpdate = newState.vacation.find(v => v.vacationId === action.payload)
            isNotFollowingToUpdate.idFollowing = 1;
            isNotFollowingToUpdate.followersCount += 1
            break;

        case VacationActionType.unfollow:
            const isFollowingToUpdate = newState.vacation.find(v => v.vacationId === action.payload)
            if (isFollowingToUpdate.idFollowing === 1) {
                isFollowingToUpdate.idFollowing = 0;
            }
            break;

        case VacationActionType.RemoveFollow:
            const removeFollowerVacation = newState.vacation.find(v => v.vacationId === action.payload)
            removeFollowerVacation.followersCount -= 1;
            break;
    }


    return newState
}

export const vacationStore = createStore(vacationReducer);