import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import axios from "axios";

const Dashboard = ({ fileUploaded }) => {
  const [histogramData, setHistogramData] = useState([]);
  const [loading, setLoading] = useState(false);
  const backendURL = "https://predictivemain.onrender.com";

  const WARNING_THRESHOLD = 122;
  const CRITICAL_THRESHOLD = 45;

  useEffect(() => {
    if (!fileUploaded) return; // ✅ Prevents fetching if no file is uploaded

    const fetchHistogramData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendURL}/load-data`);
        const rulData = response.data.data || [];

        if (!Array.isArray(rulData)) {
          throw new Error("Invalid RUL data received.");
        }

        const binSize = 10;
        const bins = rulData.reduce((acc, item) => {
          const bin = Math.floor(item.Predicted_RUL / binSize) * binSize;
          acc[bin] = (acc[bin] || 0) + 1;
          return acc;
        }, {});

        setHistogramData(Object.entries(bins).map(([bin, count]) => ({ bin: Number(bin), count })));
      } catch (error) {
        console.error("Error fetching RUL data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistogramData();
  }, [fileUploaded]);

  return (
    <div className="content p-4">
      <Row className="mb-4">
        <Col>
          <h2 className="text-white">📊 Sentinel Dashboard</h2>
          <p className="text-white">Real-time insights and analytics</p>
        </Col>
      </Row>

      <Row className="mb-4">
        {[
          { title: "🚨 High Risk Failures", text: "3 Components at High Risk" },
          { title: "🔄 Remaining Useful Life", text: "Avg. 120 hours per component" },
          { title: "⚠️ Anomalies Detected", text: "2 Unusual Patterns Found" },
        ].map((item, index) => (
          <Col md={4} key={index}>
            <Card className="p-3 shadow-sm bg-dark text-light">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {!loading && histogramData.length > 0 && (
        <Row className="mt-4">
          <Col>
            <Card className="p-4 shadow-sm bg-dark text-light">
              <Card.Body>
                <Card.Title>📊 RUL Distribution</Card.Title>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={histogramData}>
                    <XAxis dataKey="bin" label={{ value: "Remaining Useful Life (RUL)", position: "insideBottom", dy: 10 }} />
                    <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="blue" />
                    <ReferenceLine x={WARNING_THRESHOLD} stroke="orange" strokeDasharray="4 4" label="Warning Threshold" />
                    <ReferenceLine x={CRITICAL_THRESHOLD} stroke="red" strokeDasharray="4 4" label="Critical Threshold" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Dashboard;











