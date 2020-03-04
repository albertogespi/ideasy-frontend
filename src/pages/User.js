import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Selects} from "../components/Selects";
import { Header } from "../components/Header";
import { getAvgRatings } from "../http/projectsService";
import { SimpleRating } from "../components/Rating";
import { getUser } from "../http/userService";
import { MyProjectsOrg } from "../components/MyProjectsOrg";
import { MyProjectsDev } from "../components/MyProjectsDev";
import {
  getOrgProjects,
  getFollowedProjects,
  getContributedProjects,
  getNumberOfContributions
} from "../http/projectsService";
import { Footer } from "../components/Footer";
import CircularProgress from '@material-ui/core/CircularProgress';

export function User() {
  const userId = window.location.href.split("/")[4];
  const [user, setUser] = useState(undefined);
  const [isOrgProfile, setIsOrgProfile] = useState(undefined);

  //IsOrgProfile = true
  const [orgProjects, setOrgProjects] = useState([]);

  //IsOrgProfile = false
  const [followedProjects, setFollowedProjects] = useState([]);
  const [contributedProjects, setContributedProjects] = useState([]);
  const [rating, setRating] = useState(undefined);
  const [numberOfContributions, setNumberOfContributions] = useState(0);

  const [buttonSelected, setButtonSelected] = useState(true);

  //filters
  const [selectsState, setSelectsState] = useState({
    category: "",
    complexity: ""
  });

  const history = useHistory();

  let historyQuery = "";
  const updateQuery = () => {
    console.log(selectsState);
    if (selectsState.category !== "") {
      historyQuery += `/?category=${selectsState.category}`;
    }

    if (selectsState.complexity !== "") {
      if (historyQuery === "") {
        historyQuery += `/?complexity=${selectsState.complexity}`;
      } else {
        historyQuery += `&complexity=${selectsState.complexity}`;
      }
    }

    history.push(`/user/${userId}` + historyQuery);
  };

  useEffect(() => {
    getUser(userId).then(response => {
      setUser(response.data);
      setIsOrgProfile(response.data.role === "org");
    });
    getAvgRatings(userId).then(response => {
      const ratingRounded = Math.round(response.data * 2) / 2;
      setRating(ratingRounded);
    });
    getNumberOfContributions(userId).then(response => {
      setNumberOfContributions(response.data);
    });
    updateQuery();
    if (isOrgProfile) {
      getOrgProjects(userId, historyQuery).then(response => {
        setOrgProjects(response.data);
      });
    } else {
      getFollowedProjects(userId, historyQuery).then(response =>
        setFollowedProjects(response.data)
      );
      getContributedProjects(userId, historyQuery).then(response =>
        setContributedProjects(response.data)
      );
    }
  }, [isOrgProfile, selectsState, buttonSelected]);

  if (
    user !== undefined &&
    rating !== undefined &&
    orgProjects !== undefined &&
    followedProjects !== undefined &&
    contributedProjects !== undefined &&
    numberOfContributions !== undefined
  ) {
    console.log(userId);
    return (
      <section className="container" id="user">
        <Header isAccessWindow={false} />
        <section className="body">
          <div className="header-user">
            <section className="centered-container" id="user-container">
              <p id="profile-role">
                {user.role === "dev"
                  ? "Perfil Desarrollador"
                  : "Perfil Organización"}
              </p>
              <section>
              <div className="centered-container">
              <div className="profile-photo" id="big-icon">
                <img
                  src={
                    user.avatarUrl || require("../images/default-avatar.jpg")
                  }
                  alt=""
                  name="profile photo"
                ></img>
              </div>
              <h1>{user.name}</h1>

              <div className="centered-container" id="rating">
                {user.role === "dev" && (
                  <div className="centered-container">
                    <SimpleRating readOnly={true} value={rating} id="stars" />
                    <p>Puntuación media</p>
                    {rating
                      ? `${rating} ${
                          rating === 1 ? "estrella" : "estrellas"
                        } / ${numberOfContributions} ${
                          numberOfContributions === 1
                            ? "contribución"
                            : "contribuciones"
                        }`
                      : "Este usuario aún no ha recibido puntuaciones"}
                  </div>
                )}
              </div>
              </div>
              <div className="centered-container" id="contact">
                <h2>Contacto</h2>
                <p>{user.contactEmail || user.email}</p>
                {user.contactWeb !== "NULL" && (
                  <a href={user.contactWeb}>Sitio web</a>
                )}
              </div>
              </section>
            </section>
          </div>
          <section className="projects">
            <Selects
            isFilters={true} 
              selectsState={selectsState}
              setSelectsState={setSelectsState}
            />
            {isOrgProfile ? (
              <MyProjectsOrg
                projects={orgProjects}
                buttonSelected={buttonSelected}
                setButtonSelected={setButtonSelected}
              />
            ) : (
              <MyProjectsDev
                followedProjects={followedProjects}
                contributedProjects={contributedProjects}
                buttonSelected={buttonSelected}
                setButtonSelected={setButtonSelected}
              />
            )}
          </section>
        </section>
        <Footer />
      </section>
    );
  } else {
    return <div className="centered-container" id="spinner"><CircularProgress size={'4rem'}/></div>;
  }
}
