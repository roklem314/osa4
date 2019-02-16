
const dummy = (blogs) => {
   // console.log(blogs)
    return 1;
  }

  const totalLikes = (blogs) => {
      let sum = blogs.map(value => value.likes);
      //console.log(blogs.map(value => value.likes))
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      //console.log(sum.reduce(reducer));

      return sum.reduce(reducer);
  }
  const favoriteBlog = (blogs) => {
    let likesList = blogs.map(value => value.likes);
    //console.log(likesList)
    const max = likesList.reduce(function(a,b) {
        return Math.max(a,b);
    });
    const thatOne = blogs.find(one => one.likes === max);
    return thatOne;
    //console.log(sum.reduce(reducer));
  }

  module.exports = {
      dummy,
      totalLikes,
      favoriteBlog,
  }