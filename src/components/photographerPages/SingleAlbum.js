import React from 'react';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { Container } from 'react-bootstrap';

import UploadImages from './UploadImages';
import Images from './Images';
import useGetSingleAlbum from '../../hooks/useGetSingleAlbum';
import useGetImages from '../../hooks/useGetImages';

const SingleAlbum = () => {
	const { albumId } = useParams();
	const { album } = useGetSingleAlbum(albumId);
	const { images, loading } = useGetImages(albumId);

	return (
		<Container>
			<h2 className="mb-3">Album: {album && album.albumTitle}</h2>

			<UploadImages albumId={albumId} />

			<hr />

			{loading
				? (<div className="d-flex justify-content-center 		my-5"><BarLoader color={"#888"} size={100} /></div>)
				: (<Images images={images} />)
			}
		</Container>
	)
}

export default SingleAlbum