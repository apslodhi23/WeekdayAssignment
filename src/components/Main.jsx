import React, { useEffect, useState } from "react";
import "./main.css";
import { Card } from "../components/card/Card";
import { fetchJobs } from "../actions/fetchJob";

const Main = () => {
	const [ jobs, setJobs ] = useState( null );
	const [ loading, setLoading ] = useState( false );
	const [ offset, setOffset ] = useState( 0 );

	useEffect( () => {
		fetchMoreJobs();
		addScrollListener(); // Add the scroll event listener when the component mounts
	}, [] );

	const fetchMoreJobs = async () => {
		setLoading( true );
		console.log( "called" );
		const response = await fetchJobs( { limit: 10, offset } );
		if ( response ) {
			setJobs( ( prevJobs ) => ( prevJobs ? [ ...prevJobs, ...response ] : response ) );
			setOffset( ( prevOffset ) => prevOffset + 10 );
			setLoading( false );
		}
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
			<div className="card-container">
				{ jobs &&
					jobs.map( ( job, index ) => <Card cardData={ job } key={ index } /> ) }
			</div>
			{ loading && <p>Loading...</p> }
		</>
	);
};

export default Main;
