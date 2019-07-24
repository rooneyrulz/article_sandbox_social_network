//  @ROUTE    >    GET   /api/test
//  @DESC     >    TESTING ROUTE
//  @ACCESS   >    PUBLIC
export default (req, res, next) => res.status(200).send('App Working!');
