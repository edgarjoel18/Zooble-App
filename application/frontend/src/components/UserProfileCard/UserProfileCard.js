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
      name: "Max Test Follower 1",
      size_name: "small",
      age_name: "two",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
    },
    {
      pet_id: 2,
      name: "Juju Test Follower 2",
      size_name: "larg",
      age_name: "ten",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
    },
    {
      pet_id: 3,
      name: "Mimi Test Follower 3",
      size_name: "medium",
      age_name: "six",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg",
    },
    {
      pet_id: 1,
      name: "Max Test Follower 4",
      size_name: "small",
      age_name: "two",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
    },
    {
      pet_id: 2,
      name: "Juju Test Follower 5",
      size_name: "larg",
      age_name: "ten",
      profile_pic:
        "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
    },
    {
      pet_id: 3,
      name: "Mimi Test Follower 6",
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
        <Tabs value={selectedTab} onChange={onTabClicked}>
          <Tab label="Followers" />
          <Tab label="Following" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && (
        <Card>
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
        <Card>
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

// import { Tabs, Tab, Row, Container } from "react-bootstrap";
// import { Card, CardColumns, Col } from "react-bootstrap";
// import React, { useState, useRef, useEffect } from "react";
// // import "./UserProfileCard.css";

// function UserProfileCard(props) {
//   const [followersList, setFollowersList] = useState([
//     {
//       pet_id: 1,
//       name: "Max",
//       size_name: "small",
//       age_name: "two",
//       profile_pic:
//         "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
//     },
//     {
//       pet_id: 2,
//       name: "Juju",
//       size_name: "larg",
//       age_name: "ten",
//       profile_pic:
//         "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
//     },
//     {
//       pet_id: 3,
//       name: "Mimi",
//       size_name: "medium",
//       age_name: "six",
//       profile_pic:
//         "https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg",
//     },
//     {
//       pet_id: 1,
//       name: "Max",
//       size_name: "small",
//       age_name: "two",
//       profile_pic:
//         "https://csc648groupproject.s3-us-west-2.amazonaws.com/MaxPic.jpg",
//     },
//     {
//       pet_id: 2,
//       name: "Juju",
//       size_name: "larg",
//       age_name: "ten",
//       profile_pic:
//         "https://csc648groupproject.s3-us-west-2.amazonaws.com/JujuPic.jpg",
//     },
//     {
//       pet_id: 3,
//       name: "Mimi",
//       size_name: "medium",
//       age_name: "six",
//       profile_pic:
//         "https://csc648groupproject.s3-us-west-2.amazonaws.com/MimiPic.jpg",
//     },
//   ]);
//   const EuCard = ({ title, src, thethingyintheplace }) => {
//     return (
//       <Card className="eu-card" key={`${thethingyintheplace}_Card_Item`}>
//         <div style={{ display: "flex", width: "100%", padding: "14px" }}>
//           <div style={{ marginRight: "10px" }}>
//             <img src={src} className="eu-card-img" />
//           </div>
//           <div>
//             <div>{title}</div>
//           </div>
//         </div>
//       </Card>
//     );
//   };

//   return (
//     <div>
//       <div style={{ padding: "15px" }}>
//         <Container>
//           <Tabs
//             defaultActiveKey="followers"
//             id="uncontrolled-tab-example"
//             className="upc-tabs"
//           >
//             <Tab eventKey="followers" title="Followers" className="upc-tab">
//               <div style={{ padding: "10px" }}>
//                 <div className="container">
//                   <Row>
//                     <Col>
//                       {" "}
//                       {followersList.map((item, index) => (
//                         <div style={{ padding: "10px" }}>
//                           <EuCard
//                             title={item.name}
//                             src={item.profile_pic}
//                             thethingyintheplace={index}
//                           />
//                         </div>
//                       ))}
//                     </Col>

//                     <Col>
//                       {" "}
//                       {followersList.map((item, index) => (
//                         <div style={{ padding: "10px" }}>
//                           <EuCard
//                             title={item.name}
//                             src={item.profile_pic}
//                             thethingyintheplace={index}
//                           />
//                         </div>
//                       ))}
//                     </Col>
//                   </Row>
//                 </div>
//               </div>
//             </Tab>
//             <Tab eventKey="following" title="Following" className="upc-tab">
//               <div style={{ padding: "10px" }}>
//                 <Row>
//                   <Col>
//                     {followersList.map((item) => (
//                       <div style={{ padding: "10px" }}>
//                         <EuCard title={item.name} src={item.profile_pic} />
//                       </div>
//                     ))}
//                   </Col>

//                   <Col>
//                     {followersList.map((item) => (
//                       <div style={{ padding: "10px" }}>
//                         <EuCard title={item.name} src={item.profile_pic} />
//                       </div>
//                     ))}
//                   </Col>
//                 </Row>
//               </div>
//             </Tab>
//           </Tabs>
//         </Container>
//       </div>
//     </div>
//   );
// }

// export default UserProfileCard;
