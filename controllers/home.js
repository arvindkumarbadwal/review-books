/**
 * GET /
 */
exports.index = function(req, res) {
  console.dir(res.render);
  res.render('home', {
    title: 'Home'
  });
};
