import { Tabs, Tab, AppBar, Card, Typography, Grid } from "@material-ui/core";
// import { Card, CardColumns, Col } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import styles from "./UserProfileCard.module.css";

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

  const [followingList, setFollowingList] = useState([
    {
      pet_id: 1,
      name: "Max Test Following 1",
      size_name: "small",
      age_name: "two",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
    },
    {
      pet_id: 2,
      name: "Juju Test Following 2",
      size_name: "larg",
      age_name: "ten",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
    },
    {
      pet_id: 3,
      name: "Mimi Test Following 3",
      size_name: "medium",
      age_name: "six",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg",
    },
    {
      pet_id: 1,
      name: "Max Test Following 4",
      size_name: "small",
      age_name: "two",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
    },
    {
      pet_id: 2,
      name: "Juju Test Following 5",
      size_name: "larg",
      age_name: "ten",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
    },
    {
      pet_id: 3,
      name: "Mimi Test Following 6",
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

  const Panel = (props) => (
    <div>
      <Typography>{props.children}</Typography>
    </div>
  );

  const [selectedTab, setSelectedTab] = useState(0);

  const onTabClicked = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="tabContainer">
      <AppBar
        position="flex"
        elevation={0}
        style={{
          backgroundColor: "transparent",
          color: "black",
          width: "1000px",
          margin: "auto",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={onTabClicked}
          TabIndicatorProps={{ style: { background: "#00cc99" } }}
        >
          <Tab label="Followers" />
          <Tab label="Following" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && (
        <Card elevation = {0}>
          <div style={{ columns: "2", width: "1000px", margin: "auto" }}>
            {" "}
            {followersList.map((item, index) => (
              <div
                style={{
                  padding: " 10px 0px",
                }}
              >
                <EuCard
                  title={item.name}
                  src={item.profile_pic}
                  thethingyintheplace={index}
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {selectedTab === 1 && (
        <Card elevation = {0}>
          <div style={{ columns: "2", width: "1000px", margin: "auto" }}>
            {" "}
            {followingList.map((item, index) => (
              <div
                style={{
                  padding: " 10px 0px",
                }}
              >
                <EuCard
                  title={item.name}
                  src={item.profile_pic}
                  thethingyintheplace={index}
                />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

export default UserProfileCard;

