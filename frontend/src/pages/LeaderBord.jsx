import NavBar from "../components/NavBar";

const LeaderBord = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center text-lg">Leader Board</h1>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Rank 1</h5>
                    <p className="card-text">Name: John Doe</p>
                    <p className="card-text">Score: 100</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Rank 2</h5>
                    <p className="card-text">Name: Jane Doe</p>
                    <p className="card-text">Score: 90</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderBord;
