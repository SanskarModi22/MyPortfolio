/* eslint-disable no-unused-vars */
import {
    mobile,
    backend,
    flutter,
    next,
    nest,
    firebase,
    vite,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
    freelancer,
    oneall,
    goblaq,
    quonectic,
    reddit,
    cocreate,
    recruit,
    fundzer,
    screenshare,
    foodly,
    taxian,
    ono
} from "../assets";

export const navLinks = [{
        id: "about",
        title: "About",
    },
    {
        id: "work",
        title: "Work",
    },
    {
        id: "project",
        title: "Project",
    },
    {
        id: "contact",
        title: "Contact",
    },

];

const services = [{
        title: "Web Developer",
        icon: web,
    },
    {
        title: "Flutter Developer",
        icon: mobile,
    },
    {
        title: "Backend Developer",
        icon: backend,
    },
    {
        title: "Product Manager",
        icon: creator,
    },
];

const skilltag = {
    consulting: {
        name: "Consulting",
        textCol: "#FFFFFF",
        backCol: "#f06529",
    },
    bloc: {
        name: "BLOC",
        textCol: "#FFFFFF",
        backCol: "#DD1B16",
    },
    typescript: {
        name: "TypeScript",
        textCol: "#FFFFFF",
        backCol: "#007ACC",
    },
    pm: {
        name: "Project Management",
        textCol: "#FFFFFF",
        backCol: "#007ACC",
    },
    node: {
        name: "NodeJS",
        textCol: "#FFFFFF",
        backCol: "#DD1B16",
    },
    githubActions: {
        name: "GitHub Actions",
        textCol: "#FFFFFF",
        backCol: "#171515",
    },
    blazor: {
        name: "Blazor",
        textCol: "#FFFFFF",
        backCol: "#E0234E",
    },
    problem: {
        name: "Problem Solving",
        textCol: "#FFFFFF",
        backCol: "#E0234E",
    },
    csharp: {
        name: "C#",
        textCol: "#FFFFFF",
        backCol: "#f06529",
    },
    css: {
        name: "CSS",
        textCol: "#FFFFFF",
        backCol: "#264DE4",
    },
    stake: {
        name: "Stake-Holder Management",
        textCol: "#FFFFFF",
        backCol: "#264DE4",
    },
    javascript: {
        name: "JavaScript",
        textCol: "#FFFFFF",
        backCol: "#F0DB4F",
    },
    growth: {
        name: "Growth Strategies",
        textCol: "#FFFFFF",
        backCol: "#F0DB4F",
    },
    socket: {
        name: "Socket.io",
        textCol: "#FFFFFF",
        backCol: "#563D7C",
    },
    apollo: {
        name: "Apollo.io",
        textCol: "#FFFFFF",
        backCol: "#563D7C",
    },
    flutter: {
        name: "Flutter",
        textCol: "#FFFFFF",
        backCol: "#61DBFB",
    },
    communication: {
        name: "Communication",
        textCol: "#FFFFFF",
        backCol: "#61DBFB",
    },
    visualBasic: {
        name: "Visual Basic",
        textCol: "#FFFFFF",
        backCol: "#136099",
    },
    firebase: {
        name: "Firebase",
        textCol: "#FFFFFF",
        backCol: "#A91D22",
    },
    webrtc: {
        name: "WebRTC",
        textCol: "#FFFFFF",
        backCol: "#FF9900",
    },
};

const technologies = [{
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "TypeScript",
        icon: typescript,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "Redux Toolkit",
        icon: redux,
    },
    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "Node JS",
        icon: nodejs,
    },
    {
        name: "MongoDB",
        icon: mongodb,
    },
    {
        name: "NextJS",
        icon: next,
    },
    {
        name: "NestJS",
        icon: nest,
    },
    {
        name: "Firebase",
        icon: firebase,
    },
    {
        name: "Flutter",
        icon: flutter,
    },
    {
        name: "Vite",
        icon: vite,
    },
    // {
    //     name: "Three JS",
    //     icon: threejs,
    // },
    {
        name: "git",
        icon: git,
    },
    // {
    //     name: "figma",
    //     icon: figma,
    // },
    {
        name: "docker",
        icon: docker,
    },
];

const experiences = [{
        title: "Product Manager (Growth & Strategy)",
        company_name: "ONO Suite",
        icon: ono,
        iconBg: "#383E56",
        date: "Jan 2024 - Present",
        points: [
            "Successfully reached out to 50+ brand founders and management, resulting in 20% conversion rate and ultimate partnerships with key brands within the B2B food industry.",
            "Identified and solved challenges for clients, resulting in a 15% reduction in operation costs while simultaneously boosting sales and improving customer satisfaction.",
            "Coordinated with the development, design, marketing, sales, and testing teams, quickly resolving blockers and issues, resulting in a 30% increase in project efficiency and on-time delivery.",
            "Executed successful email campaigns, resulting in a 5-6% reply rate and increased brand visibility for ONO Suite in the USA, Middle East, and Europe.",
            "Spearheaded the integration of various technologies and formed partnerships with hardware vendors and resellers, leading to a 25% expansion in product capabilities and market reach within the restaurant tech industry."
        ],
        technologies: [
            skilltag.apollo,
            skilltag.communication,
            skilltag.growth,
            skilltag.problem,
            skilltag.stake
        ],
    },
    {
        title: "Founding Software Engineer",
        company_name: "Taxian",
        icon: taxian,
        iconBg: "#E6DEDD",
        date: "Oct 2023 - Present",
        points: [
            "Developed and deployed a comprehensive Flutter application on the Play Store, achieving a 100% successful deployment rate and reaching an audience of over 500 active users.",
            "Implemented and optimized various features, increasing user engagement by 30% through the introduction of new features and seamless integration of external APIs.",
            "Meticulously replicated Figma designs, resulting in a 25% improvement in UI/UX satisfaction scores through iterative design enhancements and user testing.",
            "Efficiently managed a team of 5 members, reducing development cycle time by 20% through clear task allocation and coordination",
            "Implemented performance optimizations that reduced app loading time by 15% and increased overall performance metrics by 25%."
        ],
        technologies: [
            skilltag.flutter,
            skilltag.bloc,
            skilltag.pm
        ],
    },
    {
        title: "Freelancer",
        company_name: "",
        icon: freelancer,
        iconBg: "#383E56",
        date: "August 2022 - Present",
        points: [
            "Completed end-to-end web and mobile app projects, ensuring 100% client satisfaction",
            "Collaborated in a team to deliver high-quality projects within deadlines, communicating effectively with team members",
        ],
        technologies: [
            skilltag.flutter,
            skilltag.javascript,
            skilltag.firebase,
        ],
    },
    {
        title: "Project Lead , FullStack Developer",
        company_name: "OneAll Digital",
        icon: oneall,
        iconBg: "#E6DEDD",
        date: "May 2022 - June 2022",
        points: [
            "Oversaw project schedules and coordinated with clients and development team to achieve timely delivery of 3 successful projects resulting in a 70% increase in client satisfaction",
            "Developed Saarthi, a taxi service app and led the development team. Designed and integrated the responsive UI for the Driver app, resulting in a 40% increase in user engagement",
            "Developed a screen and audio sharing application using WebRTC and Socket.io",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
        technologies: [
            skilltag.flutter,
            skilltag.javascript,
            skilltag.firebase,
            skilltag.webrtc,
            skilltag.socket,
            skilltag.css
        ],
    },
    {
        title: "FullStack Developer",
        company_name: "Goblaq",
        icon: goblaq,
        iconBg: "#383E56",
        date: "Oct 2021 - Jan 2023",
        points: [
            " Developed 15+ responsive frontend pages using HTML, CSS, and Blazor, integrated with a C# backend, resulting in a 10% increase in website traffic",
            "Created and launched Flutter web app with NodeJS, Express, and MongoDB backend based on Adobe XD design.Enabled user registration for events and newsletters, resulting in 500 new registrations within the first month",
            "Implementing responsive design and ensuring cross-browser compatibility.",
        ],
        technologies: [
            skilltag.flutter,
            skilltag.javascript,
            skilltag.firebase,
            skilltag.csharp,
            skilltag.blazor,
            skilltag.css,
            skilltag.node
        ],
    },
    {
        title: "Frontend Developer",
        company_name: "Quonectic",
        icon: quonectic,
        iconBg: "#E6DEDD",
        date: "Jan 2022 - Mar 2022",
        points: [
            "Developed 10+ screens for an Educative Android app using Flutter, replicating the design from Figma and writing tests to ensure functionality",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
        technologies: [
            skilltag.flutter,
            skilltag.firebase,
        ],
    },
];

const testimonials = [{
        testimonial: "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
        name: "Sara Lee",
        designation: "CFO",
        company: "Acme Co",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        testimonial: "I've never met a web developer who truly cares about their clients' success like Rick does.",
        name: "Chris Brown",
        designation: "COO",
        company: "DEF Corp",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        testimonial: "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
        name: "Lisa Wang",
        designation: "CTO",
        company: "456 Enterprises",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
];

const projects = [{
        name: "Reddit Clone",
        description: "Developed a fully functional Reddit clone with user authentication, subreddit creation, post creation, comment creation, and upvoting/downvoting features.",
        tags: [{
                name: "flutter",
                color: "blue-text-gradient",
            },
            {
                name: "firebase",
                color: "green-text-gradient",
            },
            {
                name: "riverpod",
                color: "pink-text-gradient",
            },
        ],
        image: reddit,
        source_code_link: "https://github.com/SanskarModi22/Reddit-Clone",
    },
    {
        name: "CoCreate",
        description: "Developed a Google Docs clone that enables real-time collaboration for up to 3+ individuals on a single document.",
        tags: [{
                name: "flutter",
                color: "blue-text-gradient",
            },
            {
                name: "nodejs",
                color: "green-text-gradient",
            },
            {
                name: "mongoDB",
                color: "pink-text-gradient",
            },
            {
                name: "socket.io",
                color: "green-text-gradient",
            },
        ],
        image: cocreate,
        source_code_link: "https://github.com/SanskarModi22/CoCreate",
    },
    {
        name: "RecruitX",
        description: "Developed a mobile app connecting job seekers and employers based on skills and availability, with an intuitive UI and features for job search, applicant tracking, and employer profiles.",
        tags: [{
                name: "flutter",
                color: "blue-text-gradient",
            },
            {
                name: "firebase",
                color: "green-text-gradient",
            },
            {
                name: "provider",
                color: "pink-text-gradient",
            },
        ],
        image: recruit,
        source_code_link: "https://github.com/SanskarModi22/RecruitX",
    },
    {
        name: "Fundzer",
        description: "Fundzer is an innovative platform designed to address financial challenges by connecting individuals or groups in need with philanthropists seeking impactful causes to support.",
        tags: [{
                name: "flutter",
                color: "blue-text-gradient",
            },
            {
                name: "nodejs",
                color: "green-text-gradient",
            },
            {
                name: "mongoDB",
                color: "pink-text-gradient",
            },
        ],
        image: fundzer,
        source_code_link: "https://github.com/Invest-Mate",
    },
    {
        name: "Screen Share",
        description: "Screen Share is an impressive application that replicates the functionality of Google Meet, providing users with a seamless platform for collaborative and interactive video conferencing. With its user-friendly interface and robust features, Screen Share offers a reliable solution for virtual meetings and screen sharing needs.",
        tags: [{
                name: "webrtc",
                color: "blue-text-gradient",
            },
            {
                name: "socket.io",
                color: "green-text-gradient",
            },
            {
                name: "ejs",
                color: "pink-text-gradient",
            },
            {
                name: "jquery",
                color: "green-text-gradient",
            },
        ],
        image: screenshare,
        source_code_link: "https://github.com/SanskarModi22/Screen-Share",
    },
    // {
    //     name: "Foodly",
    //     description: "Foodly is a comprehensive food delivery app that seamlessly connects users with restaurants, offering a wide range of features including catalogues, menu filtering, cart management, order tracking, and user profile management.",
    //     tags: [{
    //             name: "flutter",
    //             color: "blue-text-gradient",
    //         },
    //         {
    //             name: "firebase",
    //             color: "green-text-gradient",
    //         },
    //         {
    //             name: "provider",
    //             color: "pink-text-gradient",
    //         },
    //     ],
    //     image: foodly,
    //     source_code_link: "https://github.com/RGTechPro/foodly",
    // },
];

export { services, technologies, experiences, testimonials, projects };