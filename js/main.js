Vue.component('first-column', {
    template: `
    <div class="column" id="important-column">
        <h2 class="t-a-c">Важные</h2>
        <input v-model="name" type="text" placeholder="Название карточки">
        <button v-on:click="addCard(name)">+</button>
        <ul>
            <li v-for="(card, index) in cards">
            <p>{{ card }} <button v-on:click="addCard(name)">+</button></p>
            </li>
    </ul>
    </div>`,
    methods: {
        addCard(name) {
            if (this.quantity < 3) {
                this.cards.push(name)
                this.quantity += 1
            }
            console.log(this.quantity)
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
    props: ['cards'],
    template: `
    <div class="column" id="important-column">
        <h2 class="t-a-c">В процессе</h2>
        <button>+</button>
    </div>`
})

Vue.component('third-column', {
    props: ['cards'],
    template: `
    <div class="column" id="important-column">
        <h2 class="t-a-c">Готово</h2>
        <button>+</button>
    </div>`
})

let app = new Vue({
    el: "#todo-container",
})