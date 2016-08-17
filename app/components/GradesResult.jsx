const GradesResult = ({grades}) => {
  return (
    <h2 className="text-center">{grades[0].courseName} - {grades[0].score}</h2>
  );
};

module.exports = GradesResult;