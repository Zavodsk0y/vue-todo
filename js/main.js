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
                const newCard = { name: this.name, tasks: [] };
                this.cards.push(newCard);
                this.$parent.$children[1].firstColumnCards.push(newCard); // Добавляем в массив firstColumnCards второй колонки
                this.name = '';
                this.quantity += 1;
            }
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask)
            console.log(cardIndex)
            console.log(this.cards)
            // console.log(this.cards[cardIndex].tasks[1].name)
        },
        completeTask(cardIndex, taskIndex) {
            this.cards[cardIndex].tasks[taskIndex].completed = !this.cards[cardIndex].tasks[taskIndex].completed;

            // Проверяем, выполнено ли 50% задач
            if (this.isCardHalfCompleted(cardIndex)) {
                // Выполняем передвижение карточки во вторую колонку
                app.$children[1].moveCardToInProgress(cardIndex);
                this.cards.splice(cardIndex, 1); // Удаляем карточку из текущей колонки
            }
        },
        isCardHalfCompleted(cardIndex) {
            const tasks = this.cards[cardIndex].tasks;
            const completedTasks = tasks.filter(task => task.completed);
            return completedTasks.length / tasks.length >= 0.5;
        }
    },
    data() {
        return {
            name: '',
            cards: [],
            quantity: 0
        }
    }
})

Vue.component('second-column', {
    template: `
    <div class="column" id="important-column">
        <h2 class="t-a-c">В работе</h2>
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
        moveCardToInProgress(cardIndex) {
            if (this.quantity < 3) {
                this.cards.push(this.firstColumnCards[cardIndex]);
                this.firstColumnCards.splice(cardIndex, 1);
                this.quantity++;
            }
        }
    },
    data() {
        return {
            name: '',
            cards: [],
            quantity: 0,
            firstColumnCards: [],
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