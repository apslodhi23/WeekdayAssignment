import React, { useState } from "react";
import ViewJob from "./viewJob/ViewJob";
import "./card.css";

export const Card = ( { cardData } ) => {
	const [ expanded, setExpanded ] = useState( false );

	const toggleExpand = () => {
		setExpanded( !expanded );
	};
	const handleCloseDialog = () => {
		setExpanded( false );
	};

	const handleApplyClick = () => {
		window.open( cardData?.jdLink );
	}
	const handleReferralClick = () => {
		alert( "Connect your LinkedIn" )
	}
	return (
		<div className="card">
			{/*
			 Commenting this out as postedDate is not the part of data from API
			
			 <div className="posted-date">
				<div className="text-wrapper">Posted 10 days ago</div>
			</div>

			*/}

			<div className="text-content">
				<div className="title">

					<div className="company-title">
						{/*Not provided in dataset*/ }
						<div className="name">Company Name</div>
						<div className="text-wrapper-2">{ cardData?.jobRole }</div>
						<div className="text-wrapper-3">{ cardData?.location }</div>
					</div>
				</div>

				{/*Handleing if one of the value is null*/ }
				<div className="salary">Estimated Salary: { `${ cardData?.salaryCurrencyCode === "USD" && "$" }${ cardData?.minJdSalary ? cardData?.minJdSalary + "-" : "" }${ cardData?.maxJdSalary ? cardData?.maxJdSalary : "" }${ cardData?.salaryCurrencyCode === "USD" ? "K" : "LPA" }` }</div>
				<div className="about-us">
					{/*comapy name is also not provided in the api so not able to implement search on it*/ }
					<div className="text-wrapper-4">About Company</div>
					<div className="text-wrapper-5">About us</div>
					<div className="about-company">
						{ cardData.jobDetailsFromCompany.slice( 0, 600 ) }...
					</div>
					<div className="gradient" onClick={ toggleExpand }>
						<div className="view-more">View job</div>
					</div>
				</div>
				<div className="miinimum-experience">
					<div className="text-wrapper-6">Minimum Experience</div>
					<div className="minimum-experience">{ `${ cardData?.minExp ? cardData?.minExp : "NA" } - ${ cardData?.maxExp ? cardData?.maxExp : "NA" } years` }</div>
				</div>
				<div className="easy-apply" onClick={ handleApplyClick }>
					<div className="container" href={ cardData?.jdLink } >
						<span className="lightingicon">⚡️</span>
						<span className="text-wrapper-7">Easy Apply</span>
					</div>
				</div>
				<div className="div-wrapper" onClick={ handleReferralClick }>
					<div className="text-wrapper-8">😀 Unlock referral tasks</div>
				</div>
			</div>
			<ViewJob
				openViewJob={ expanded }
				data={ cardData?.jobDetailsFromCompany }
				onClose={ handleCloseDialog }
			/>
		</div >
	);
};
