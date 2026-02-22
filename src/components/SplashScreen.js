import React, { useEffect, useState } from "react";
import campusriselogo from "../campusriselogo.png";

const SplashScreen = ({ onFinish }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);

        const timer = setTimeout(() => {
            onFinish(); // go to HomePage
        }, 5000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: "100vh",
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
            }}
        >
            <style>
                {`
        .logo-animate {
          opacity: 0;
          transform: scale(0.5) rotate(-10deg);
          transition: all 1.5s ease;
          filter: drop-shadow(0 0 0px #00ffcc);
        }

        .logo-animate.show {
          opacity: 1;
          transform: scale(1.1) rotate(0deg);
          filter: drop-shadow(0 0 25px #00ffcc);
        }

        .logo-animate.show:hover {
          transform: scale(1.15);
          filter: drop-shadow(0 0 35px #00ffcc);
        }
        `}
            </style>

            <img
                src={campusriselogo}
                alt="CampusRise"
                width="550"
                className={`logo-animate ${animate ? "show" : ""}`}
            />
        </div>
    );
};

export default SplashScreen;
