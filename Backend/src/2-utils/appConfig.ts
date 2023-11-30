class AppConfig {
    public port = 4002;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "vacationsdatabase";
    public vacationImagesAddress = `http://localhost:${this.port}/api/vacations/images/`;
}
const appConfig = new AppConfig()
export default appConfig;