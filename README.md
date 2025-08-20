# Wander 🌍✈️

## Abstract

**Wander** — an invitation to discover.  
This single-page travel planning web application lets users log in, explore their past and future trips, and plan new getaways. Built with **TypeScript, SCSS, and modern JavaScript tooling**, it features both a **Traveler View** and an **Agent Portal**:

- **Travelers** can log in, view trip details, estimate costs with dynamic form inputs, and request new trips.
- **Agents** have a dedicated dashboard to review pending requests, track profits, and visualize yearly earnings with interactive charts.

Wander was created by [Adam Meza](adam-meza.com) as part of the cirriculum at Turing School for Software Designs' frontend program. The main goal of this assignment was to practice making API calls, creating a clean, readable UI and responding to events on the DOM. IT was completed over the course of 1 week in 2023 in Javascript and CSS. It was then refactored and converted to TS and SCSS in the summer of 2025. The original repo can be found [here](https://github.com/Adam-Meza/Travel-Tracker).

_Deployment can be found [here](https://travel-tracker-ts-tjsq-mwcx4krtv-adammezas-projects.vercel.app/)._

### Preview of App:

![alt text](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjZkNDFlODMyOWM2MGE0ZWI0MGMzNDJjYzc0YzcxNWU4ZDZjMzRmYSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/aKpVyFr0gTIzKvhib9/giphy.gif)

---

## Features

### Traveler Experience

- View existing trip history & costs
- Submit new trip requests with cost estimates (via Day.js + custom calculation classes)
- Interactive trip details modal view

## Agent Dashboard

- Approve/deny pending requests
- Yearly profit visualization powered by Chart.js
- Search and filter user requests dynamically

## Global

- Modular TypeScript architecture with strict types (TripType, UserType, AgentType, etc.)
- Centralized DOM queries & event handlers
- Reusable SCSS mixins and component-level styling
