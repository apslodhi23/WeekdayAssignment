import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import "./header.css";

export const Header = ( { jobs, setFilteredJobs } ) => {
	let locations = [ ...new Set( jobs?.filter( ( job ) => job.location !== "remote" ).map( ( job ) => job.location ) ) ];
	let isRemote = locations.includes( "Remote" );
	locations = isRemote ? locations.filter( ( location ) => location !== "Remote" ) : locations;

	let roles = [ ...new Set( jobs?.map( ( job ) => job.jobRole ) ) ];

	// Generate experience range array
	let experienceRange = [];
	jobs?.forEach( ( job ) => {
		for ( let year = job.minExp; year <= job.maxExp; year++ ) {
			if ( !experienceRange.includes( year ) ) {
				experienceRange.push( year );
			}
		}
	} );

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

	useEffect( () => {
		locations = [ ...new Set( jobs?.filter( ( job ) => job.location !== "remote" ).map( ( job ) => job.location ) ) ];
		isRemote = locations.includes( "Remote" );
		locations = isRemote ? locations.filter( ( location ) => location !== "Remote" ) : locations;
		roles = [ ...new Set( jobs?.map( ( job ) => job.jobRole ) ) ];
		experienceRange.sort( ( a, b ) => a - b ); // Sort experience range array
	}, [ jobs ] );

	const [ selectedRoles, setSelectedRoles ] = useState( [] );
	const [ selectedLocations, setSelectedLocations ] = useState( [] );
	const [ selectedLocationType, setSelectedLocationType ] = useState( [] );
	const [ selectedExperience, setSelectedExperience ] = useState( null );
	const [ selectedMinSalary, setSelectedMinSalary ] = useState( null );

	useEffect( () => {
		setFilteredJobs(
			jobs?.filter( ( job ) => {
				const locationMatch =
					selectedLocations.length === 0 ||
					selectedLocations.some( ( location ) => location.value === job.location );

				const roleMatch =
					selectedRoles.length === 0 ||
					selectedRoles.some( ( role ) => role.value === job.jobRole );

				const isRemoteJob = job.location === "remote";
				const experienceMatch = selectedExperience === null || job.minExp >= selectedExperience.value || job.minExp <= selectedExperience.value;
				const baseSalaryMatch = selectedMinSalary === null || job.minJdSalary >= selectedMinSalary.value;

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
			<ReactSelect
				className="dropdown"
				value={ selectedRoles }
				onChange={ handleRoleChange }
				options={ roles.map( ( role ) => ( { value: role, label: role } ) ) }
				isMulti
				placeholder="Select Roles"
			/>
			<ReactSelect
				className="dropdown"
				value={ selectedLocations }
				onChange={ handleLocationChange }
				options={ locations.map( ( location ) => ( { value: location, label: location } ) ) }
				isMulti
				placeholder="Select Locations"
			/>
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
			<ReactSelect
				className="dropdown"
				value={ selectedExperience }
				onChange={ handleExperienceChange }
				options={ experienceRange.map( ( year ) => ( { value: year, label: year } ) ) }
				placeholder="Select Experience"
			/>


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
