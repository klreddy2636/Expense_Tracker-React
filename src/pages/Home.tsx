import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import visualChart from "../assets/visual_chart.jpg";
import background from "../assets/background1-img.jpg";
import "../styles/Home.css";

const Home: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Easing function for animations
      once: true, // Animation should happen only once - while scrolling down
    });
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserName(userDoc.data()?.name || null);
            console.log(userDoc.data());
          } else {
            setUserName(userDoc.data()?.name || "User");
          }
        } catch (error) {
          console.error("Error fetching user document: ", error);
          setError("Missing or insufficient permissions.");
        }
      }
    };

    fetchUserName();
  }, []);

  return (
    <Parallax pages={3} style={{ top: "0", left: "0" }}>
      {/* Background Layer */}
      <ParallaxLayer
        offset={0}
        speed={1}
        factor={2}
        style={{
          backgroundImage: `url(${visualChart})`,
          backgroundSize: "cover",
        }}
        //style={{ backgroundColor: "#87CEEB", height: "100vh" }}
      />
      <ParallaxLayer offset={0.1} speed={0.8}>
        <div className="home">
          <div>
            <h1 data-aos="fade-right">Welcome to the Expense Tracker</h1>
            <h2 data-aos="fade-left">Your Expenses in your hands</h2>
            {userName && <h2 data-aos="fade-up">Hello, {userName}!</h2>}

            <Link to="/add-expense">
              <button data-aos="fade-right">Add New Expense</button>
            </Link>
            <Link to="/expenses">
              <button data-aos="fade-up">View All Expenses</button>
            </Link>

            <Link to="/signin">
              <button data-aos="fade-down">Sign in</button>
            </Link>

            <Link to="/register">
              <button data-aos="fade-left">Sign up</button>
            </Link>
          </div>
        </div>
      </ParallaxLayer>
      <ParallaxLayer
        offset={1}
        speed={1}
        factor={3}
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }}
        //offset={1}
        //speed={0.5}
        //style={{ backgroundColor: "#FF7F50", height: "100vh" }}
      >
        <div className="home">
          <h2 data-aos="fade-up">Track your expenses effortlessly!</h2>
        </div>
      </ParallaxLayer>
      <ParallaxLayer
        sticky={{ start: 1, end: 2.5 }}
        offset={2}
        speed={1}
        factor={5}
        //offset={2}
        //speed={0.2}
        //style={{ backgroundColor: "#FFD700", height: "100vh" }}
      >
        <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3FwOXZnMXlsNHI4Zm42NWpyZjg2MXJnaGVscGh2bmc1aTRuZjlhNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JrXas5ecb4FkwbFpIE/giphy.gif" />

        <div className="home">
          <h2 data-aos="fade-up">Get started today!</h2>
          <Link to="/add-expense">
            <button data-aos="fade-right">Add New Expense</button>
          </Link>
        </div>
      </ParallaxLayer>
    </Parallax>
  );
};

export default Home;

/*
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <h1>Welcome to the Expense Tracker</h1>
      <Link to="/add-expense">
        <button>Add New Expense</button>
      </Link>
      <Link to="/expenses">
        <button>View All Expenses</button>
      </Link>
      <Link to="/signin">
        <button>Sign in</button>
      </Link>
      <Link to="/register">
        <button>Sign up</button>
      </Link>
    </div>
  );
};

export default Home;
*/
