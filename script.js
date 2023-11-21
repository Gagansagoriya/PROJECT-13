
(function() {

    let taskArr  = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('task-counter');
    
    // console.log('working');
    
    async function fetchTodos(){
    // GET Request
        // fetch('https://jsonplaceholder.typicode.com/todos')
        // .then(function(response){
        //     console.log(response);
        //     return response.json();
        // }).then(function(data){
        //    taskArr = data.slice(0,200);
        //    renderList();
        // })
        // .catch(function(error){
        //     console.log('error',error);
        // })
    
        try{
            const  response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            taskArr = data.slice(0,200);
            renderList();
        }catch (error){
           console.log(error);
        }
    
    }
        
    
    
    
    
    function addTaskDom (task) {
        const li = document.createElement('li');
    
        li.innerHTML = `
        
                    <input type="checkbox"  id="${task.id}"  ${task.completed ? 'checked' : ''} class="custom-checkbox">
                    <label for="${task.id}" >${task.title}</label>
                    <img src="https://i.pinimg.com/736x/c5/b2/a0/c5b2a033561c2ec3ad803f37975e11ba.jpg" alt="bin-img" class="delete" data-id="${task.id}">
        
        `
        taskList.append(li);
    }
    
    function renderList (){
         
        taskList.innerHTML = '' ;
        for( let tasks = 0 ; tasks < taskArr.length; tasks++){
            addTaskDom(taskArr[tasks]);
        }
        tasksCounter.innerHTML = taskArr.length;
    }
    
    function markTaskAsComp(taskId){   
    
       const task = taskArr.filter(function (task) {
            return task.id === Number(taskId);
        });
        if(taskArr.length > 0){
            const currTask = task[0];
    
            currTask.completed  = !currTask.completed;
            renderList();
            showNotification("Task toggle successfully");
            return;
    
        }
    
        showNotification('Could  not toggle  the task');
    }
    
    function deleteTask(taskId){
    
        const newTask = taskArr.filter(function (task) {
            return task.id !== Number(taskId);
        });
    
        taskArr = newTask;
        renderList();
        showNotification('Task deleted successfully');
    }
    
    
    
    function addTask(task){
    
        if(task){
    
        // fetch('https://jsonplaceholder.typicode.com/todos' ,{
        //     method : 'POST',
        //     headers :{
        //         'Content-Type' :'application/json',
        //     },
        //     body :JSON.stringify(task),
        // })
        // .then(function(response){
        //     // console.log(response);
        //     return response.json();
        // }).then(function(data){
        //     console.log(data);
        //     taskArr.push(task);
        //     renderList();
        //     showNotification('Task done successfully');
        //     return;
        // //    taskArr = data.slice(0,200);
        // //    renderList();
        // })
        // .catch(function(error){
        //     console.log('error',error);
        // })
        
    
            taskArr.push(task);
            renderList();
            showNotification('Task done successfully');
            return;
        }
        showNotification('Task can not be added');
       
    }
    
    function showNotification(text){
        alert(text);
    }
    
    function handleInputKeypress(e) {
    
        if(e.key === 'Enter'){
            const text = e.target.value;
            // console.log(text);
    
            if(!text){
                showNotification('Task text can not be empty');
                return;
            }
    
            const task ={
                title: text,
                id : Date.now(),
                completed :false
            }
            e.target.value ='';
            addTask(task);
        }
    }
    function handClickEventListner(e){
        const target = e.target;
     
        console.log(target);
        if(target.className === 'delete'){
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        } else if(target.className === 'custom-checkbox'){
          const taskId = target.id;
          markTaskAsComp(taskId);
          return;
        }
    }
    function intializeApp(){
        fetchTodos();
        addTaskInput.addEventListener('keyup' , handleInputKeypress);
        document.addEventListener('click', handClickEventListner);
    }
    intializeApp();

})()

