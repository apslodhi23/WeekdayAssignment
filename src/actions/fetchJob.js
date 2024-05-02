import axios from 'axios';

export const fetchJobs = async ( { limit, offset } ) => {
	try {
		const response = await axios.post(
			'https://api.weekday.technology/adhoc/getSampleJdJSON',
			{
				limit: limit,
				offset: offset
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return response?.data?.jdList;
	} catch ( error ) {
		console.error( error );
	}
};

