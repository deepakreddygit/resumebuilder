import React from "react";
import "../styles/ResumeAnalytics.css";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from "recharts";

const COLORS = ["#2f5bea", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#FF69B4"];

const ResumeAnalytics = ({ resumes }) => {
  if (!resumes || resumes.length === 0) return null;

  // Group by role
  const roleCounts = {};
  resumes.forEach((r) => {
    const role = r.role || "Unknown";
    roleCounts[role] = (roleCounts[role] || 0) + 1;
  });
  const roleData = Object.entries(roleCounts).map(([role, value]) => ({ name: role, value }));

  // Group by template
  const templateCounts = {};
  resumes.forEach((r) => {
    const template = r.templateNumber || "Unknown";
    templateCounts[template] = (templateCounts[template] || 0) + 1;
  });
  const templateData = Object.entries(templateCounts).map(([template, count]) => ({ template, count }));

  return (
    <div className="resume-analytics-wrapper">
      <div className="resume-analytics-header">
        {/* <h2>Resume Analytics</h2> */}
        <h3>Visual overview of your resume history</h3>
      </div>

      <div className="resume-analytics-charts">
        {/* Pie Chart */}
        <div className="chart-container">
          <h4>Resumes by Role</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart margin={{ top: 20, right: 60, bottom: 5, left: 60 }}>
            <Pie
  data={roleData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  innerRadius={60}
  outerRadius={90}
  fill="#8884d8"
  label={({ name, percent }) => `${name.split("-")[0]} (${(percent * 100).toFixed(0)}%)`}
  labelLine={false}
>

                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="chart-container">
          <h4>Resumes by Template</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={templateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="template" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#2f5bea"
                isAnimationActive={true}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalytics;

