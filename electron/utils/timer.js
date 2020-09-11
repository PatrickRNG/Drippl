const getCronTime = (minutes = 30) => {
  switch (minutes) {
    case 30:
      return '0 */30 * * * *';
    case 60:
      return '0 0 * * * *';
    case 120:
      return '0 0 */2 * * *';
    default:
      return null;
  }
};

module.exports = {
  getCronTime,
};
