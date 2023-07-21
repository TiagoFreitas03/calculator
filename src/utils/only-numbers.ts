const onlyNumbers = (str: string) => str.replace(/\D/g, '')

const onlyHexCharacters = (str: string) => str.replace(/[^A-Fa-f0-9]/g, '')

export { onlyNumbers, onlyHexCharacters }
