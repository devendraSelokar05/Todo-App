# Todo App

## 📚 Project Title & Description

### **Todo App**
This Todo App is a simple and efficient task management application built using React and Bootstrap. It allows users to add, edit, and delete tasks, helping them keep track of their daily activities. The app leverages Redux for state management, ensuring a seamless and consistent user experience.

## ✨ Features

- ✅ **Add Task**: Users can add new tasks to their todo list.
- ✏️ **Edit Task**: Users can edit existing tasks.
- ❌ **Delete Task**: Users can remove tasks from their todo list.
- 🔒 **Mark as Completed**: Users can mark tasks as completed, visually differentiating them from incomplete tasks.

## 💡 Technologies Used

- ♻️ **React**: JavaScript library for building user interfaces.
- 🌐 **Bootstrap**: CSS framework for responsive and modern web design.
- 🛠 **Redux**: State management library for managing global state in a predictable way.

## 🔧 Installation & Setup

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/TodoApp.git
   cd TodoApp
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the app:**
   ```bash
   npm start
   ```

The app should now be running on [http://localhost:3000](http://localhost:5173).

## 📁 Folder Structure

```
TodoApp/
├── 📂 public/
│   ├── 📄 index.html
│   └── ...
├── 📂 src/
│   ├── 📂 components/
│   │   ├── 📄 AddTask.js
│   │   ├── 📄 TaskItem.js
│   │   ├── 📄 TaskList.js
│   │   └── ...
│   ├── 📂 redux/
│   │   ├── 📂 actions/
│   │   ├── 📂 reducers/
│   │   ├── 📄 store.js
│   ├── 📄 App.js
│   ├── 📄 index.js
│   └── ...
├── 📄 .gitignore
├── 📄 package.json
├── 📄 README.md
└── ...
```

## 🔬 Components Overview

- **`AddTask.js`**: Handles the input and submission of new tasks.
- **`TaskItem.js`**: Represents a single task item, including its display and actions (edit, delete, mark as completed).
- **`TaskList.js`**: Displays the list of tasks, utilizing the TaskItem component for each task.

Each component is designed to encapsulate specific functionality, making the app modular and easier to maintain.

## 🎨 State Management with Redux

Redux is used to manage the global state of the application. The state includes the list of tasks and their statuses. Actions are dispatched to modify the state, and reducers handle these actions to update the state accordingly. This ensures a predictable state management flow throughout the app.

---

**Made by Devendra Selokar**