const Game = props => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "game" }, /*#__PURE__*/
    React.createElement("div", { class: "game-side", id: "game-left" }, /*#__PURE__*/
    React.createElement("div", { class: "card", id: "card-1", onClick: props.flipCard }, /*#__PURE__*/
    React.createElement("div", { class: "card-inner" }, /*#__PURE__*/
    React.createElement("div", { class: "card-front" }), /*#__PURE__*/
    React.createElement("div", { class: "card-back" }))), /*#__PURE__*/


    React.createElement("div", { class: "card", id: "card-2", onClick: props.flipCard }, /*#__PURE__*/
    React.createElement("div", { class: "card-inner" }, /*#__PURE__*/
    React.createElement("div", { class: "card-front" }), /*#__PURE__*/
    React.createElement("div", { class: "card-back" }))), /*#__PURE__*/


    React.createElement("div", { class: "card", id: "card-3", onClick: props.flipCard }, /*#__PURE__*/
    React.createElement("div", { class: "card-inner" }, /*#__PURE__*/
    React.createElement("div", { class: "card-front" }), /*#__PURE__*/
    React.createElement("div", { class: "card-back" }))), /*#__PURE__*/


    React.createElement("div", { class: "card", id: "card-7", onClick: props.flipCard }, /*#__PURE__*/
    React.createElement("div", { class: "card-inner" }, /*#__PURE__*/
    React.createElement("div", { class: "card-front" }), /*#__PURE__*/
    React.createElement("div", { class: "card-back" })))), /*#__PURE__*/



    React.createElement("div", { class: "game-side", id: "game-right" }, /*#__PURE__*/
    React.createElement("div", { class: "card", id: "card-4", onClick: props.flipCard }, /*#__PURE__*/
    React.createElement("div", { class: "card-inner" }, /*#__PURE__*/
    React.createElement("div", { class: "card-front" }), /*#__PURE__*/
    React.createElement("div", { class: "card-back" }))), /*#__PURE__*/


    React.createElement("div", { class: "card", id: "card-5", onClick: props.flipCard }, /*#__PURE__*/
    React.createElement("div", { class: "card-inner" }, /*#__PURE__*/
    React.createElement("div", { class: "card-front" }), /*#__PURE__*/
    React.createElement("div", { class: "card-back" }))), /*#__PURE__*/


    React.createElement("div", { class: "card", id: "card-6", onClick: props.flipCard }, /*#__PURE__*/
    React.createElement("div", { class: "card-inner" }, /*#__PURE__*/
    React.createElement("div", { class: "card-front" }), /*#__PURE__*/
    React.createElement("div", { class: "card-back" }))), /*#__PURE__*/


    React.createElement("div", { class: "card", id: "card-8", onClick: props.flipCard }, /*#__PURE__*/
    React.createElement("div", { class: "card-inner" }, /*#__PURE__*/
    React.createElement("div", { class: "card-front" }), /*#__PURE__*/
    React.createElement("div", { class: "card-back" })))), /*#__PURE__*/



    React.createElement("div", { id: "score", class: "silkscreen-bold" }, /*#__PURE__*/
    React.createElement("span", null, "Score"), /*#__PURE__*/
    React.createElement("br", null),
    props.score), /*#__PURE__*/

    React.createElement("button", { id: "reset", onClick: props.reset, class: "silkscreen-regular" }, "Reset"), /*#__PURE__*/


    React.createElement("div", { id: "congrats", class: "hidden" }, /*#__PURE__*/
    React.createElement("span", { id: "congrats-message", class: "silkscreen-regular" }, "Well done!"))));





};

class CardGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      flipped: 0 };

    this.flipCard = this.flipCard.bind(this);
    this.reset = this.reset.bind(this);
  }

  flipCard(event) {
    const closest = event.target.closest(".card-inner");
    // don't flip cards that were already matched
    if (!closest.classList.contains("locked")) {
      // front of the card is UP
      if (closest.style.transform) {
        closest.style.transform = ""; // turn in back side up
        this.setState({
          flipped: this.state.flipped - 1 });

      } else {
        // back of the card is UP
        // check if less than 2 cards are already flipped front side up
        if (this.state.flipped < 2) {
          closest.style.transform = "rotateY(180deg)"; // just flip the card front side up
          this.setState({
            flipped: this.state.flipped + 1 });

          if (this.checkColor()) {
            // ~~~~~~~~~MATCH~~~~~~~~~~~~~~
            //
            // add to score
            // reset the flip counter (ignore the matched cards)
            this.setState({
              score: this.state.score + 1,
              flipped: 0 });

            // lock cards front side up
            this.lockCards();
            // check if all cards were matched
            ///////////////////////////////////////////
            if (this.allMatched()) {
              console.log("ALL DONE");
              setTimeout(() => this.nextGame(), 750); // add 1s delay after all cards are matched
              // show congrats message
              document.getElementById("congrats").classList.remove("hidden");
              // and then hide it again
              setTimeout(
              () =>
              document.getElementById("congrats").classList.add("hidden"),
              850);

            }
          }
        } else {
          // if 2 cards are already front side up
          this.flipNotLocked(); // flip all cards back side up
          closest.style.transform = "rotateY(180deg)"; // flip the card
          this.setState({
            flipped: 1 });

        }
      }
    }
  }

  flipAll() {
    // Turn all cards on their back
    const cards = document.querySelectorAll(".card-inner");
    cards.forEach(card => {
      if (card.style.transform) {
        card.style.transform = "";
        card.classList.remove("locked");
      }
    });
  }

  flipNotLocked() {
    // Turn all cards on their back except the locked cards
    const cards = document.querySelectorAll(".card-inner");
    cards.forEach(card => {
      if (card.style.transform && !card.classList.contains("locked")) {
        card.style.transform = "";
      }
    });
  }

  checkColor() {
    const cards = document.querySelectorAll(".card-inner");
    const colors = [];
    let i = 0;
    cards.forEach(card => {
      if (card.style.transform && !card.classList.contains("locked")) {
        // card is front side UP
        colors[i] = window.getComputedStyle(
        card.querySelector(".card-front")).
        backgroundColor;
        i += 1;
      }
    });
    return colors[0] == colors[1];
  }

  lockCards() {
    const cards = document.querySelectorAll(".card-inner");
    cards.forEach(card => {
      if (card.style.transform) {
        card.classList.add("locked");
      }
    });
  }

  allMatched() {
    return (
      document.querySelectorAll(".card-inner").length ==
      document.querySelectorAll(".locked").length);

  }

  nextGame() {
    this.shuffleColors();
    this.flipAll();
  }

  // Function to shuffle an array used for colors on reset
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  shuffleColorsBySides() {
    // Retrieve the colors defined in CSS root
    const colors = [
    getComputedStyle(document.documentElement).
    getPropertyValue("--card-1-background").
    trim(),
    getComputedStyle(document.documentElement).
    getPropertyValue("--card-2-background").
    trim(),
    getComputedStyle(document.documentElement).
    getPropertyValue("--card-3-background").
    trim(),
    getComputedStyle(document.documentElement).
    getPropertyValue("--card-4-background").
    trim()];


    // Left side
    let shuffledColors = this.shuffleArray(colors);
    const cardsLeft = document.querySelectorAll("#game-left .card-front");
    cardsLeft.forEach((card, index) => {
      card.style.backgroundColor = shuffledColors[index];
    });

    // Right side
    shuffledColors = this.shuffleArray(colors);
    const cardsRight = document.querySelectorAll("#game-right .card-front");
    cardsRight.forEach((card, index) => {
      card.style.backgroundColor = shuffledColors[index];
    });
  }

  shuffleColors() {
    // Retrieve the colors defined in CSS root
    const color = [
    getComputedStyle(document.documentElement).
    getPropertyValue("--card-1-background").
    trim(),
    getComputedStyle(document.documentElement).
    getPropertyValue("--card-2-background").
    trim(),
    getComputedStyle(document.documentElement).
    getPropertyValue("--card-3-background").
    trim(),
    getComputedStyle(document.documentElement).
    getPropertyValue("--card-4-background").
    trim()];


    const colors = color.flatMap(i => [i, i]);

    // shuffle all cards regardless of which side they're on
    let shuffledColors = this.shuffleArray(colors);
    const cards = document.querySelectorAll(".card-front");
    cards.forEach((card, index) => {
      card.style.backgroundColor = shuffledColors[index];
    });
  }

  reset(event) {
    this.shuffleColors();
    this.flipAll();
    this.setState({
      score: 0 });

  }

  componentDidMount() {
    this.shuffleColors();
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement(Game, {
        flipCard: this.flipCard,
        reset: this.reset,
        score: this.state.score })));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(CardGame, null), document.getElementById("dom-div"));