/*var React = require('react');*/
var ReactDOM = require('react-dom');

import React, {Component} from 'react'
//import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import {format_date} from 'moment'

import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

import css from './main.css';


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', details: '', is_done: '', set_date: ''
        };
    }

    loadTask(task_id) {
        fetch(`/api/task/${task_id}/`)
            .then(response => response.json())
            .then(data => {
                this.setState(data)
            });
    }

    componentDidMount() {
        this.loadTask(this.props.match.params['task_id']);
    }

    render() {
        const {name, details, is_done, set_date} = this.state;
        return (
            <div className="task">
                <h4 className="task__name">{name}</h4>
                <p className="task__details">{details}</p>
                <p className="task__set_date">Started on {set_date}</p>
                <p>{is_done ? ('Already done') : ('Not done yet')} </p>
                <Link className="task__button" to="/">Back</Link>
            </div>
        );
    }
}


class List extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {tasks: props.tasks, is_done: props.is_done};
    }


    componentWillReceiveProps(nextProps) {
        this.setState({tasks: nextProps.tasks})
    }

    render() {
        return (
            <div>
                {this.state.tasks ? (
                    <ul className="content-list">
                        {this.state.tasks.map((task, i) => (
                            (task.is_done == this.state.is_done ?
                                    (<li className="content-list__item" key={i}>
                                        <Link to={`/${task.id}`}>{task.name}</Link>
                                    </li>)
                                    :
                                    ('')
                            )
                        ))}
                    </ul>
                ) : (<p>No tasks.</p>)}

            </div>
        );
    }
}

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '', descr: '', formFields: [], tasks: []};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        //alert('An essay was submitted: ' + this.state.name + '_' + this.state.descr);
        let formFields = {name: this.state.name, details: this.state.descr};
        //console.log(formFields);
        axios({
            method: 'post',
            url: '/api/task/',
            data: formFields,
            headers: {
                responseType: 'json',
                //"X-CSRFToken": csrfToken,
            }
        })
            .then(function (response) {
                console.log(response);
                //Perform action based on response
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });
        event.preventDefault();
        this.setState({name: '', descr: '', formFields: []});
        console.log('props');
        console.log(this.props);
    }

    async loadTasks() {
        this.setState({
            tasks: await fetch("/api/task/").then(response => response.json())
        });
        console.log(this.state);
    }

    componentDidMount() {
        this.loadTasks();
    }

    handleChange(event) {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        });
        /*let formFields = this.state.formFields;
        formFields[event.target.name] = event.target.value;
        this.setState({
            formFields
        });*/
    }

    render() {
        return (
            <div ref="myRef">
                <h1>Best TODO list ever</h1>

                <div className="row">
                    <div className="column">
                        <p>Add new task</p>

                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Name:
                                <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                            </label><br/>
                            <label>
                                Description:
                                <input type="text" name="descr" value={this.state.descr} onChange={this.handleChange}/>
                            </label><br/>
                            <input type="submit" value="Create task"/>
                        </form>
                    </div>

                    <div className="column">
                        <p>Active tasks:</p>
                        <List is_done={false} tasks={this.state.tasks}/>
                    </div>

                    <div className="column">
                        <p>Completed tasks:</p>
                        <List is_done={true} tasks={this.state.tasks}/>
                    </div>

                </div>
            </div>
        );
    }
}


/*<div>
    <input type="text" value={this.state.data}
           onChange={this.updateState}/>
    <h4>{this.state.data}</h4>
</div>*/

const Main = () => (
    <BrowserRouter>
        <main>
            <Switch>
                <Route exact path='/' component={MainPage}/>
                <Route path='/:task_id' component={Task}/>
            </Switch>
        </main>
    </BrowserRouter>
)


ReactDOM.render(<Main/>, document.getElementById('app'));
