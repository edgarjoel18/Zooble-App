import React, { useState } from "react";
import { Container, Row, Col, CardColumns, Card } from "react-bootstrap";
import "./ExploreUsers.css";

const ExploreUsers = (props) => {
  const [followersList, setFollowersList] = useState([
    {
      pet_id: 1,
      name: "Max",
      size_name: "small",
      age_name: "two",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
    },
    {
      pet_id: 2,
      name: "Juju",
      size_name: "large",
      age_name: "ten",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
    },
    {
      pet_id: 3,
      name: "Mimi",
      size_name: "medium",
      age_name: "six",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg",
    },
    {
      pet_id: 1,
      name: "Max",
      size_name: "small",
      age_name: "two",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
    },
    {
      pet_id: 2,
      name: "Juju",
      size_name: "large",
      age_name: "ten",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
    },
    {
      pet_id: 3,
      name: "Mimi",
      size_name: "medium",
      age_name: "six",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg",
    },
  ]);
  const EuCard = ({ title, src, thethingyintheplace }) => {
    return (
      <Card className="eu-card" key={`${thethingyintheplace}_Card_Item`}>
        <div style={{ display: "flex", width: "100%", padding: "14px" }}>
          <div style={{ marginRight: "10px" }}>
            <img src={src} className="eu-card-img" />
          </div>
          <div>
            <div>{title}</div>
          </div>
        </div>
      </Card>
    );
  };
  return (
    <>
      <div style={{ padding: "20px" }}>
        <Container>
          <div className="eu-results-title">Results</div>
          <Row>
            <Col>
              {followersList.map((item, index) => (
                <div style={{ padding: "10px" }}>
                  <EuCard
                    thethingyintheplace={index}
                    title={item.name}
                    src={item.profile_pic}
                  />
                </div>
              ))}
            </Col>
            <Col>
              {followersList.map((item, index) => (
                <div style={{ padding: "10px" }}>
                  <EuCard
                    thethingyintheplace={index}
                    title={item.name}
                    src={item.profile_pic}
                  />
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ExploreUsers;
