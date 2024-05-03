import React, { useEffect, useState } from "react";
import "./header.css"
import { Select } from "react-select";
import ReactSelect from "react-select";
export const Topbar = ( { jobs } ) => {

	let locations = [ ...new Set( jobs?.map( ( job ) => job.location ) ) ];
	let roles = [ ...new Set( jobs?.map( ( job ) => job.jobRole ) ) ];
	useEffect( () => {
		locations = [ ...new Set( jobs?.map( ( job ) => job.location ) ) ];
		roles = [ ...new Set( jobs?.map( ( job ) => job.jobRole ) ) ];
	}, [ jobs ] );
	console.log( roles, locations, "locations" )
	const [ selectedLocations, setSelectedLocations ] = useState( [] );
	const [ selectedRoles, setSelectedRoles ] = useState( [] );
	const [ minExperience, setMinExperience ] = useState( null );
	const [ maxExperience, setMaxExperience ] = useState( null );

	const filteredJobs = jobs?.filter( ( job ) => {
		const locationMatch = selectedLocations.length === 0 || selectedLocations.some( ( location ) => location.value === job.location );;
		console.log( selectedLocations, locationMatch, "selectedLocations" )

		const roleMatch = selectedRoles.length === 0 || selectedRoles.some( ( location ) => location.value === job.jobRole );
		const experienceMatch =
			( minExperience === null || job.minExp >= minExperience ) &&
			( maxExperience === null || job.maxExp <= maxExperience );

		return locationMatch && roleMatch && experienceMatch;
	} );

	const handleLocationChange = ( selectedLocations ) => {
		console.log( selectedLocations, "selectedLocations" )
		setSelectedLocations( selectedLocations );
	};

	const handleRoleChange = ( selectedRoles ) => {
		setSelectedRoles( selectedRoles );
	};

	const handleMinExperienceChange = ( event ) => {
		setMinExperience( Number( event.target.value ) );
	};

	const handleMaxExperienceChange = ( event ) => {
		setMaxExperience( Number( event.target.value ) );
	};

	return (
		<div className="topbar">
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
				value={ selectedRoles }
				onChange={ handleRoleChange }
				options={ roles.map( ( role ) => ( { value: role, label: role } ) ) }
				isMulti
				placeholder="Select Roles"
			/>
		</div>
	);
};

