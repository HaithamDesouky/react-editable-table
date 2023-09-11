<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
 <img src="images/editable.png" alt="Logo" width="80" height="80">

  <h3 align="center">React Editable Table</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/HaithamDesouky/react-editable-table"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/HaithamDesouky/react-editable-table">View Demo</a>
    ·
    <a href="https://github.com/HaithamDesouky/react-editable-table/issues">Report Bug</a>
    ·
    <a href="https://github.com/HaithamDesouky/react-editable-table/issues">Request Feature</a>
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

 <img src="images/snapshot.png" alt="snapshot" width="900" height="600">

This is an editable table built with React. Users can edit the content of a table, add rows, columns, delete content and headers for both rows and columns.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Once installed the editable table is ready to use out of the box.

### To get the latest value of the table

The passing the onChange callback to the Editable Table allows you to access the latest value of the table.

```
const onChange = (tableValue) => {
console.log({ tableValue });
};

<EditableTable onChange={onChange}/>
```

Once called, the parameter tableValue will give you the latest table values

### Custom translations

You can pass custom translations for the Editable table buttons by providing the customTranslations prop with key value translations as such:

Note: If no translations are passed, default values will be used instead.

```

const customTranslations = {
    addRow: "Add row translation",
    deleteRow: "Delete Row",
    addColumn: "Add a nice column",
    deleteColumn: "Get rid of this column",
    openFullScreen: "Open table in full screen",
    options: "Options",
    deleteTable: "Delete table",
    columnHeader: "Column Header",
    rowHeader: "Row Header",
    openFullScreen: "full screen plz",
  };

<EditableTable translations={customTranslations} />
```

### Customize color of the table

Passing the clientPalette prop allows you to change the theme/colors of the editable table. For best result, make sure you add values for all properties as shown below.

```

const palette = {
    primary: { main: "#4E3D42", light: "#6D6466", contrastText: "#E3DBDB" },
    secondary: { main: "#6D6466", light: "#6D6466" },
  };


<EditableTable clientPalette={palette}/>
```

### Loading previous values

If you pass previously filled in data into the initialData prop, the table will be initialised with said data.

```

const initialData = {
    tableAnswerContent: [
      ["", "feddsf", "", "dsfs"],
      ["sssss", "", "fdsfds", "fdsf"],
      ["", "", "", ""],
    ],
    hasColumnHeader: false,
    hasRowHeader: true,
  };

    <EditableTable initialData={initialData}/>
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Allow export table data as Excel or CSV file
- [ ] Allow splitting and merging cells
- [ ] Allow customization of colors by the user
      Many more things...

See the [open issues](https://github.com/HaithamDesouky/react-editable-table/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Your Name - [Haitham Desouky](https://www.linkedin.com/in/haitham-desouky-b862b545/) - haithamadesouky@gmail.com

Project Link: [https://github.com/HaithamDesouky/react-editable-table](https://github.com/HaithamDesouky/react-editable-table)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/HaithamDesouky/react-editable-table/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/HaithamDesouky/react-editable-table/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/HaithamDesouky/react-editable-table/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/HaithamDesouky/react-editable-table/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/HaithamDesouky/react-editable-table/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/haitham-desouky-b862b545/
[product-screenshot]: images/snapshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
