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
                this.$parent.$children[1].firstColumnCards.push(newCard);
                this.firstColumnCards.push(newCard)
                this.saveToLocalStorage()
                this.name = '';
                this.quantity += 1;
            }
        },
        addTask(cardIndex, newTask) {
            this.cards[cardIndex].tasks.push(newTask)
            this.saveToLocalStorage()
        },
        completeTask(cardIndex, taskIndex) {
            this.cards[cardIndex].tasks[taskIndex].completed = !this.cards[cardIndex].tasks[taskIndex].completed;

            if (this.isCardHalfCompleted(cardIndex)) {
                app.$children[1].moveCardToInProgress(cardIndex);
                this.cards.splice(cardIndex, 1);
                this.quantity--
            }
            this.saveToLocalStorage()
        },
        isCardHalfCompleted(cardIndex) {
            const tasks = this.cards[cardIndex].tasks;
            const completedTasks = tasks.filter(task => task.completed);
            return completedTasks.length / tasks.length >= 0.5;
        },
        loadFromLocalStorage() {
            let savedData = localStorage.getItem('cards')
            if (savedData) {
                try {
                    this.cards = JSON.parse(savedData)
                    console.log('Success')
                    console.log(this.cards)
                } catch (error) {
                    console.error('Error parsing saved data:', error)
                }
            }
        },
        saveToLocalStorage() {
            let jsonData = JSON.stringify(this.cards, this.firstColumnCards)
            localStorage.setItem('cards', jsonData)
        },
        removeFromLocalStorage() {
            localStorage.clear()
            location.reload()
        }
    },
    mounted() {
        this.loadFromLocalStorage()
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
        <ul>
            <li v-for="(card, index) in cards">
            <p>{{ card.name }}</p>
            <todo-list :tasks="card.tasks" @add-task="addTask(index, $event)" @complete-task="completeTask(index, $event)"></todo-list>
            </li>
    </ul>
    </div>`,
    methods: {
        moveCardToInProgress(cardIndex) {
            if (this.quantity < 5) {
                this.cards.push(this.firstColumnCards[cardIndex]);
                console.log(this.firstColumnCards[cardIndex])
                console.log(this.firstColumnCards)
                console.log(this.cards)
                this.quantity++;
                this.saveToLocalStorage()
            }
        },
        completeTask(cardIndex, taskIndex) {
            this.cards[cardIndex].tasks[taskIndex].completed = !this.cards[cardIndex].tasks[taskIndex].completed;

            if (this.isCardCompleted(cardIndex)) {
                this.moveCardToDone(cardIndex)
            }
        },
        isCardCompleted(cardIndex) {
            const tasks = this.cards[cardIndex].tasks
            return tasks.every(task => task.completed)
        },
        moveCardToDone(cardIndex) {
            this.$parent.$children[2].cards.push(this.cards[cardIndex])
            this.cards.splice(cardIndex, 1)
            this.saveToLocalStorage()
        },
        saveToLocalStorage() {
            let jsonData = JSON.stringify(this.cards)
            localStorage.setItem('cards', jsonData)
        },
    },
    data() {
        return {
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
        <ul>
            <li v-for="(card, index) in cards">
            <p>{{ card.name }}</p>
            <todo-list :tasks="card.tasks"></todo-list>
            </li>
    </ul>
    </div>`,
    methods: {

    },
    data() {
        return {
            name: '',
            cards: [],
            quantity: 0,
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