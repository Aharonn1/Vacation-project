class FollowModel {

    public vacationId:number;
    public userId:number;

    public constructor(follow:FollowModel){
        this.vacationId = follow.vacationId;
        this.userId = follow.userId
    }
}

export default FollowModel