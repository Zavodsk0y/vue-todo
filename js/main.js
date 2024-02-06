Vue.component('first-column', {
    template: `
    <div class="column" id="important-column">
        <h2 class="t-a-c">Бэклог</h2>
        <input v-model="name" type="text" placeholder="Название карточки">
        <button v-on:click="addCard(name)">+</button>
        <ul>
            <li v-for="(card, index) in cards">
            <p>{{ card.name }}</p>
            <todo-list :tasks="card.tasks" @add-task="addTask(index, $event)" @complete-task="completeTask(index, $event)"></todo-list>
            </li>
    </ul>
    </div>`,
    methods: {
        addCard() {
            if (this.quantity < 3) {
                this.cards.push({name: this.name, tasks: []})
                this.name = ''
                this.quantity += 1
            }
        },
        addTask(cardIndex, newTask) {
            let i = 0
            this.cards[cardIndex].tasks.push(newTask)
            console.log(Object.values(this.cards[cardIndex].tasks).length)
            console.log(Object.values(this.cards[cardIndex].tasks.contains()).length)
            let tasksCount = Object.values(this.cards[cardIndex].tasks).length

            // console.log(this.cards[cardIndex].tasks[1].name)
        },
        completeTask(cardIndex, taskIndex) {
            console.log(this.cards[cardIndex].tasks[taskIndex])
            this.cards[cardIndex].tasks[taskIndex].completed = !this.cards[cardIndex].tasks[taskIndex].completed
        }
    },
    data() {
        return {
            name: '',
            cards: [],
            quantity: 0
        }
    },
    computed: {
        percentage(cardIndex, taskIndex) {
            return (this.cards[cardIndex].tasks.length / this.cards[cardIndex].tasks.completed.length) * 100
        }
    }
})

Vue.component('second-column', {
    props: ['cards'],
    template: `
    <div class="column" id="important-column">
        <h2 class="t-a-c">В работе</h2>
        <ul>
            <li v-for="(card, index) in cards">
            <p>{{ card.name }}</p>
            <todo-list :tasks="card.tasks" @add-task="addTask(index, $event)" @complete-task="completeTask(index, $event)"></todo-list>
            </li>
    </ul>
        
    </div>`,
    methods: {

    },
    data() {
        return {
            name: '',
            quantity: 0
        }
    }
})

Vue.component('third-column', {
    template: `
    <div class="column" id="important-column">
        <h2 class="t-a-c">Сдан</h2>
        <input v-model="name" type="text" placeholder="Название карточки">
        <button v-on:click="addCard(name)">+</button>
        <ul>
            <li v-for="(card, index) in cards">
            <p>{{ card.name }}</p>
            <todo-list :tasks="card.tasks" @add-task="addTask(index, $event)"></todo-list>
            </li>
    </ul>
    </div>`,
    methods: {
        addCard(name) {
            if (this.quantity < 3) {
                this.cards.push({name: this.name, tasks: []})
                this.name = ''
                this.quantity += 1
            }
            console.log(this.quantity)
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask)
        },
    },
    data() {
        return {
            name: '',
            cards: [],
            quantity: 0
        }
    }
})

Vue.component('todo-list', {
    props: ['tasks'],
    template: `
    <ul>
        <li v-for="(task, index) in tasks" :key="index">
            <p :class="{'completed' : task.completed }" @click="completeTask(index)">{{task.name}}</p>
        </li>
        <input v-model="newTask" type="text" placeholder="Новая задача">
        <button @click="addTask">Добавить задачу</button>
    </ul>
    `,
    data() {
        return {
            newTask: ''
        }
    },
    methods: {
        addTask() {
            this.$emit('add-task', {name: this.newTask, completed: false})
            this.newTask = ''
        },
        completeTask(index) {
            this.$emit('complete-task', index)
        }
    }
})

let app = new Vue({
    el: "#todo-container",
})