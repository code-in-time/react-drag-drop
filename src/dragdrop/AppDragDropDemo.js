import React, {Component} from 'react';
import css from './AppDragDropDemo.module.css';

class AppDragDrop extends Component {

    state = {
        tasks: [
            {
                name: "Learn Angular",
                category: "wip",
                bgcolor: "yellow"
            }, {
                name: "React",
                category: "wip",
                bgcolor: "pink"
            }, {
                name: "Vue",
                category: "complete",
                bgcolor: "skyblue"
            }
        ]
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {       
        let id = ev.dataTransfer.getData("id");
        let tasks = this.state.tasks.filter((task) => {
            if (task.name == id) {
                     task.category = cat;           
            }              
             return task;       
         });        
         this.setState({           
            ...this.state,           
            tasks       
         });    
      }

    render() {
        let tasks = {
            wip: [],
            complete: []
        }
        this
            .state
            .tasks
            .forEach((t) => {
                tasks[t.category].push(
                    <div
                        key={t.name}
                        onDragStart={(e) => this.onDragStart(e, t.name)}
                        draggable
                        className="draggable"
                        style={{
                        backgroundColor: t.bgcolor
                    }}>
                        {t.name}
                    </div>
                );
            });

            console.log(tasks);

        return (
            <div className={`${css.containerdrag} container-drag`}>
                {/* <h2 className="header">DRAG & DROP DEMO</h2> */}
                <div
                    className={css.wip}
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => {
                    this.onDrop(e, "wip")
                }}>
                    <span className="task-header">WIP</span>
                    {tasks.wip}
                </div>
                <div className={css.spacer}>
                    spacer
                </div>
                <div
                    className={`${css.droppable} droppable`}
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, "complete")}>
                    <span className="task-header">COMPLETED</span>
                    {tasks.complete}
                </div>
            </div>
        )
    }
}

export default AppDragDrop;
