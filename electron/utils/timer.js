const getCronTime = (minutes = 30) => {
  switch (minutes) {
    case 30:
      return '0 */30 * * * *';
    case 60:
      return '0 0 * * * *';
    default:
      return '0 */30 * * * *';
  }
};

module.exports = {
  getCronTime,
};
