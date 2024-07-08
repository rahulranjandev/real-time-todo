import { useState, useEffect } from 'react';
import { Grid, Segment, Divider, Header, Button, Form, Progress } from 'semantic-ui-react';

import { getBanners, updateBanner } from '../../services/banner';

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

        // eslint-disable-next-line no-unused-vars
        const resp = res.data;

        asyncGetBanners();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (
      <div className="container">
        <Progress percent={100} indicating>
          {' '}
          Loading...{' '}
        </Progress>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Progress percent={100} indicating>
          {' '}
          Error...{' '}
        </Progress>
      </div>
    );
  }

  return (
    <div className="container">
      <Header as="h1" block textAlign="center">
        Multi Image Upload
      </Header>
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
      <Segment basic textAlign="center">
        <Divider horizontal>Upload Banner</Divider>
      </Segment>
      <Grid textAlign="center">
        <Grid.Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Field>
                <input type="file" multiple name="banner" placeholder="Image" />
              </Form.Field>
              <Button type="submit" color="blue">
                Upload
              </Button>
            </Form.Group>
          </Form>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Banner;
