
const getHealth = async function (req, res, next) {
  res.status(200).send("OK");
};

module.exports = {
  getHealth,
};