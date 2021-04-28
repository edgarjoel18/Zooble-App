import {AppBar, Card, Typography, Grid } from "@material-ui/core";
// import { Card, CardColumns, Col } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import Tab from './Tab/Tab';

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
      pet_id: 4,
      name: "Max",
      size_name: "small",
      age_name: "two",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
    },
    {
      pet_id: 5,
      name: "Juju",
      size_name: "larg",
      age_name: "ten",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
    },
    {
      pet_id: 6,
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
    {
      pet_id: 4,
      name: "Max",
      size_name: "small",
      age_name: "two",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
    },
    {
      pet_id: 5,
      name: "Juju",
      size_name: "larg",
      age_name: "ten",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
    },
    {
      pet_id: 6,
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
    {
      pet_id: 4,
      name: "Max",
      size_name: "small",
      age_name: "two",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
    },
    {
      pet_id: 5,
      name: "Juju",
      size_name: "larg",
      age_name: "ten",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
    },
    {
      pet_id: 6,
      name: "Mimi",
      size_name: "medium",
      age_name: "six",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg",
    }
  ]);

  const [followingList, setFollowingList] = useState([
    {
      pet_id: 6,
      name: "Max",
      size_name: "small",
      age_name: "two",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
    },
    {
      pet_id: 5,
      name: "Juju",
      size_name: "larg",
      age_name: "ten",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
    },
    {
      pet_id: 4,
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
        <div style={{ display: "flex", width: "200px", padding: "14px" }}>
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

  const onTabClicked = (value) => {
    console.log('[Tag] ' + value + ' is clicked')
    setSelectedTab(value);
  };

  let tabs = ['Followers', 'Following'].map((tab, index) => (
    <Tab key={tab} id={index} section={tab} selected={selectedTab} length={index === 0 ? followersList.length : followingList.length} clicked={onTabClicked}/>
  ));

  return (
    <div className={styles['followers-container']}>
    <div className={styles["tabContainer"]}>
      {/* <div
        position="relative"
        elevation={0}
        style={{
          backgroundColor: "transparent",
          color: "black",
          width: "1440px",
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
      </div> */}
      <div className={styles.Tabs} >
        {tabs}
      </div>
      {selectedTab === 0 && (
        <div>
          <div
            style={{
              // columns: "2",
              width: '100%',
              height: 'calc(100vh - 344px)',
              // maxHeight: 'calc(100vh - 344px)',
              // overflowX: 'scroll',
              overflowY: 'auto',
              margin: "1px auto",
              boxShadow: 'var(--elevation-2)',
              borderRadius: '0 0 15px 15px',
              padding:'16px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {" "}
            {followersList.map((item, index) => (
              <Link
                style={{ textDecoration: "none" }}
                key={item.pet_id + index}
                to={"/Profile/" + item.name}
              >
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
              </Link>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 1 && (
        <div>
          <div
            style={{
              // columns: "2",
              width: '100%',
              height: 'calc(100vh - 344px)',
              // maxHeight: 'calc(100vh - 344px)',
              // overflowX: 'scroll',
              overflowY: 'auto',
              margin: "1px auto",
              boxShadow: 'var(--elevation-2)',
              borderRadius: '0 0 15px 15px',
              padding:'16px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {" "}
            {followingList.map((item, index) => (
              <Link
                style={{ textDecoration: "none" }}
                key={item.pet_id}
                to={"/Profile/" + item.name}
              >
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
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default UserProfileCard;
