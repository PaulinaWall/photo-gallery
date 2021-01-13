import React from 'react';

const LikedNumber = ({ images }) => {
	let numberOfLikes = 0;
	return(
		<div className="ml-auto mb-2 d-flex">
			{
				images?.forEach((image) => {
					if (image.liked) {
						numberOfLikes ++;
					}
				})
			}
			<p>You liked {numberOfLikes} of {images?.length} images.</p>
		</div>
	)
}

export default LikedNumber;