export default {
    concat(newValue) {
        let value = this.value()
        
        if (typeof value == "string" && typeof newValue == "string") {
            value += newValue

        } else if (Array.isArray(value) && Array.isArray(newValue)) {
            value = value.concat(newValue)

        } else if (value === Object(value) && newValue === Object(newValue)) {
            value = {...value, ...newValue}

        } else throw new Error("You can only use .concat() on strings, arrays and objects.");

        this.set(value)
        return this
    }
}