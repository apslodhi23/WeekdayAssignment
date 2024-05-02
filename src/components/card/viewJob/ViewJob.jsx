import { Dialog } from "@mui/material";
import "./viewJob.css";

const ViewJob = ( { openViewJob, data, onClose } ) => {
	return (
		<Dialog open={ openViewJob } onClose={ onClose }>
			<div className="view-job-container">
				<h2 className="heading">Job Description</h2>
				<p className="job-description">{ data }</p>
			</div>
		</Dialog>
	);
};

export default ViewJob;
