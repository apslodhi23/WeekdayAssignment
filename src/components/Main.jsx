import React, { useEffect, useState } from "react";
import "./main.css";
import { Card } from "../components/card/Card";
import { fetchJobs } from "../actions/fetchJob";
import FilteredList, { Topbar } from "./header/Header";

const Main = () => {
	const [ jobs, setJobs ] = useState( null );
	const [ loading, setLoading ] = useState( false );
	const [ offset, setOffset ] = useState( 0 );

	useEffect( () => {
		addScrollListener(); // Add the scroll event listener when the component mounts
	}, [] );
	useEffect( () => {
		const getData = async () => {
			const response = await fetchJobs( { limit: 10, offset: offset } );
			if ( response ) {
				setJobs( ( prevJobs ) => ( prevJobs ? [ ...prevJobs, ...response ] : response ) );
			}
		}
		getData();
	}, [ offset ] )
	const fetchMoreJobs = async () => {
		setOffset( ( ( prevOffset ) => {
			return prevOffset + 10
		} ) );
	};

	const addScrollListener = () => {
		window.addEventListener( "scroll", handleScroll );
	};

	const handleScroll = () => {
		if ( window.innerHeight + window.scrollY >= document.body.offsetHeight ) {
			fetchMoreJobs();
		}
	};

	return (
		<>
			<h1>Main Component</h1>
			<Topbar jobs={ jobs } />
			<div className="card-container">
				{ jobs &&
					jobs.map( ( job, index ) => <Card cardData={ job } key={ index } /> ) }
			</div>
			{ loading && <p>Loading...</p> }
		</>
	);
};

export default Main;
