# HARRY POTTER STUDENTS APP

### See the App!
**[Deploy Link](https://harry-potter-react-app.netlify.app/)**

### App Logo
<img src="./src/assets/images/hogwarts-crest.png" alt="Hogwarts Crest" width="150" />


---

## Description
A React application that allows users to explore, create, edit, and manage Hogwarts students, featuring house filters, a favorites system, and themed pages inspired by the Wizarding World.

**This is an academic project developed for learning and practice purposes.**

---

## User Stories

### General
- **404** – As a user, I want to see a themed 404 page when I visit a non‑existent route so that I know something went wrong.
- **Homepage** – As a user, I want to access the homepage so that I can browse all Hogwarts students.
- **Navigation** – As a user, I want to navigate easily through the app using a Hogwarts‑style navbar.

### Students
- **Students list** – As a user, I want to see all students so that I can explore their profiles.
- **Search** – As a user, I want to search students by name or house so that I can find them quickly.
- **Pagination** – As a user, I want to browse students page by page so that the list is easy to navigate.
- **Student details** – As a user, I want to see detailed information about a student so that I can learn more about them.
- **Add student** – As a user, I want to add a new student so that I can expand the Hogwarts directory.
- **Edit student** – As a user, I want to edit a student so that I can update their information.
- **Delete student** – As a user, I want to delete a student so that I can remove them from the directory.

### Favorites
- **Add to favorites** – As a user, I want to mark a student as a favorite so that I can access them quickly.
- **Remove from favorites** – As a user, I want to unmark a student so that I can manage my list.
- **Favorites page** – As a user, I want to see all my favorite students in one place.

### Houses
- **Houses page** – As a user, I want to explore Hogwarts houses so that I can learn about each one.
- **Filter by house** – As a user, I want to click a house and see only the students belonging to it.
- **House description** – As a user, I want to read a description of each house when selected.

---

## Backlog Functionalities
- Add magical animations (spells, sparkles, transitions).
- Add a house‑points system.
- Add advanced filtering by subjects or grades.
- Add a dark mode inspired by the Forbidden Forest.
- Persist favorites using `localStorage`.
- Add a skill‑based search filter.
- Add a school‑year selector (1st–7th year).
- Add authentication to personalize favorites.

---

## Technologies Used
- **React** (Vite)
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3** (custom Hogwarts theme)
- **React Router DOM**
- **Axios**
- **JSON Server / external JSON file as database**
- **Node.js** (development environment)
- **Git & GitHub**

---

## Routes (Front-End)

### Main Routes
| Method | Route | Description |
|--------|--------|-------------|
| GET | `/` | Renders the homepage with the students list |
| GET | `/favorites` | Displays the list of favorite students |
| GET | `/houses` | Displays the Hogwarts houses page |
| GET | `/students/:studentId` | Shows details of a specific student |
| GET | `/students/:studentId/edit` | Shows the edit form for a student |
| GET | `/students/add` | Shows the form to add a new student |
| GET | `*` | Renders the 404 page |

---

## Models (Database Structure)

### Student model
```js
{
  id: Number,
  name: String,
  age: Number,
  sex: String,
  house: String,
  personalSkills: [String],
  academicGrades: {
    Charms: String,
    Potions: String,
    "Defense Against the Dark Arts": String,
    Transfiguration: String
  },
  comments: String,
  image: String
}
```

---

## Links

### Collaborators
- **[Pablo Queiroz](https://github.com/pablovqueiroz)** – Developer
- **[Andrés González](https://github.com/andresgonzalezperez)** – Developer

### Project
- **[Repository Link](https://github.com/andresgonzalezperez/harry-potter-react-app)**
- **[Database repository link](https://github.com/andresgonzalezperez/json-server-backend)**
- **[Deploy Link](https://harry-potter-react-app.netlify.app/)**

### Slides

- **[Slides Link](https://docs.google.com/presentation/d/1Q152KJEBJFLgt8mSBIRlM28W10GCHa_aWYfqEaRZ1R0/edit?usp=sharing)**
