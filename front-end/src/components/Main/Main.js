import React from 'react';
import Posts from '../Posts/Posts';
import { Skills } from '../Skills/Skills';

const Main = (props) => {
    console.log(props);
    return(
        <main className="body">
            <Posts posts={props.projects} title={'Projects'} id="projects"/>
            <Posts posts={props.blog} title={'Blog'} id="blog"/>
            <Skills skills={props.skill}/>
        </main>
    );
}

export default Main;