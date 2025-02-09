import React from "react";
import { Container, Row, Col, Button, Accordion, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../index.css";

const teamMembers = [
  { id: "tijil", name: "Tijil Sharma", role: "Team Leader and Backend Developer" },
  { id: "abhinav", name: "Abhinav Khurana", role: "Front-End Developer" },
  { id: "mahi", name: "Mahi Gadi", role: "Machine Learning Engineer" },
  { id: "anjika", name: "Anjika Prasad", role: "Machine Learning Engineer" },
  { id: "hemanya", name: "Hemanya Saini", role: "Content Moderator & Presentation Lead" },
];


const Overview = () => {
  const navigate = useNavigate();

  return (
    <div className="overview-background"> 
      <Container fluid className="overview-content">
        {/* Hero Section */}
        <Row className="mb-5 text-center">
          <Col>
            <motion.h1
              className="fw-bold header text-light"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Sentinel: AI-Powered Predictive Maintenance
            </motion.h1>
            <motion.p
              className="text-white header fs-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Reducing downtime, optimizing resources, and ensuring equipment health with AI.
            </motion.p>
          </Col>
        </Row>

        {/* Problem & Solution Accordions */}
        <Row className="mb-4">
          <Col md={8} className="mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>🚨 The Problem</Accordion.Header>
                  <Accordion.Body>
                  Unplanned equipment downtime is a silent killer in industries worldwide. Every minute a machine sits idle, efficiency drops, and customer trust erodes. Traditional maintenance strategies, like reactive repairs and scheduled servicing, often fail to leverage situational real-time data; and this makes businesses haemorrhage cash in insane amounts.
                  Why is it that the current industry model of maintenance is causing such huge losses? 
                  <br></br>
                  <br></br>
                  The issue lies at the feet of the two most prevalent forms. <b>Reactive maintenance</b> is the first and foremost; 
                  "fix it when it breaks" is, let’s be honest, not exactly the most advanced way to approach this. 
                  The second is a subtler issue – <b>preventive maintenance.</b> 
                  Regular, fixed schedules often miss hidden issues because of the intervals – we need a tactic that changes with every single problem. 
                  That’s where <b>Project Sentinel</b> comes into the picture.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>💡 The Solution: Project Sentinel</Accordion.Header>
                  <Accordion.Body>
                  By integrating AI, IoT sensors, and big data analytics,Project Sentinel plans to use predictive maintenance and anticipate failures before they occur. It uses:
<br></br>
<b>· Live monitoring</b>: Sensors detect early signs of wear. It catches issues in real-time. In the current model, our website has an option to take and analyze manually uploaded log files; this will be upgraded as the project evolves.
<br></br><b>· Machine learning algorithms</b>: These analyze patterns from the log files to forecast breakdowns and eventually create shifting schedules for maintenance.
<br></br><b>· Historical data insights</b>: compare past failures to prevent future ones. Data-driven repairs mean fixing only what’s needed.
<br></br>
<br></br>In a world where every second counts, predictive maintenance is the key to uninterrupted operations. Companies that embrace infocentric strategies will outperform, outlast, and outmaneuver competitors stuck in the past. The choice is clear: evolve or risk being left behind.
The smartest businesses are making the switch. <b>Will you?</b>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </motion.div>
          </Col>
        </Row>
      {/* Team Members Section */}
      <>
  <h2 className="text-center meet-the-team mt-4">Meet the Team</h2> {/* Added heading */}
  <Row className="mt-4 d-flex justify-content-center">
    {teamMembers.map((member, index) => (
      <Col md={4} sm={6} xs={12} key={index} className="mb-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: index * 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Card
            className="team-card p-3"
            onClick={() => navigate(`/about-team#${member.id}`)} // Navigate with ID
            style={{ cursor: "pointer" }}
          >
            <Card.Body className="text-center">
              <Card.Title className="fs-4">{member.name}</Card.Title>
              <Card.Text className="fs-5">{member.role}</Card.Text>
            </Card.Body>
          </Card>
        </motion.div>
      </Col>
    ))}
  </Row>
</>



        {/* Call to Action */}
        <Row className="text-center">
          <Col>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/dashboard")}
            >
              Explore Project Sentinel
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Overview;









