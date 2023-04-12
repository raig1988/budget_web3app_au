<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url] -->
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/raig1988/budgetApp-nextJs">
    <img src='./public/images/logo.png' alt="Logo" width="120">
  </a>

<h3 align="center">Budget Web App</h3>

  <p align="center">
    An app made to track expenses and improve your financial situation.
    <br />
    <a href="https://github.com/raig1988/budgetApp-nextJs"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo (Pending)</a>
    ·
    <a href="https://github.com/raig1988/budgetApp-nextJs/issues">Report Bug</a>
    ·
    <a href="https://github.com/raig1988/budgetApp-nextJs/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#development-process">Development process</a>
      <ul>
        <li><a href="#conceptualization">Conceptualization</a></li>
        <li><a href="#front-end">Front End</a></li>
        <li><a href="#back-end">Back End</a></li>
        <li><a href="#testing">Testing</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usage</a></li> -->
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <!-- <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

I'm a big proponent of knowing your financial situation as a building block for your life goals. 
Thats why i have built this app whose goal is to allow you to track your expenses daily 
Then all the info is summarized by month and per year with useful graphs that portrays in graphics your current situation.

Tracking our expenses has been a huge financial blessing for my family and i certainly hope it will be for yours.

<!-- Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description` -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Javascript][Javascript]][Javascript-url]
* [![NodeJS][NodeJS]][NodeJS-url]
* [![HTML][HTML]][Html-url]
* [![CSS][CSS]][Css-url]
* [![Prisma][Prisma]][Prisma-url]
* [![Axios][Axios]][Axios-url]
* [![Bcrypt][Bcrypt]][Bcrypt-url]
* [![Chartjs][Chartjs]][Chartjs-url]
* [![Formik][Formik]][Formik-url]
* [![Nextauth][Nextauth]][Nextauth-url]
* [![React-table][React-table]][React-table-url]
* [![Yup][Yup]][Yup-url]
* [![Jest][Jest]][Jest-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/raig1988/budgetApp-nextJs.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the development server
   ```sh
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5. To run tests
    ```sh
    npm run test
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- DEV PROCESS -->
## Development process

### Conceptualization

This part was done using Figma, a tool used for user interface design. 

#### Colors, typography:

[![Colors Screen Shot][colors-screenshot]]()

#### Wireframe and prototyping:

[![Wireframe prototype Screen Shot][wire-proto-screenshot]]()

Link to Figma file: [Budget Web App](https://www.figma.com/file/LAmC7CiS8g4JQ9iAuSdh3J/Financial-Planner-App-NextJS?node-id=0%3A1&t=TWwPxmKf4YvNvtUC-1)


### Front End

This part of the process was basically done using React with Babel syntax applying HTML tags and CSS for styling.
For the creation and managing state of forms, Formik library became very helpful combined with Yup for client side validation. For the generation of tables, i used React-Table and for charts, ChartJS became really handy.

### Back End

For the back end process, i used NextJS as the framework of choice for API communication between the front and backend.
The '/app/' directory is really helpful to from the package, be able to create nested routes and also include components directly on the pages.
Also, being able to include Server Side rendering directly on each page making API calls to the database (Postgresql on Supabase used) became really helpful.

To communicate my database with the back end of my project, i used Prisma as an ORM. And, as a server provider for the database i used supabase where my database was created with Postgresql. Prisma became really helpful creating the schema of tables and managing the relations between them. Also, with Prisma client, the API calls to POST, PUT, DELETE and GET became a breeze. All the API calls where made using Axios which establish a really simple way of creating calls. To encrypt passwords of users inside the database, Bcrypt library became really handy also.

### Testing

This was made using Jest framework. The main mantra was creating tests focused on the final user and me as a developer.

Current coverage percentage as of April 2023 is 71% of statements.

[![Coverage Screen Shot][coverage-screenshot]]()


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- ROADMAP
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTACT -->
## Contact

Rodrigo Iglesias - [@123Aprendo](https://twitter.com/123Aprendo) - rodri.iglesiasg@gmail.com

Project Link: [https://github.com/raig1988/budgetApp-nextJs](https://github.com/raig1988/budgetApp-nextJs)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/rodrigo-iglesias-giraldo-32281271/
[product-screenshot]: ./public/images/screenshot_home.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Javascript]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[Javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[HTML]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[Html-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[CSS]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[Css-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[NodeJS]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/about
[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Axios]: https://img.shields.io/badge/-AXIOS-grey?style=for-the-badge
[Axios-url]: https://axios-http.com/docs/intro
[Bcrypt]: https://img.shields.io/badge/-BCRYPT-grey?style=for-the-badge
[Bcrypt-url]: https://www.npmjs.com/package/bcrypt
[Chartjs]: https://img.shields.io/badge/-ChartJS-grey?style=for-the-badge
[Chartjs-url]: https://www.chartjs.org/
[Formik]: https://img.shields.io/badge/-Formik-grey?style=for-the-badge
[Formik-url]: https://formik.org/
[Nextauth]: https://img.shields.io/badge/-NextAuth-grey?style=for-the-badge
[Nextauth-url]: https://next-auth.js.org/
[React-table]: https://img.shields.io/badge/-React_Table-grey?style=for-the-badge
[React-table-url]: https://react-table-v7.tanstack.com/
[Yup]: https://img.shields.io/badge/-Yup-grey?style=for-the-badge
[Yup-url]: https://github.com/jquense/yup
[Jest]: https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white
[Jest-url]: https://jestjs.io/
[coverage-screenshot]: ./public/images/coverage_testing.png
[colors-screenshot]: ./public/images/figma_colors.png
[wire-proto-screenshot]: ./public/images/wire_proto.png