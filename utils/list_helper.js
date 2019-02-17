
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
//   const mostBlogs = (blogs) => {
//       const myArray = [];
//      // let x = [];
//         for (i in blogs){
               
//              let x = blogs[i].author;
//             // console.log(x)
//              myArray.push(x);
//            // console.log(myArray)
//               //  myArray == x;
//               //  myArray.concat(x);
            
            
//         }
//         console.log(myArray);

//       const countedAuthors = myArray.reduce(function(allAuthors, myArray){
//           if (myArray in allAuthors){
//               allAuthors[myArray]++;
//           }
//           else {
//               allAuthors[myArray] = 1;
//           }
         
//           return allAuthors;
//       })
//         const thatOne = countedAuthors;
    
//       console.log(countedAuthors)

//       return countedAuthors;
//   }

  module.exports = {
      dummy,
      totalLikes,
      favoriteBlog,
    //   mostBlogs,
  }