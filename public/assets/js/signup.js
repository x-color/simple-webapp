const signupForm = new Vue({
    el: '#signup-form',
    data: {
        name: '',
        password: '',
    },
    methods: {
        signup() {
            const url = '/signup'
            const method = 'POST'
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8'
            }
            const body = JSON.stringify({
                name: this.name,
                password: this.password,
            })

            fetch(url, {method, headers, body}).then(response => {
                if(response.status === 400) {
                    alert('Name or Password are empty. Please retry')
                } else if(response.status === 409) {
                    alert('Name already exists. Please retry')
                    this.name = ''
                    this.password = ''
                } else if(response.status === 201) {
                    location.href = '/login'
                }
            })
        },
    },
})
