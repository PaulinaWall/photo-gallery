import React from 'react';

const CustomerUrlPage = ({ customerUrl }) => {

	return(
		<div className="ml-auto mb-2 d-flex">
			<p className="customer-url">Url for customer: </p>{customerUrl}
		</div>
	)
}

export default CustomerUrlPage;