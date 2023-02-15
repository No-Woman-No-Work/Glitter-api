


// const feed = (req, res, followedAuthors) => {
//     const page = req.query.page || 1;
//     const limit = req.query.limit || 10;
//     const order = req.query.order || 'desc';
//     const search = req.query.search;

//     const query = {
//         publishDate: { $lte: new Date() }
//     };
//     if (search) query.$text = {$search: search};
//     if (followedAuthors) query.author = {$in: followedAuthors};

//     var options = {
//         page,
//         limit
//     };
//     options.sort = {'publishDate' : order};

//     aggregate = Tweet.aggregate([
//         {
//             $match: query
//         },
//         {
//             $project: {
//                 text: 1,
//                 imagePath: 1,
//                 publishDate: 1,
//                 author: 1,
//                 kudos: { $size: "$kudos" }
//             }
//         }
//     ]);

//     Tweet.aggregatePaginate(aggregate, options, (err, result) =>{
//         if (err) {
//             console.log(err);
//             res.status(500).json(err);
//         } else {

//             Tweet.populate(
//                 result.docs,
//                 {
//                     path: 'author',
//                     select: '_id username'
//                 },
//                 (err, populateResult) =>{
//                     if (err) {
//                         console.log(err);
//                         res.status(500).json(err);
//                     } else {
//                         result.docs = populateResult
//                         res.json(result);
//                     }
//                 }
//             );
//         }
//     });  
// }