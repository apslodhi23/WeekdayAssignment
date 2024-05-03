import React, { useEffect, useState } from "react";
import { Card } from "../components/card/Card";
import { fetchJobs } from "../actions/fetchJob";
import { Header } from "../components/header/Header";
import "./main.css";

const Main = () => {
	const [ jobs, setJobs ] = useState( null ); // Stores the fetched jobs data
	const [ filteredJobs, setFilteredJobs ] = useState( null ); // Stores the filtered jobs based on user selections
	const [ loading, setLoading ] = useState( false ); // Indicates whether data is being fetched
	const [ offset, setOffset ] = useState( 0 ); // Tracks the offset for pagination

	// Add a scroll event listener when the component mounts to trigger fetching more jobs as the user scrolls down
	useEffect( () => {
		addScrollListener();
	}, [] );

	// Fetch jobs data initially and on subsequent offset changes
	useEffect( () => {
		const getData = async () => {
			setLoading( true ); // Set loading state to true
			const response = await fetchJobs( { limit: 10, offset } ); // Fetch jobs data with pagination
			setLoading( false ); // Set loading state to false
			if ( response ) {
				setJobs( ( prevJobs ) =>
					prevJobs ? [ ...prevJobs, ...response ] : response
				); // Update jobs state with fetched data, handling both initial fetch and subsequent fetches
			}
		};
		getData();
	}, [ offset ] );

	// Function to fetch more jobs when the user scrolls near the bottom of the page
	const fetchMoreJobs = async () => {
		setOffset( ( prevOffset ) => prevOffset + 10 ); // Update offset for the next page of data
	};

	// Add a scroll event listener to detect when the user scrolls near the bottom of the page
	const addScrollListener = () => {
		window.addEventListener( "scroll", handleScroll );
	};

	// Handle scroll event to trigger fetching more jobs when necessary
	const handleScroll = () => {
		if (
			window.innerHeight + window.scrollY >= document.body.offsetHeight
		) {
			fetchMoreJobs();
		}
	};

	return (
		<>
			<Header jobs={ jobs } setFilteredJobs={ setFilteredJobs } />
			<div className="card-container">
				{ filteredJobs?.length > 0 ? (
					filteredJobs?.map( ( job, index ) => (
						<Card cardData={ job } key={ index } />
					) )
				) : (
					<h3>No jobs found</h3>
				) }
			</div>
			{ loading && <p>Loading...</p> }
		</>
	);
};

export default Main;
