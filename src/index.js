const cells = document.querySelectorAll(".cell");

function handleClick(e) {
    e.target.innerHTML = players.currentSymbol;
    players.marked(players.player, e.target.id);
    players.check();
    players.toggleCurrentPlayer();
    e.target.removeEventListener("click", handleClick);
};

class Score {
    constructor() {
        
    }
}

class Players {
    constructor() {
        this.players = {
            "a": {
                label: "a",
                symbol: "O"
            },
            "b": {
                label: "b",
                symbol: "X",
            }
        };
        this.turn = "a";
        this.positions = {
            "a": [],
            "b": [],
        }
        this.start()
    }

    start() {
        cells.forEach(cell => {
            cell.addEventListener("click", handleClick);
        });
    }

    get player() {
        return this.turn;
    }

    set player(player) {
        this.turn = player;
    }

    toggleCurrentPlayer() {
        if (this.player === "a") {
            return this.player = "b";
        }

        if (this.player === "b") {
            return this.player = "a";
        }
    }

    get currentSymbol() {
        return this.players[this.player].symbol;
    }

    marked(player, position) {
        this.positions[player].push(Number(position));
    }

    check() {
        const winningPatterns = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 5, 9],
            [3, 5, 7],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
        ];

        winningPatterns.forEach(pattern => {
            const iswinner = pattern.every(n => {
                return this.positions[this.player].includes(n);
            });

            if (iswinner) {
                pattern.forEach(id => {
                    document.getElementById(id).style.backgroundColor = "green";
                })
                document.getElementById("top").innerHTML = `Player ${this.player} wins!`;

                cells.forEach(cell => {
                    cell.removeEventListener("click", handleClick);
                });
            }
        });
    }

    reset() {
        cells.forEach(cell => {
            cell.innerHTML = "";
            cell.style.backgroundColor = "white";
            cell.removeEventListener("click", handleClick);
            cell.addEventListener("click", handleClick);
        });

        document.getElementById("top").innerHTML = "";

        ["a", "b"].forEach(player => {
            this.positions[player] = [];
        });
    };
}

const players = new Players();

/* Set the initial player */
players.player = "a";

document.getElementById("button-reset").addEventListener("click", () => players.reset());