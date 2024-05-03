import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import "./header.css";

export const Header = ( { jobs, setFilteredJobs } ) => {
	// Extract unique locations (excluding "remote") and check if "Remote" exists
	let locations = [
		...new Set( jobs?.filter( ( job ) => job.location !== "remote" ).map( ( job ) => job.location ) ),
	];
	let isRemote = locations.includes( "Remote" );
	locations = isRemote ? locations.filter( ( location ) => location !== "Remote" ) : locations;

	// Extract unique job roles
	let roles = [ ...new Set( jobs?.map( ( job ) => job.jobRole ) ) ];

	// Generate experience range array
	const experienceRange = [];
	jobs?.forEach( ( job ) => {
		for ( let year = job.minExp; year <= job.maxExp; year++ ) {
			if ( !experienceRange.includes( year ) ) {
				experienceRange.push( year );
			}
		}
	} );

	// Sort experience range array
	experienceRange.sort( ( a, b ) => a - b );

	// Generate base salary range array
	const baseSalaryRange = [
		{ value: 0, label: "0k" },
		{ value: 10, label: "10k" },
		{ value: 20, label: "20k" },
		{ value: 30, label: "30k" },
		{ value: 40, label: "40k" },
		{ value: 50, label: "50k" },
		{ value: 60, label: "60k" },
		{ value: 70, label: "70k" },
		{ value: 80, label: "80k" },
		{ value: 90, label: "90k" },
		{ value: 100, label: "100k" },
	];

	// Update location, role, experience range, and isRemote on jobs change
	useEffect( () => {
		locations = [
			...new Set( jobs?.filter( ( job ) => job.location !== "remote" ).map( ( job ) => job.location ) ),
		];
		isRemote = locations.includes( "Remote" );
		locations = isRemote ? locations.filter( ( location ) => location !== "Remote" ) : locations;
		roles = [ ...new Set( jobs?.map( ( job ) => job.jobRole ) ) ];
		experienceRange.sort( ( a, b ) => a - b ); // Sort experience range array
	}, [ jobs ] );

	// State variables for selected filters
	const [ selectedRoles, setSelectedRoles ] = useState( [] );
	const [ selectedLocations, setSelectedLocations ] = useState( [] );
	const [ selectedLocationType, setSelectedLocationType ] = useState( [] );
	const [ selectedExperience, setSelectedExperience ] = useState( null );
	const [ selectedMinSalary, setSelectedMinSalary ] = useState( null );

	// Update filtered jobs based on selected filters
	useEffect( () => {
		setFilteredJobs(
			jobs?.filter( ( job ) => {
				// Location match
				const locationMatch =
					selectedLocations.length === 0 ||
					selectedLocations.some( ( location ) => location.value === job.location );

				// Role match
				const roleMatch =
					selectedRoles.length === 0 ||
					selectedRoles.some( ( role ) => role.value === job.jobRole );

				// Remote job check
				const isRemoteJob = job.location === "remote";

				// Experience match
				const experienceMatch =
					selectedExperience === null ||
					job.minExp >= selectedExperience.value ||
					job.maxExp <= selectedExperience.value;

				// Base salary match
				const baseSalaryMatch =
					selectedMinSalary === null || job.minJdSalary >= selectedMinSalary.value;

				// Apply filters based on location type
				if ( selectedLocationType.value === "Remote" ) {
					return isRemoteJob && roleMatch && experienceMatch && baseSalaryMatch;
				} else if ( selectedLocationType.value === "On-Site" ) {
					return !isRemoteJob && locationMatch && roleMatch && experienceMatch && baseSalaryMatch;
				} else {
					return locationMatch && roleMatch && experienceMatch && baseSalaryMatch;
				}
			} )
		);
	}, [
		selectedLocationType,
		selectedLocations,
		selectedRoles,
		selectedExperience,
		selectedMinSalary,
		jobs,
	] );

	// Handle filter change functions
	const handleLocationChange = ( selectedLocations ) => {
		setSelectedLocations( selectedLocations );
	};

	const handleRoleChange = ( selectedRoles ) => {
		setSelectedRoles( selectedRoles );
	};

	const handleLocationTypeChange = ( selectedLocationType ) => {
		setSelectedLocationType( selectedLocationType );
	};

	const handleExperienceChange = ( event ) => {
		setSelectedExperience( event );
	};

	const handleMinSalaryChange = ( event ) => {
		setSelectedMinSalary( event );
	};

	return (
		<div className="topbar">
			{/* Dropdown for selecting roles */ }
			<ReactSelect
				className="dropdown"
				value={ selectedRoles }
				onChange={ handleRoleChange }
				options={ roles.map( ( role ) => ( { value: role, label: role } ) ) }
				isMulti
				placeholder="Select Roles"
			/>

			{/* Dropdown for selecting locations */ }
			<ReactSelect
				className="dropdown"
				value={ selectedLocations }
				onChange={ handleLocationChange }
				options={ locations.map( ( location ) => ( { value: location, label: location } ) ) }
				isMulti
				placeholder="Select Locations"
			/>

			{/* Dropdown for selecting location type (remote/on-site) */ }
			<ReactSelect
				className="dropdown"
				value={ selectedLocationType }
				onChange={ handleLocationTypeChange }
				options={ [
					{ value: "Remote", label: "Remote" },
					{ value: "On-Site", label: "On-Site" },
				] }
				placeholder="Select Location Type"
			/>

			{/* Dropdown for selecting experience range */ }
			<ReactSelect
				className="dropdown"
				value={ selectedExperience }
				onChange={ handleExperienceChange }
				options={ experienceRange.map( ( year ) => ( { value: year, label: year } ) ) }
				placeholder="Select Experience"
			/>

			{/* Dropdown for selecting minimum base salary */ }
			<ReactSelect
				className="dropdown"
				value={ selectedMinSalary }
				onChange={ handleMinSalaryChange }
				options={ baseSalaryRange }
				placeholder="Min Base Salary"
			/>
		</div>
	);
};
