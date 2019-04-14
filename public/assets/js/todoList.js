const todoList = new Vue({
    el: '#todo-list',
    data: {
        user: '',
        newTodo: '',
        todos: [],
        completedTodos: []
    },
    methods: {
        getTodos() {
            const url = 'api/todos'
            const headers = {'Authorization': `Bearer ${this.getToken()}`}

            fetch(url, {headers}).then(response => {
                if(response.ok) {
                    return response.json()
                }
                return []
            }).then(json => {
                this.todos = json
            })
        },
        postTodo() {
            const url = 'api/todos'
            const method = 'POST'
            const headers = {
                'Authorization': `Bearer ${this.getToken()}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
            const body = JSON.stringify({name: this.newTodo})

            fetch(url, {method, headers, body}).then(response => {
                if(response.ok) {
                    return response.json()
                }
            }).then(json => {
                if(typeof json === 'undefined') {
                    return
                }
                this.todos.push(json)
                this.newTodo = ''
            })
        },
        deleteTodo(id) {
            const url = `api/todos/${id}`
            const method = 'DELETE'
            const headers = {'Authorization': `Bearer ${this.getToken()}`}

            fetch(url, {method, headers}).then(response => {
                if(response.ok) {
                    this.todos = this.todos.filter(todo => todo.id !== id)
                }
            })
        },
        checkTodo(id) {
            const url = `api/todos/${id}/completed`
            const method = 'PUT'
            const headers = {'Authorization': `Bearer ${this.getToken()}`}

            fetch(url, {method, headers})
        },
        getToken() {
            return localStorage.getItem('token')
        },
        logout() {
            localStorage.removeItem('token')
            location.href = '/'
        },
    },
    created() {
        const date = new Date()
        const claims = JSON.parse(atob(this.getToken().split('.')[1]))
        this.user = claims.name
        if(claims.exp < Math.floor(date.getTime() / 1000)) {
            this.logout()
        } else {
            this.getTodos()
        }
    },
})
