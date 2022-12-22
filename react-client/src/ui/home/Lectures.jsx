import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getLectures } from "../../http/lectures";

export default function Lectures() {

    const query = useQuery('lectures', () => getLectures())

    // const [lectures, setLectures] = useState([
    //     {
    //         id: 1,
    //         name: "Variables",
    //     },
    //     {
    //         id: 2,
    //         name: "Data Types",
    //     },
    //     {
    //         id: 3,
    //         name: "Conditional",
    //     }
    // ])

    return (
        <aside className="lectures">
            <h3>Lectures</h3>
            <hr />
            <ul>
                {
                    query.isLoading && <span> Loading </span>
                }
                {
                    query.isError && <span className="error"> {query.error} </span>
                }
                {
                    query.isSuccess && 
                    query.data.data.lectures.map(lecture => (
                        <li>
                            <Link to={'/lectures/' + lecture.id}>
                                {lecture.id}.{ lecture.name } 
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </aside>
    )
}