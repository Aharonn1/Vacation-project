import { ChangeEvent, useEffect, useState } from "react";
import VacationModel from "../../../Models/Vacation-Model";
import vacationService from "../../../Service/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import _ from "lodash";
import "./VacationList.css";
import { vacationStore } from "../../../Redux/VacationState";
import { Button } from "bootstrap";
import Pagination from "../Pagination/Pagination";

function VacationList(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(4);


    useEffect(() => {
        console.log(vacation);
        try {
            vacationService.getAllVacation()

            vacationStore.subscribe(() => {
                const dup = [...vacationStore.getState().vacation];
                setVacation(dup);
            })
        } catch (err: any) {
            alert(err.message)
        }
    }, [])


    function getAllVacation() {

        // const vacations = +args.target.value;
        vacationService.getAllVacation()
        .then(vacations => setVacation(vacations))
        .then(vacations => console.log(vacations))
        .catch(err => alert(err.message))
    }

    function favoriteVacations() {
        // const favoriteVacation = +args.target.value;
        vacationService.getUserFavoriteVacations()
            .then(favoriteVacation => setVacation(favoriteVacation))
            .catch(err => alert(err.message))

    }

    function vacationNotActive() {
        // const vacationNotActive = +args.target.value;
        vacationService.getVacationNotActive()
            .then(vacationNotActive => setVacation(vacationNotActive))
            .catch(err => alert(err.message))
    }

    function vacationActive() {
        // const vacationActive = +args.target.value;
        vacationService.getVacationActive()
            .then(vacationNotActive => setVacation(vacationNotActive))
            .catch(err => alert(err.message))
    }

    console.log(vacation);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = vacation.slice(indexOfFirstPost, indexOfLastPost);
    console.log(currentPost);




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
