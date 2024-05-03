import React, { useState } from "react";
import ViewJob from "./viewJob/ViewJob";
import "./card.css";

export const Card = ( { cardData } ) => {
	// State variable to manage the expanded job details section
	const [ expanded, setExpanded ] = useState( false );

	// Functions for handling user interactions
	const toggleExpand = () => {
		setExpanded( !expanded ); // Toggle the expanded state
	};
	const handleCloseDialog = () => {
		setExpanded( false ); // Close the expanded job details section
	};
	const handleApplyClick = () => {
		window.open( cardData?.jdLink ); // Open the job application link
	};
	const handleReferralClick = () => {
		alert( "Connect your LinkedIn" ); // Placeholder functionality for referral tasks
	};

	return (
		<div className="card">
			{/* Job card content */ }
			<div className="text-content">
				{/* Job title and company information */ }
				<div className="title">
					<div className="company-title">
						<div className="name">Company Name</div>
						<div className="text-wrapper-2">{ cardData?.jobRole }</div>
						<div className="text-wrapper-3">{ cardData?.location }</div>
					</div>
				</div>

				{/* Estimated salary range */ }
				<div className="salary">
					Estimated Salary: {
						`${ cardData?.salaryCurrencyCode === "USD" && "$" }${ cardData?.minJdSalary ? cardData?.minJdSalary + "-" : "" }${ cardData?.maxJdSalary ? cardData?.maxJdSalary : "" }${ cardData?.salaryCurrencyCode === "USD" ? "K" : "LPA" }`
					}
				</div>

				{/* About the company section */ }
				<div className="about-us">
					<div className="text-wrapper-4">About Company</div>
					<div className="text-wrapper-5">About us</div>
					<div className="about-company">
						{ cardData.jobDetailsFromCompany.slice( 0, 600 ) }...
					</div>
					<div className="gradient" onClick={ toggleExpand }>
						<div className="view-more">View job</div>
					</div>
				</div>

				{/* Minimum experience required */ }
				<div className="miinimum-experience">
					<div className="text-wrapper-6">Minimum Experience</div>
					<div className="minimum-experience">
						{ `${ cardData?.minExp ? cardData?.minExp : "NA" } - ${ cardData?.maxExp ? cardData?.maxExp : "NA"
							} years` }
					</div>
				</div>

				{/* Easy apply button */ }
				<div className="easy-apply" onClick={ handleApplyClick }>
					<div className="container" href={ cardData?.jdLink }>
						<span className="lightingicon">⚡️</span>
						<span className="text-wrapper-7">Easy Apply</span>
					</div>
				</div>

				{/* Referral tasks (placeholder functionality) */ }
				<div className="div-wrapper" onClick={ handleReferralClick }>
					<div className="text-wrapper-8">😀 Unlock referral tasks</div>
				</div>
			</div>

			{/* Expanded job details view */ }
			<ViewJob
				openViewJob={ expanded }
				data={ cardData?.jobDetailsFromCompany }
				onClose={ handleCloseDialog }
			/>
		</div>
	);
};
