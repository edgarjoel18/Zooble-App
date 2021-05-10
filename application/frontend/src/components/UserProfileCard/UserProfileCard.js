import {AppBar, Card, Typography, Grid } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Tab from './Tab/Tab';

import styles from "./UserProfileCard.module.css";

function UserProfileCard(props) {
  const [followersList, setFollowersList] = useState([]);

  const [followingList, setFollowingList] = useState([]);

  let history = useHistory();

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
      <div className={styles.Tabs} >
        <div style={{display: 'flex'}} >
          {tabs}
        </div>
        <div style={{cursor: 'pointer'}}  >
            {/* <button>filter</button> */}
            <p onClick={() => history.goBack()} >Back to Profile</p>
        </div>
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
              borderRadius: '0 0 7.5px 7.5px',
              padding:'16px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {" "}
            {followersList.map((item, index) => (
              <Link
                style={{ textDecoration: "none" }}
                key={item.follower_id}
                to={"/Profile/" + item.url}
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
              borderRadius: '0 0 7.5px 7.5px',
              padding:'16px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {" "}
            {followingList.map((item, index) => (
              <Link
                style={{ textDecoration: "none" }}
                key={item.follower_id}
                to={"/Profile/" + item.url}
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
