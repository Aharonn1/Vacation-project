class AppConfig {
    public registerUrl = "http://localhost:4002/api/auth/register/";
    public loginUrl = "http://localhost:4002/api/auth/login/";
    public vacationsUsersUrl = "http://localhost:4002/api/users/vacations/";
    public vacationsAdminUrl = "http://localhost:4002/api/admin/vacations/";
    public vacationsImagesUsersUrl = "http://localhost:4002/api/users/vacations/images/";
    public followUrl = "http://localhost:4002/api/users/follow/";     
}

const appConfig = new AppConfig()

export default appConfig;