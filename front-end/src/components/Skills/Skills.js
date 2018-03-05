import React from 'react';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

export const Skills = props => {
  const items = props.skills.map(skill => (
    <div className="skils__skill-container" key={skill._id}>
      <h3 className="skills__name">{skill.name}</h3>
      <Progress type="circle" percent={skill.rating / 10 * 100} />
    </div>
  ));
  return (
    <div className="skills">
      <h1>Skills</h1>
      <div className="skills__list">{items}</div>
    </div>
  );
};
