import vacationService from "../../../Service/VacationService";
import { vacationStore } from "../../../Redux/VacationState";
import VacationModel from "../../../Models/Vacation-Model";
import VacationCard from "../VacationCard/VacationCard";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import "./VacationList.css";
import _ from "lodash";

function VacationList(): JSX.Element {
    const [vacation, setVacation] = useState<VacationModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(4);

    useEffect(() => {
            vacationService.getAllVacation()
            vacationStore.subscribe(() => {
                const dup = [...vacationStore.getState().vacation];
                setVacation(dup);
            })
    }, [])

    function getAllVacation() {
        vacationService.getAllVacation()
        .then(vacations => setVacation(vacations))
        .catch(err => alert(err.message))
    }

    function favoriteVacations() {
        vacationService.getUserFavoriteVacations()
            .then(favoriteVacation => setVacation(favoriteVacation))
            .catch(err => alert(err.message))
    }

    function vacationNotActive() {
        vacationService.getVacationNotActive()
            .then(vacationNotActive => setVacation(vacationNotActive))
            .catch(err => alert(err.message))
    }

    function vacationActive() {
        vacationService.getVacationActive()
            .then(vacationActive => setVacation(vacationActive))
            .catch(err => alert(err.message))
    }

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = vacation.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="VacationList">
            <select defaultValue="" onClick={getAllVacation}>
                <option disabled value="">All Vacation</option>
                <option value={5}>All vacations</option>
            </select>
            <br /><br />
            <select defaultValue="" onClick={favoriteVacations}>
                <option disabled value="">Favorite Vacation</option>
                <option value={5}>Is Following</option>
            </select>
            <span> | </span>
            <select defaultValue="" onClick={vacationNotActive}>
                <option disabled value="">Vacations Not Active</option>
                <option value={5}>Not Active</option>
            </select>
            <span> | </span>
            <select defaultValue="" onClick={vacationActive}>
                <option disabled value="">Vacations Active</option>
                <option value={5}>Active</option>
            </select>
            <div className="row row-cols-1 row-cols-md-6 g-4 wrapper">
                {currentPost.map((item) => <VacationCard key={item.vacationId} vacation={item} />)}
                <br />
                {<Pagination totalPost={vacation.length} postPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            </div>
        </div>
    );
}
export default VacationList;