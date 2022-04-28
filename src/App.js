// Table View
import React, { useEffect, useState } from "react";
import {
  Table,
  Pagination,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const ProductList = () => {
  const [productData, setProductData] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [isLoading,setLoading]=useState(false);

  useEffect(() => {
    getAPIdata(activePage);
  }, [activePage]);

  async function getAPIdata(activePage) { 
    setLoading(true);
   let response=await  fetch(`https://api.punkapi.com/v2/beers?page=${activePage}&per_page=10`)
   let formattedResult=await response.json();
    setProductData(formattedResult);
    setLoading(false);

  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    getAPIdata(pageNumber);
  };

  return (
      isLoading ? (
        <div className="spinner">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="wrapper">
          <h3>Product Details</h3>
          <Container fluid="lg">
            <Row>
              <Col >
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Image</th>
                      <th> Name</th>
                      <th>Tagline</th>
                      <th> Description</th>
                      <th>Attenuation Level</th>
                      <th colSpan={2}>Volume</th>
                      <th>Brewers</th>
                      <th>Contibuted By</th>
                      <th colSpan={2}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData &&
                      productData.map((item) => {
                        return (
                          <tr>
                            <td>{item.id}</td>
                            <td>
                              <img
                                src={item.image_url} 
                                alt="image"
                                width={100}
                                height={180}
                                style={{ padding: "10" }}
                              ></img>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.tagline}</td>
                            <td style={{ textAlign: "left" }}>
                              {item.description}
                            </td>

                            <td>{item.attenuation_level}</td>
                            <td>{item.volume.value}</td>
                            <td>{item.volume.unit}</td>
                            <td style={{ textAlign: "left" }}>
                              {item.brewers_tips}
                            </td>
                            <td>{item.contributed_by}</td>
                            <td >
                              <ul>
                                <li>
                                  <b>ABV</b>
                                </li>
                                <li>
                                  <b>IBU</b>
                                </li>
                                <li>
                                  <b>Target_fg</b>
                                </li>
                                <li>
                                  <b>Target_og</b>
                                </li>
                                <li>
                                  <b>EBC</b>
                                </li>
                                <li>
                                  <b>SRM</b>
                                </li>
                                <li>
                                  <b>PH</b>
                                </li>
                              </ul>
                            </td>
                            <td>
                              <ul>
                                <li>{item.abv}</li>
                                <li>{item.ibu}</li>
                                <li>{item.target_fg}</li>
                                <li>{item.target_og}</li>
                                <li>{item.ebc}</li>
                                <li>{item.srm}</li>
                                <li>{item.ph}</li>
                              </ul>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
                <div className="pagination" >
                  <Pagination>
                    {productData &&
                      productData.map((_, index) => {
                        return (
                          <Pagination.Item
                            onClick={() => handlePageChange(index + 1)}
                            key={index + 1}
                            active={index + 1 === activePage}
                          >
                            {index + 1}
                          </Pagination.Item>
                        );
                      })}
                  </Pagination>
                </div>

                {/* </div> */}
              </Col>
            </Row>
          </Container>
        </div>
      )
  );
};

export default ProductList;
