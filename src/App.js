import React, { Component } from 'react';
import TodoForm from './components/TodoComponents/TodoForm';
import TodoList from './components/TodoComponents/TodoList';
import './components/TodoComponents/Todo.css';

const tasks = [];

class App extends Component {
  // you will need a place to store your state in this component.
  constructor() {
    super();
    this.state = {
      tasks: tasks,
      input: '',
      query: []
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

  toggleCompleted = completedId => {
    const tasks = this.state.tasks.map(task =>{
      if (task.id === completedId){
        task.completed = !task.completed
      }
      return task
    });
    this.setState({tasks, task:''})
  };

  removeCompleted = event => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        tasks: prevState.tasks.filter(task => {
          return !task.completed;
        })
      };
    })
  };

  addLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let task = localStorage.getItem(key);
        try{
          task = JSON.parse(task);
          this.setState({[key]: task})
        }
        catch(event) {
          this.setState({[key]:task})
        };
      };
    };
  };

  saveLocalStorage() {
    for(let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]))
    };
  };

  componentDidMount() {
    this.setState({
      query: this.props.tasks
    })
    this.addLocalStorage();
    window.addEventListener('beforeunload', this.saveLocalStorage.bind(this))
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.tasks
    });
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveLocalStorage.bind(this))
  };

  // handleQuery(event) {
  //   let currentTasks = [];
  //   let queryTasks = [];

  //   if (event.target.value !== '') {
  //     currentTasks = tasks;
  //     queryTasks = currentTasks.filter(task => {
  //       const lower = task.toLowerCase();
  //       const queried = event.target.value.toLowerCase();
  //       return lower.includes(queried);
  //     });
  //   } else {
  //     queryTasks = tasks;
  //   }
  //   this.setState({
  //     query: queryTasks 
  //   });
  // }


  render() {
    return (
      <div className='app'>
        <h2 className='title'>Welcome to your Todo App!</h2>
        <div className="outline-offset">
          <TodoForm
            input={this.state.input}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            removeCompleted={this.removeCompleted}
            handleQuery={this.handleQuery}
          />
          <TodoList toggleCompleted={this.toggleCompleted} tasks={this.state.tasks}/>
        </div>
      </div>
    );
  }
};

export default App;
