import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";

import { AiOutlineGithub, AiOutlineLinkedin } from 'react-icons/ai';


const About = () => {
    const visitePortfolio = () => {
        window.location = "https://jawad-protfolio.netlify.app/";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/dztgfyv6p/image/upload/v1677169436/profile_sxz0xa.jpg"
                            alt="Owner@JawadJisan"
                        />
                        <Typography>Jawad Jisan</Typography>
                        <Button onClick={visitePortfolio} color="primary">
                            Visit Portfolio
                        </Button>
                        <span>
                            This is a sample wesbite made by @Jawad Jisan.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Reach out to me</Typography>
                        <a
                            href="https://github.com/JawadJisan"
                            target="blank"
                        >
                            <AiOutlineGithub className="youtubeSvgIcon" />
                        </a>

                        <a href="https://www.linkedin.com/in/jawad-jisan/" target="blank">
                            <AiOutlineLinkedin className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;