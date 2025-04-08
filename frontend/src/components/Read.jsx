import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Added for success messages

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000");
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
        return;
      }

      setData(result);
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error(err);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, { // Fixed URL typo (http: -> http://)
        method: "DELETE"
      });
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
        return;
      }

      setSuccess("Data Deleted Successfully!"); // Using success state instead of error for positive feedback
      setTimeout(() => {
        setSuccess("");
        getData(); // Refresh data after deletion
      }, 2000);
    } catch (err) {
      setError("An error occurred while deleting");
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='container my-2'>
      <h2 className='text-center'>All Data</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {data.length === 0 ? (
        <p className='text-center'>No data available</p>
      ) : (
        <div className='row'>
          {data.map((e) => (
            <div key={e._id} className='col-3'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{e.name}</h5>
                  <h6 className='card-subtitle mb-2 text-muted'>{e.email}</h6>
                  <p className='text-muted'>{e.age}</p>
                  <a
                    href="#"
                    className='card-link'
                    onClick={(event) => {
                      event.preventDefault();
                      handleDelete(e._id);
                    }}
                  >
                    Delete
                  </a>
                  <Link to={`/${e._id}`} className='card-link'>
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Read;