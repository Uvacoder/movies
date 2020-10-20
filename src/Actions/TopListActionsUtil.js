export const getTopListTypeUrl = (type) => {
  debugger;
  switch (type) {
    case 'top_rated':
      return 'movie/top_rated'
    case 'trending_daily':
      return 'trending/movie/day'
    case 'trending_weekly':
      return 'trending/movie/week'
    default:
      throw new Error('Invalid type')
  };
};