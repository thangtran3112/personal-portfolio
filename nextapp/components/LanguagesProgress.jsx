"use client";
import React from "react";
import { motion } from "framer-motion";

const LanguagesProgress = () => {
  const languages = [
    { language: "AWS", proficiency: 90, bgColor: "#9816f5" },
    { language: "MongoDB", proficiency: 70, bgColor: "#fb6661" },
    { language: "Postgres", proficiency: 70, bgColor: "#fb6661" },
    { language: "Dynamo", proficiency: 70, bgColor: "#fb6661" },
    { language: "Python", proficiency: 70, bgColor: "#1c7cf2" },
    { language: "Express", proficiency: 70, bgColor: "#e92ba4" },
    { language: "React", proficiency: 80, bgColor: "#e92ba4" },
    { language: "Node.js", proficiency: 90, bgColor: "#e92ba4" },
    { language: "Next.js", proficiency: 70, bgColor: "#e92ba4" },
    { language: "Nest.js", proficiency: 80, bgColor: "#e92ba4" },
    { language: "Typescript", proficiency: 80, bgColor: "#e92ba4" },
    { language: "Java", proficiency: 70, bgColor: "#18cf12" },
    { language: "SpringBoot", proficiency: 70, bgColor: "#18cf12" },
    { language: "Docker", proficiency: 70, bgColor: "#1c7cf2" },
    { language: "K8s", proficiency: 60, bgColor: "#1c7cf2" },
  ];

  return (
    <div className="max-w-lg">
      <h4 className="bold-20 mb-4 uppercase">
        Languages / Frameworks Proficiency
      </h4>
      <div className="flexStart flex-wrap">
        {languages.map((lang, index) => (
          <CircularProgress
            key={index}
            language={lang.language}
            proficiency={lang.proficiency}
            bgColor={lang.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

const CircularProgress = ({ language, proficiency, bgColor }) => {
  const radius = 18; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - proficiency / 100);

  return (
    <div>
      <svg className="w-24 h-24 mr-1" viewBox="0 0 50 50">
        <circle
          className="circle-bg"
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="7"
        />
        <motion.circle
          className="circle"
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: strokeDashoffset }}
          transition={{ duration: 1 }}
          strokeLinecap="round"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#555"
          fontSize="6px"
          fontWeight="bold"
        >
          {language}
        </text>
      </svg>
    </div>
  );
};

export default LanguagesProgress;
