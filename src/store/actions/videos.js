import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_VIDEOS, REMOVE_VIDEO } from '../actionTypes';

export const loadVideo = (videos) => ({
	type: LOAD_VIDEOS,
	videos
});

export const remove = (id) => ({
	type: REMOVE_VIDEO,
	id
});

export const removeVideo = (user_id, video_id) => {
	return (dispatch) => {
		return apiCall('delete', `/api/users/${user_id}/videos/${video_id}`)
			.then(() => dispatch(remove(video_id)))
			.catch((err) => {
				dispatch(addError(err.message));
			});
	};
};

export const fetchVideos = () => {
	return (dispatch) => {
		return apiCall('GET', '/api/videos')
			.then((res) => {
				dispatch(loadVideo(res));
			})
			.catch((err) => {
				dispatch(addError(err.message));
			});
	};
};

export const postNewVideo = (url) => (dispatch, getState) => {
	let { currentUser } = getState();
	const id = currentUser.user.id;
	return apiCall('post', `/api/users/${id}/videos`, { url })
		.then((res) => {})
		.catch((err) => dispatch(addError(err.message)));
};
