export default {
  inc() {
    let value = Number(this.value())
    if (isNaN(value)) throw new Error("You can only increment numbers.");

    this.set(value + 1)
    return this
  },
  dec() {
    let value = Number(this.value())
    if (isNaN(value)) throw new Error("You can only decrement numbers.");

    this.set(value - 1)
    return this
  },
  add(number) {
    let value = Number(this.value())
    if (isNaN(number)) throw new Error("Values can only be numbers.");
    if (isNaN(value)) throw new Error("You can only add to numbers.");

    this.set(value + number)
    return this
  },
  sub(number) {
    let value = Number(this.value())
    if (isNaN(number)) throw new Error("Values can only be numbers.");
    if (isNaN(value)) throw new Error("You can only subtract to numbers.");

    this.set(value - number)
    return this
  },
  addRandom(max, min = 0) {
    let value = Number(this.value())
    if (isNaN(max) && isNaN(min)) throw new Error("Values can only be numbers.");
    if (isNaN(value)) throw new Error("You can only add to numbers.");

    let randoimuzed = Math.floor(Math.random() * (max - min + 1) + min)
    this.set(value + randoimuzed)
    return randoimuzed;
  },
  subRandom(max, min = 0) {
    let value = Number(this.value())
    if (isNaN(max) && isNaN(min)) throw new Error("Values can only be numbers.");
    if (isNaN(value)) throw new Error("You can only subtract to numbers.");

    let randoimuzed = Math.floor(Math.random() * (max - min + 1) + min)
    this.set(value - randoimuzed)
    return randoimuzed;
  }
}