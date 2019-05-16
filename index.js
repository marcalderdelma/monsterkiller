document.addEventListener('DOMContentLoaded', () => {
    // Vue Instance 
    new Vue({
        el:'#app',
        data: {
            running: false,
            P_life: 100,
            M_life: 100,
            logs: [],
        },
        methods: {
            // init the game
            startGame() {
                this.running = true;
                this.P_life = 100;
                this.M_life = 100;
                this.logs = [];
            },
            // give up in the game
            desist() {
                this.running = false;                
            },
            // the attack dynamic
            attack(special) {
                // first the player attack the monster
                this.hit('M_life',special, 5, 10, "Player", "Monster", 'player');
                // then, the the monster reply, of course, if he hasn't been dead yet
                if(this.M_life > 0)
                    this.hit('P_life',false, 7, 12, "Monster", "Player", 'monster');
            },
            // healing: recover the player form damages
            heal(min, max) {
                let cure = this.getRandomNumber(min, max);                
                this.P_life = Math.min(this.P_life + cure, 100);
                
                this.registerLogs(`The Player receives ${ cure } of cure`, 'player');
            },
            healAttacked() {
                // player receive a cure to recver frm damages
                this.heal(10, 15);
                // the monster never stop attacking until he dies
                this.hit('P_life',false, 7, 12, "Monster", "Player", 'monster');
            },
            // get a random number between a minimum and a maximum number
            getRandomNumber(min, max) {
                let rand = Math.random() * (max - min) + min;
                return Math.round(rand);
            },
            hit(id, special, min, max, origin, target, cl) {

                let curinga = special ? 5 : 0;
                let damage = this.getRandomNumber(min, max) + curinga;

                this[id] = Math.max(this[id] - damage, 0);
                this.registerLogs(`The ${ origin } hit the ${ target } with ${ damage } damages`, cl)
            },
            // register all occurence's logs
            registerLogs(txt, cl) {
                this.logs.unshift({ txt, cl });
            }       
        },
        computed: {
            gameOver() {
                if(this.P_life == 0 || this.M_life == 0)
                    return true
                else return false;
            },
        },
        watch: {
            gameOver(over){
                if(over) this.running = false;
            }
        }
    });
});