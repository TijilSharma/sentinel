import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "../index.css";

const teamMembers = [
  { id: "tijil", name: "Tijil Sharma", role: "Team Leader and Backend Developer", img: "/Images/Tijil.jpeg", bio: "The kind of leader people want to be under AND want to be—Tijil is the driving force that kept Team Kaizen pushing forward at Yantra Central Hackathon '25. Whether it was making tough calls or tackling roadblocks head-on like a bull, he did it all with an unmatched work ethic. He’s the type to stay calm under pressure, always ready with a game plan to navigate the toughest of challenges. But it’s not just about strategy—Tijil is also the kind of leader who makes sure the team sticks together, whether through late-night problem-solving sessions or much-needed food breaks. Without him, Sentinel would have been just an idea. With him, it became a reality"},
  { id: "abhinav", name: "Abhinav Khurana", role: "Front-End Developer", img: "/Images/Abhinav.JPG", bio: "The person who ensures that Sentinel isn’t just powerful but also user-friendly, Abhinav is the snarky genius who brought the frontend to life. His work wasn’t just about coding—it was about making sure that anyone using Sentinel could understand it at a glance. AI might be complicated, but he made sure the interface wasn’t. From designing clean dashboards to perfecting interactive visuals, he turned bafflingly complex lines of code into clarity. And let’s not forget—while everyone else was buried in models and data, he was the one making sure the whole thing actually LOOKED good. A determined worker and always ready to drop a sarcastic comment (or a dozen), Abhinav effortlessly combines dedication with a great sense of humor." },
  { id: "mahi", name: "Mahi Gadi", role: "Machine Learning Engineer", img: "/Images/Mahi.jpeg", bio: "If there’s one person who could teach machines to think, it’s Mahi. As the mastermind behind Sentinel’s predictive models, she was the one who made sure the AI could actually do its job—predict failures, estimate RULs, and detect anomalies before they became real problems. Whether it was fine-tuning algorithms or debugging under pressure, she took on every challenge with patience. But here’s the thing, Mahi doesn’t just make models; she makes magic happen. With an eagle eye for detail, she turned raw data into actionable insights, making Sentinel the intelligent system it was meant to be." },
  { id: "anjika", name: "Anjika Prasad", role: "Machine Learning Engineer", img: "/Images/Anjika.jpeg", bio: "Every great system needs a strong backbone, and Anjika made sure Sentinel’s models were rock solid. While others saw sleek dashboards and AI-powered insights, she saw databases, APIs, and massive amounts of log data that needed to be processed at lightning speed. And she handled it all with quiet confidence, ensuring that everything ran smoothly behind the scenes. She may not always be in the spotlight, but without her, none of it would have worked." },
  { id: "hemanya", name: "Hemanya Saini", role: "Content Moderator & Presentation Lead", img: "/Images/Hemanya.jpeg", bio: "A project as complex as Sentinel needs someone who can break it down and make it understandable—and that’s where Saini came in. From moderating content to refining failure prediction reports, he made sure Sentinel’s points were not just accurate but also easy to grasp. But he didn’t stop there—crafting presentations, structuring reports, and making sure the team’s work was communicated effectively were all part of the job. And let’s be real, every team needs that one person who makes sure things actually sound as brilliant as they are." },
];

const AboutTeam = () => {
  const location = useLocation();
  const sectionRefs = useRef({});

  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (id && sectionRefs.current[id]) {
      setTimeout(() => { 
        sectionRefs.current[id].scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); // Adding delay ensures proper scrolling
    }
  }, [location]);
  
  

  return (
    <Container fluid className="about-team-page">
      <Row className="text-center">
        <Col>
          <motion.h1
            className="fw-bold text-light mt-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Meet Our Team
          </motion.h1>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center mt-4">
        {teamMembers.map((member, index) => (
          <Col md={10} lg={8} key={member.id} className="mb-4">
            <motion.div
              ref={(el) => (sectionRefs.current[member.id] = el)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="team-member d-flex align-items-center"
            >
              <img src={member.img} alt={member.name} className="team-photo" />
              <div className="team-info">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
              </div>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AboutTeam;



