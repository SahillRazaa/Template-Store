'use strict';
const { v4: uuidv4 } = require('uuid');

const projects = [
  {
    name: "E-Commerce Website – Full-Stack MERN Application",
    short_description: "A responsive and feature-rich e-commerce platform built with React.js, Node.js, Express, and MongoDB Atlas, secured via JWT authentication.",
    long_description: "A responsive and feature-rich e-commerce platform built with React.js, Node.js, Express, and MongoDB Atlas, secured via JWT authentication.\n\nThe platform includes elegant login/register flows, dynamic product pages with filtering and sorting, a persistent cart using Redux and React Persist, and a secure checkout process powered by Stripe API. The app provides a seamless shopping experience with personalized user profiles, order history, and mobile-friendly design.\n\nFeatures:\n- Secure Auth System (Login/Register) using JWT.\n- Dynamic Products & Best Deals Page.\n- Product filtering and sorting by brand/category.\n- Persistent Cart with Redux + React Persist.\n- Stripe-Integrated Secure Checkout.",
    thumbnail_url: "https://image2url.com/images/1762476347468-013104ab-48e8-49be-ad6a-8f0447481865.png",
    category: "E-commerce",
  },
  {
    name: "Soul Healer – A Flutter-Based Personalized Music App",
    short_description: "Soul Healer is a feature-rich music streaming app built using Flutter and the YouTube API. Designed for personalized music discovery, it offers trending tracks, genre and language-based filtering, and real-time song search.",
    long_description: "Soul Healer is a feature-rich music streaming app built using Flutter and the YouTube API. Designed for personalized music discovery, it offers trending tracks, genre and language-based filtering, and real-time song search.\n\nWith smooth audio playback using just_audio, persistent mini-player controls, theme customization, and an interactive feedback system, Soul Healer blends functionality with an engaging user experience. Powered by Provider for responsive state management, it's crafted for both performance and usability.\n\nFeatures:\n- Real-Time Song Search & Genre Exploration.\n- Favorites Management & Theme Customization.\n- Seamless Playback with Persistent Controls.\n- Artist, Language & Year-Based Song Filtering.",
    thumbnail_url: "https://image2url.com/images/1762476324667-216821a6-3457-491f-9acd-af1ffb26653c.png",
    category: "Mobile App",
  },
  {
    name: "Plantify Mobile - Plant Selling App in Flutter",
    short_description: "A fully functional eCommerce app built using Flutter for plant shopping. Features include user auth, real-time order placement, saved favorites, and CRUD operations integrated with Firebase.",
    long_description: "A fully functional eCommerce app built using Flutter for plant shopping. Features include user auth, real-time order placement, saved favorites, and CRUD operations integrated with Firebase.\n\nProblem: Local nurseries lost 60% of their sales during COVID-19 due to the lack of a digital storefront or mobile presence. Plantify aims to bridge this gap by offering a dedicated mobile platform for plant shopping.\n\nFeatures:\n- Firebase Auth & Firestore Integration.\n- Cart, Order, and Favorites system.\n- Dynamic filtering and plant listing.\n- User profile, order history, and logout.",
    thumbnail_url: "https://image2url.com/images/1762476260928-761ebc49-f2bb-4aa1-a640-4e196b8403d5.png",
    category: "Mobile App",
  },
  {
    name: "Plantify Web – A Figma to React UI Transformation",
    short_description: "A visually rich, fully responsive plant-selling website built with React, inspired by a complex Figma design. This frontend-only project showcases pixel-perfect UI implementation.",
    long_description: "A visually rich, fully responsive plant-selling website built with React, inspired by a complex Figma design. This frontend-only project showcases pixel-perfect UI implementation, modular component architecture, and design-to-code accuracy without relying on backend integration.\n\nThis project aimed to bridge the gap for local plant-selling businesses with poor digital presentation by building a high-fidelity website using React, focused entirely on frontend implementation, responsiveness, and visual consistency.\n\nFeatures:\n- Faithfully translated a detailed Figma design into a responsive, production-ready React interface.\n- Built using modular, reusable components (PlantCard, Header, FilterBar, etc.).\n- Utilized design tokens (colors, spacing, fonts) to ensure uniformity.",
    thumbnail_url: "https://image2url.com/images/1762476293931-4bcb4499-e08e-4f4e-8c1e-d13d76f1aaec.png",
    category: "E-commerce",
  },
  {
    name: "ChatNChill - Real-Time Chat",
    short_description: "ChatNChill is a real-time one-to-one chat application built with the MERN stack and WebSocket technology. It allows users to instantly message each other, showing online status.",
    long_description: "ChatNChill is a real-time one-to-one chat application built with the MERN stack and WebSocket technology. It allows users to instantly message each other, showing online status and displaying the last message exchanged for a smooth and intuitive chat experience.\n\nThis app solves the problem of delays in message delivery or inaccurate online status indicators by leveraging WebSocket for persistent, bidirectional communication. MongoDB stores chat histories and user statuses, with Express and Node.js managing APIs and socket events.\n\nFeatures:\n- Real-time one-to-one messaging using WebSocket.\n- Online/offline user status indicators.\n- Last message preview in chat lists for quick context.\n- Responsive UI with seamless chat transitions.",
    thumbnail_url: "https://image2url.com/images/1762476414019-ddecbc79-69bd-4347-a089-54658c450cdd.png",
    category: "Social & Communication",
  },
  {
    name: "CodeTrace - Visual Debugging with LLM Model",
    short_description: "CodeTrace is a web-based debugging assistant that helps users visualize code execution line by line. Built during a hackathon, it integrates a LLM model for logic generation and explaination.",
    long_description: "CodeTrace is a web-based debugging assistant that helps users visualize code execution line by line. Built during a hackathon, it integrates a LLM model (LLaMA 3.2) for logic generation and explaination, shows variable state changes, and supports dry run simulation.\n\nThis project won 1st place among 150+ teams in Vashisht Hackathon 2025.\n\nFeatures:\n- Understand your code's execution flow visually with an intuitive dry-run simulator.\n- Leverage LLaMA-powered intelligence to detect bugs and get real-time code improvement suggestions.\n- Solve interactive challenges that mimic industry-level debugging problems in a fun, engaging way.\n- Accessible UI with support for multiple languages.",
    thumbnail_url: "https://image2url.com/images/1762476216817-366f2481-d839-4ec4-aba0-04fd6607b68e.png",
    category: "Developer Tools",
  },
  {
    name: "Portfolio Website",
    short_description: "Personal portfolio website built in React + Vite. Includes sections like Journey, Projects, Skills, Testimonials, and a toggle for dark mode. Features a live Resume download and filters in projects.",
    long_description: "Personal portfolio website built in React + Vite. Includes sections like Journey, Projects, Skills, Testimonials, and a toggle for dark mode. Features a live Resume download and filters in projects.\n\nThis portfolio serves as a central platform for showcasing skills and projects, improving professional presence, and acting as a go-to reference during interviews, internships, and collaborations.\n\nFeatures:\n- Animated scroll and section transitions.\n- Responsive and minimal UI design.\n- Dark mode toggle and resume button.\n- Project filtering by type and tech.",
    thumbnail_url: "https://image2url.com/images/1762476389503-09542acb-0ec4-46bc-b449-6f1d975fbcba.png",
    category: "Portfolio",
  },
  {
    name: "Student Progress Management System",
    short_description: "A comprehensive Student Progress Management System, focusing on tracking and analyzing student performance in competitive programming. Built with MERN stack, it features secure admin authentication and real-time data synchronization.",
    long_description: "A comprehensive Student Progress Management System developed for a full-stack developer hiring assignment, focusing on tracking and analyzing student performance in competitive programming. Built with MERN stack, it features secure admin authentication, real-time Codeforces data synchronization, automated email reminders, and detailed analytics dashboards.\n\nThis system provides a powerful tool to monitor student progress, identify at-risk students, and deliver targeted interventions. Automated features save significant manual effort while ensuring data is always up-to-date.\n\nFeatures:\n- Secure JWT-based admin authentication with protected routes.\n- Automated daily synchronization with Codeforces API.\n- Interactive dashboards with student performance analytics.\n- Automated email reminders for inactive students.",
    thumbnail_url: "https://image2url.com/images/1762476458242-ea622bc4-19c5-49ae-abf5-0bcc049c8f9d.png",
    category: "Analytics",
  },
  {
    name: "Ekaura Ceramics Website",
    short_description: "Developed and managed the official website for Ekaura, a B2B brand specializing in artisan-crafted handmade ceramics. Built using Wix's visual builder, the site features detailed product pages.",
    long_description: "Developed and managed the official website for Ekaura, a B2B brand specializing in artisan-crafted handmade ceramics. Built using Wix's visual builder, the site features detailed product pages and integrated order and contact forms, providing a seamless experience for wholesale clients.\n\nEkaura needed a professional online presence to showcase their handmade ceramic products and simplify the B2B ordering process. They required a cost-effective, easy-to-manage website solution without the overhead of complex custom development.\n\nFeatures:\n- Wix-based visual site builder enabling easy product catalog creation and management.\n- Fully mobile-optimized design ensuring accessibility and smooth browsing across devices.\n- Integrated order and contact forms streamlining customer inquiries and order placements.",
    thumbnail_url: "https://image2url.com/images/1762476432138-ff2ee23d-45c2-4b92-a7a1-29beb8769c86.png",
    category: "CMS",
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const templateData = projects.map(project => ({
      id: uuidv4(),
      name: project.name,
      short_description: project.short_description,
      long_description: project.long_description,
      thumbnail_url: project.thumbnail_url,
      category: project.category,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Templates', templateData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Templates', null, {});
  }
};