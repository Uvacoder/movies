export const getRecentMoviesTypeUrl = (type) => {
	switch (type) {
		case 'upcomming':
      return 'movie/upcoming'
		case 'now_playing':
			return 'movie/now_playing'
		default:
			return 'upcomming'
  };
};