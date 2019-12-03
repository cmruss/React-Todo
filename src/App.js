import React, { Component } from 'react';
import TodoForm from './components/TodoComponents/TodoForm';
import TodoList from './components/TodoComponents/TodoList';


const tasks = [
  {
    task: 'Organize Garage',
    id: 1528817077286,
    completed: false
  },
  {
    task: 'Bake Cookies',
    id: 1528817084358,
    completed: false
  }
];

class App extends Component {
  // you will need a place to store your state in this component.
  constructor() {
    super();
    this.state = {
      tasks: tasks,
      input: ''
    };
  }
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  addTask = newTaskName => {
    const newTask = {
      task: newTaskName,
      id: Date.now(),
      completed: false
    };
    this.setState({
      tasks: [...this.state.tasks, newTask]
    });
  };

  handleChange = event => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.addTask(this.state.input);
    this.setState({ input: '' });
    console.log(tasks)
  };

  toggleCompleted = taskId => {
    const tasks = this.state.tasks.map(task =>{
      if (task.id === taskId){
        task.completed = !task.completed
      }
      return task
    });
    this.setState({tasks, task:''})
  }

  removeCompleted = event => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        tasks: prevState.tasks.filter(task => {
          return !task.completed;
        })
      }
    })
  }

  render() {
    return (
      <div>
        <h2>Welcome to your Todo App!</h2>
        <TodoForm
          input={this.state.input}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          removeCompleted={this.removeCompleted}
        />
        <TodoList toggleCompleted={this.toggleCompleted} tasks={this.state.tasks}/>
      </div>
    );
  }
};

export default App;
