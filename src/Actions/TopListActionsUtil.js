export const getTopListTypeUrl = (type) => {

	switch (type) {
		case 'top_rated':
      return 'movie/top_rated'
		case 'trending_daily':
			return 'trending/movie/day'
		case 'trending_weekly':
			return 'trending/movie/week'
  };
};