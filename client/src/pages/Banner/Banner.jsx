import { useState, useEffect } from "react";

import { getBanners, updateBanner } from "./../../services/banner";

// const host = "http://localhost:3000";

function Banner() {
  const [banners, setBanners] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const asyncGetBanners = async () => {
    try {
      const res = await getBanners();
      setLoading(false);
      const resp = res.data;
      const data = resp.data;
      setBanners(data.photos);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    asyncGetBanners();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    updateBanner(formData)
      .then((res) => {
        console.log(res);
        const resp = res.data;
        asyncGetBanners();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div className="container">
      <div className="banner">
        <div className="banner__container">
          {banners.map((banner, index) => {
            return (
              <div className="banner__item" key={index}>
                <img src={banner} alt="banner" />
              </div>
            );
          })}
        </div>
      </div>
      <hr />

      <h3>Upload Banners</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="banner">Banner</label>
          <input
            type="file"
            multiple
            className="form-control"
            id="banner"
            name="banner"
            placeholder="Banner"
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default Banner;
