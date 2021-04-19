import { Tabs, Tab, Row, Container } from "react-bootstrap";
import { Card, CardColumns, Col } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
// import "./UserProfileCard.css";

function UserProfileCard(props) {
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
      size_name: "larg",
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
      size_name: "larg",
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
    <div>
      <div style={{ padding: "15px" }}>
        <Container>
          <Tabs
            defaultActiveKey="followers"
            id="uncontrolled-tab-example"
            className="upc-tabs"
          >
            <Tab eventKey="followers" title="Followers" className="upc-tab">
              <div style={{ padding: "10px" }}>
                {/* <div onClick={() => console.log("HELLO WORLD")}>Test</div> */}
                <div className="container">
                  <Row>
                    <Col>
                      {" "}
                      {followersList.map((item, index) => (
                        <div style={{ padding: "10px" }}>
                          <EuCard
                            title={item.name}
                            src={item.profile_pic}
                            thethingyintheplace={index}
                          />
                        </div>
                      ))}
                    </Col>

                    <Col>
                      {" "}
                      {followersList.map((item, index) => (
                        <div style={{ padding: "10px" }}>
                          <EuCard
                            title={item.name}
                            src={item.profile_pic}
                            thethingyintheplace={index}
                          />
                        </div>
                      ))}
                    </Col>
                  </Row>
                </div>
              </div>
            </Tab>
            <Tab eventKey="following" title="Following" className="upc-tab">
              <div style={{ padding: "10px" }}>
                <Row>
                  <Col>
                    {followersList.map((item) => (
                      <div style={{ padding: "10px" }}>
                        <EuCard title={item.name} src={item.profile_pic} />
                      </div>
                    ))}
                  </Col>

                  <Col>
                    {followersList.map((item) => (
                      <div style={{ padding: "10px" }}>
                        <EuCard title={item.name} src={item.profile_pic} />
                      </div>
                    ))}
                  </Col>
                </Row>
              </div>
            </Tab>
          </Tabs>
        </Container>
      </div>
    </div>
  );
}

export default UserProfileCard;
