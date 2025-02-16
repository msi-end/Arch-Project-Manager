
<h1 align="center" style="color:#ce00ff"> ArchProject </h1>

Architectural Project Management System
=======================================

Welcome to the Architectural Project Management System (APMS) repository! This system is designed to streamline and enhance the management of architectural projects, providing architects and project managers with a comprehensive toolset to efficiently oversee every aspect of their projects.

Features
--------

*   **Project Dashboard:** Get an overview of all ongoing projects, including key metrics and milestones.
*   **Task Management:** Assign tasks to team members, set deadlines, and track progress in real-time.
*   **Document Management:** Centralize project documents, blueprints, and specifications for easy access and collaboration.
*   **Budget Tracking:** Monitor project expenses, track budgets, and generate financial reports.
*   **Communication Tools:** Facilitate communication among team members, clients, and stakeholders with integrated messaging and notification features.
*   **Scheduling:** Plan project timelines, schedule meetings, and coordinate resources effectively.
*   **Collaboration:** Encourage collaboration through shared project spaces, allowing team members to work together seamlessly.
*   **Risk Management:** Identify potential risks, implement mitigation strategies, and monitor risk factors throughout the project lifecycle.

Getting Started
---------------

To get started with APMS, follow these steps:

1.  **Clone the Repository:** Clone this repository to your local machine using `git clone https://github.com/msi-end/Arch-Project-Manager.git`.
    
2.  **Install Dependencies:** Navigate to the project directory and install dependencies using `npm install` or `yarn install`.
    
3.  **Configure Environment:** Set up your environment variables and configuration settings in:  `.env.<files>`.
    
4.  **Run the Application:** Start the application by running `npm start` or `yarn start`, then navigate to `http://localhost:3000` in your web browser.
    
5.  **Explore and Customize:** Explore the features of APMS and customize them according to your project management needs.
    

Contributing
------------

Contributions to APMS are welcome! If you have ideas for new features, bug fixes, or improvements, feel free to open an issue or submit a pull request. Please follow our [contribution guidelines](CONTRIBUTING.md) when contributing to this project.

License
-------

APMS is licensed under the MIT License, which means you are free to use, modify, and distribute the software for any purpose. See the LICENSE file for more details.

Support
-------

For support or inquiries, please contact our team at support@apms.com. We're here to help with any questions or concerns you may have.

Thank you for choosing APMS for your architectural project management needs! We're excited to work with you on your projects and help you achieve success.    


body.dark{
    --black: hsl(0, 0%, 100%);
    --black-light: hsla(260, 100%, 90%, 0.4);
    --black-light-2: hsla(260, 100%, 90%, 0.8);
    --white: rgb(16, 20, 24);

    --bg-color: hsl(260, 45%, 25%);
    --bg-hover: hsla(260, 19%, 15%, 0.4);
    --bg-2: hsl(255, 54%, 15%);
    --bg-3: hsl(255, 61%, 15%);

    --primary-color: hsl(260, 50%, 75%);
    --primary-outline: hsla(260, 54%, 45%, 0.9);
    --primary-light-color: hsl(261, 54%, 35%);
    --primary-bg: hsl(260, 54%, 45%);
    --primary-bgr: hsl(260, 54%, 25%);

    --secondary-color: hsl(208, 100%, 50%);
    --sec-outline: hsla(208, 79%, 51%, 0.2);
    --sec-light-color: hsl(208, 79%, 93%);
    --sec-bg: hsl(208, 79%, 60%);
    --sec-bgrd: hsl(208, 79%, 85%);
    --sec-bgr: hsl(208, 79%, 88%);

    --tertiary-color: hsl(0, 100%, 45%);
    --ter-outline: hsla(0, 100%, 45%, 0.1);
    --ter-dark-color: hsl(0, 100%, 50%);
    --ter-light-color: hsl(0, 100%, 60%);

    --green: hsl(160, 100%, 34%);
    --green-outline: hsla(160, 100%, 34%, 0.2);
    --green-light: hsl(154, 61%, 90%);
    --green-bg: hsl(160, 100%, 30%);
    --green-bgr: hsl(160, 100%, 90%);
    --green-bgrd: hsl(160, 100%, 88%);

    --hover-bg: hsl(208, 79%, 97%);

    

    --grey: rgb(112, 116, 117);
    --light-grey: hsl(203, 20%, 70%);
    --very-light-grey: hsl(200, 20%, 95%);
    
}
body.dark .btn{
    border: 1px solid var(--bg-color);
    background: var(--white);
}
body.dark :is(.btn:hover .svg, .search .open, .main .main-data svg, 
.search .cls svg ){
    fill: var(--black);
}
body.dark :is(.logo h3, .search input, .account-settings,
nav h3, .nav-lists ul span.namue, .nav-lists ul a, nav .nav-lists svg, .main .main-data p, .info-content .accordion-content p, #cat-name, .sub-tasks ul li, p.uppercase, h4, h3, .field label, .field input[type="text"], .field input[type="date"],.field textarea, .field select, .type span, p, .adata .architecture .sadv :is(p.uppercase, span.maka),.main-dropdown .drop-btn button:nth-child(2),.main-dropdown .finance-dropdown :is(input, select), .form-header button:nth-child(2) ) {
    color: var(--black);
}

body.dark :is(.profileIcon:hover) {
    background: var(--black);
}
body.dark .account-settings:hover{
    color: var(--primary-color);
}

body.dark aside{
    background: var(--white);
}

body.dark .info-content .accordion-content .stat.red, :is(.user-status, .profile-status) p.red {
    /* color: var(--ter-dark-color) !important; */
}
body.dark .info-content .accordion-content .stat.green,:is(.user-status, .profile-status) p.green {
    color: var(--green) !important;
}

body.dark form .field input[type="text"]{
    color: var(--black);
}
body.dark .task-emp-status .main-btns select.blue{
    /* background: var(--sec-bg); */
}
body.dark .task-emp-status .main-btns select.red,
body.dark .info-content .accordion-content .edit-btn{
    color: var(--white) !important;
}
/* body.dark */
/* body.dark */
/* body.dark */
/* body.dark */
