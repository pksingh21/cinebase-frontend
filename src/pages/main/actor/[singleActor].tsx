import { ActorsForCurrentMovie } from "@/atoms/atom";
import Topbar from "@/components/TopBar/topbar";
import FemaleIcon from "@mui/icons-material/Female";
import { StyledBreadcrumb } from "@/components/breadcrumbs/base";
import { Actor } from "@/types/types";
import { CalendarMonth } from "@mui/icons-material";
import { Grid, Typography, styled } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CakeIcon from "@mui/icons-material/Cake";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { useRecoilValue } from "recoil";
import MaleIcon from "@mui/icons-material/Male";
const Root = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    paddingTop: "65px",
  },
  [theme.breakpoints.up("sm")]: {
    paddingTop: "65px",
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: "120px",
  },
  [theme.breakpoints.up("lg")]: {
    paddingTop: "120px",
  },
  [theme.breakpoints.up("xl")]: {
    paddingTop: "120px",
  },
}));
function DynamicPage() {
  const session = useSession();
  const router = useRouter();
  const [screenWidth, setScreenWidth] = React.useState(0);
  let { singleActor } = router.query as { singleActor: string };
  const allActorsForCurrentMovie = useRecoilValue(ActorsForCurrentMovie);
  const [currentActor, setCurrentActor] = useState<Actor[]>(() =>
    allActorsForCurrentMovie.filter(
      (actor) => actor.id === Number.parseInt(singleActor)
    )
  );
  const [posterPath, setPosterPath] = useState("");
  console.log(currentActor, "current Actor");
  React.useEffect(() => {
    setCurrentActor(() =>
      allActorsForCurrentMovie.filter(
        (actor) => actor.id === Number.parseInt(singleActor)
      )
    );
  }, [allActorsForCurrentMovie]);
  React.useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    setScreenWidth(window.innerWidth);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPosterPath(
      `https://image.tmdb.org/t/p/original${currentActor[0].profile_path}`
    );
  }, []);
  if (
    session.status === "loading" ||
    // currentActor === undefined ||
    !router.isReady
  ) {
    return <h2>Loading</h2>;
  } else if (session.status === "unauthenticated") {
    router.replace("/auth/login");
    return;
  }
  return (
    <div>
      <Topbar />
      <Grid container justifyContent={"center"} alignItems="center">
        <Grid item xs={12}>
          <Image
            src={posterPath}
            alt="Background Image"
            priority={true}
            fill={false}
            style={{
              zIndex: -2,
              position: "fixed",
              left: 0,
              right: 0,
              filter: "brightness(20%)",
              pointerEvents: "none",
            }}
            width={`1920`}
            height={`1080`}
          />
        </Grid>
      </Grid>
      <Root>
        <Grid
          container
          justifyContent={"center"}
          alignItems="stretch"
          style={{ paddingRight: screenWidth >= 900 ? "25vw" : "0vw" }}
        >
          <Grid
            item
            xs={12}
            md={6}
            style={{
              textAlign: screenWidth <= 900 ? "center" : "right",
            }}
          >
            <Image
              alt="Picture of the Movie"
              src={"https://image.tmdb.org/t/p/original" + posterPath}
              width={330}
              height={420}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ paddingLeft: screenWidth >= 900 ? "5vw" : "0vw" }}
            textAlign={screenWidth <= 900 ? "center" : "left"}
          >
            <Typography
              variant="h4"
              fontWeight={900}
              gutterBottom
              color={`white`}
            >
              {currentActor[0].name}
            </Typography>
            {/* <Base
              releaseDate={AllMoviesValue!!.release_date}
              language={MovieLanguage}
              runTime={AllMoviesValue!!.runtime!!}
              // genres={genreForMovie}
        /> */}
            <Typography
              variant="h6"
              gutterBottom
              fontStyle={`italic`}
              color={`white`}
              display={`inline`}
            >
              {/* {AllMoviesValue!!.tagline!!} */}
              Known for: <br />
              {currentActor[0].known_for_department}
            </Typography>
            <div style={{ paddingTop: "20px" }}>
              {currentActor[0].birthday && (
                <>
                  <Typography
                    variant="h6"
                    gutterBottom
                    fontStyle={`italic`}
                    color={`white`}
                    display={`inline`}
                  >
                    {/* {AllMoviesValue!!.tagline!!} */}
                    <StyledBreadcrumb
                      label={currentActor[0].birthday}
                      icon={<CakeIcon fontSize="small" />}
                    />
                    <StyledBreadcrumb
                      style={{ marginLeft: "10px" }}
                      icon={
                        currentActor[0].gender === 1 ? (
                          <MaleIcon />
                        ) : currentActor[0].gender === 2 ? (
                          <FemaleIcon />
                        ) : (
                          <TransgenderIcon />
                        )
                      }
                    />
                  </Typography>
                </>
              )}
            </div>
            {currentActor[0].biography && (
              <>
                <Typography
                  variant="h3"
                  gutterBottom
                  color={`white`}
                  style={{ paddingTop: "20px" }}
                >
                  Biography
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  color={`white`}
                  display={`inline`}
                >
                  {/* {AllMoviesValue!!.overview!!} */}
                  {currentActor[0].biography}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
        {/* <SingleMovieBottom /> */}
        {/* <MovieReview /> */}
      </Root>
    </div>
  );
}

export default DynamicPage;
